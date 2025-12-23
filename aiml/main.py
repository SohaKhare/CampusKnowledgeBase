from flask import Flask, request, jsonify
from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Initialize Gemini client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

MODEL_NAME = "gemini-3.0-flash-preview"


@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    question = data.get("question", "")

    if not question:
        return jsonify({"error": "Question is required"}), 400

    response = client.models.generate_content(model=MODEL_NAME, contents=question)

    return jsonify({"answer": response.text})


if __name__ == "__main__":
    app.run(debug=True, port=8000)
