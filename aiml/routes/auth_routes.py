from flask import Blueprint, redirect, url_for, current_app
from flask_jwt_extended import create_access_token
from extensions import oauth

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/login/google")
def login_google():
    redirect_uri = url_for("auth.google_callback", _external=True)
    return oauth.google.authorize_redirect(redirect_uri)


@auth_bp.route("/auth/google/callback")
def google_callback():
    token = oauth.google.authorize_access_token()

    user = oauth.google.get(
        "https://openidconnect.googleapis.com/v1/userinfo"
    ).json()

    email = user.get("email")
    email_verified = user.get("email_verified")

    if not email or not email_verified:
        return {"error": "Invalid Google account"}, 403

    allowed_domain = current_app.config["STUDENT_EMAIL_DOMAIN"]
    if not email.endswith(f"@{allowed_domain}"):
        return {"error": "Only college students allowed"}, 403

    jwt_token = create_access_token(
        identity=email, 
        additional_claims={
        "role": "student"
        }
    )

    frontend_url = current_app.config["FRONTEND_URL"]
    return redirect(f"{frontend_url}/auth/callback?token={jwt_token}")
