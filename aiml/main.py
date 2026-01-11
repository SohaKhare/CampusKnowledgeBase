from flask import Flask, request, jsonify, send_file
from werkzeug.middleware.proxy_fix import ProxyFix
from flask_cors import CORS
from google import genai
from google.api_core.exceptions import ResourceExhausted
import os
from pathlib import Path
from dotenv import load_dotenv

from embedder import Embedder
from rag import Retriever
from askllm import QAService

from config import Config
from extensions import jwt, oauth
from auth.google_oauth import init_google_oauth
from routes.auth_routes import auth_bp

from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config["SECRET_KEY"] = os.getenv("FLASK_SECRET_KEY")
    app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)
    app.logger.setLevel(os.getenv("FLASK_LOG_LEVEL", "INFO").upper())
    app.config.update(
        SESSION_COOKIE_SECURE=True,
        SESSION_COOKIE_SAMESITE="Lax",
        SESSION_TYPE="filesystem"
    )
    
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
    allowed_origins = [
        frontend_url,
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]
    
    # Enable CORS
    CORS(app, supports_credentials=True, resources={
        r"/*": {
            "origins": allowed_origins,
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
        }
    })

    jwt.init_app(app)
    init_google_oauth(app, oauth)

    app.register_blueprint(auth_bp)

    # Helpful in hosted envs: confirm the auth endpoints are actually registered.
    try:
        auth_rules = []
        for rule in app.url_map.iter_rules():
            if "google" in rule.rule or rule.rule.startswith("/login") or rule.rule.startswith("/auth"):
                methods = sorted(m for m in rule.methods if m not in {"HEAD", "OPTIONS"})
                auth_rules.append(f"{rule.rule} -> {rule.endpoint} methods={methods}")
        app.logger.info("[startup] registered auth-ish routes: %s", auth_rules)
    except Exception:
        app.logger.exception("[startup] failed to enumerate routes")

    @app.after_request
    def _log_404s(response):
        if response.status_code == 404:
            app.logger.warning(
                "[404] method=%s path=%s host=%s xfp=%s xfh=%s xprefix=%s",
                request.method,
                request.path,
                request.headers.get("Host"),
                request.headers.get("X-Forwarded-Proto"),
                request.headers.get("X-Forwarded-Host"),
                request.headers.get("X-Forwarded-Prefix"),
            )
        return response

    # Initialize Gemini client
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

    # Instantiate services
    embedder = Embedder(client) # comment next 2 lines to test auth
    retriever = Retriever(embedder)
    qa_service = QAService(client, retriever)


    @app.route("/health", methods=["GET"])
    def health():
        """Unauthenticated health check for deployments/load balancers."""
        return jsonify(
            {
                "status": "ok",
                "service": "aiml",
                "path": request.path,
            }
        ), 200


    @app.route("/ask", methods=["POST"])
    @jwt_required()
    def ask_route():
        role = get_jwt()['role']

        if role!="student":
            return jsonify({"error": "Unauthorized"}), 403
        
        data = request.get_json()
        question = data.get("question", "")
        course = data.get("course", "FY") # Default to FY
        semester = data.get("semester", "Sem-1")  # Default to semester 1

        if not question:
            return jsonify({"error": "Question is required"}), 400

        result = qa_service.ask(question, course=course, semester=semester)
        return jsonify(result)
    
    @app.route("/pdf/<path:filename>", methods=["GET"])
    @jwt_required()
    def serve_pdf(filename):
        """Serve PDF files from the data directory"""
        try:
            # Security: Only allow serving PDFs from data directory
            data_dir = Path("./data").resolve()
            
            # Search for the file in data directory recursively
            pdf_path = None
            for file in data_dir.rglob(filename):
                if file.is_file() and file.suffix.lower() == '.pdf':
                    pdf_path = file
                    break
            
            if pdf_path and pdf_path.exists():
                return send_file(
                    pdf_path,
                    mimetype='application/pdf',
                    as_attachment=False,
                    download_name=filename
                )
            else:
                return jsonify({"error": "PDF not found"}), 404
                
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    
    @app.route("/auth-test", methods=["GET"])
    @jwt_required()
    def auth_test():
        email = get_jwt_identity()
        role = get_jwt()["role"]
        return {
            "message": "OAuth is working 🎉",
            "email": email,
            "role": role
        }
    return app

app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=8000, use_reloader=False)
