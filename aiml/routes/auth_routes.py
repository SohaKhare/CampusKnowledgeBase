from flask import Blueprint, redirect, url_for, current_app, request
from flask_jwt_extended import create_access_token
from extensions import oauth
from urllib.parse import urlencode

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/login/google")
def login_google():
    current_app.logger.info(
        "[auth] /login/google hit host=%s url=%s xfp=%s xfh=%s xprefix=%s",
        request.headers.get("Host"),
        request.url,
        request.headers.get("X-Forwarded-Proto"),
        request.headers.get("X-Forwarded-Host"),
        request.headers.get("X-Forwarded-Prefix"),
    )
    redirect_uri = url_for("auth.google_callback", _external=True)
    current_app.logger.info("[auth] google redirect_uri=%s", redirect_uri)
    return oauth.google.authorize_redirect(redirect_uri)


@auth_bp.route("/auth/google/callback")
def google_callback():
    frontend_url = current_app.config["FRONTEND_URL"]
    current_app.logger.info(
        "[auth] /auth/google/callback hit host=%s url=%s xfp=%s xfh=%s xprefix=%s",
        request.headers.get("Host"),
        request.url,
        request.headers.get("X-Forwarded-Proto"),
        request.headers.get("X-Forwarded-Host"),
        request.headers.get("X-Forwarded-Prefix"),
    )
    token = oauth.google.authorize_access_token()

    # Don't log token contents (contains secrets). Log only which keys exist.
    if isinstance(token, dict):
        current_app.logger.info("[auth] oauth token keys=%s", sorted(token.keys()))

    user = oauth.google.get(
        "https://openidconnect.googleapis.com/v1/userinfo"
    ).json()

    email = user.get("email")
    email_verified = user.get("email_verified")

    current_app.logger.info(
        "[auth] userinfo email=%s verified=%s",
        email,
        email_verified,
    )

    if not email or not email_verified:
        current_app.logger.warning("[auth] unauthorized_email missing_or_unverified")
        params = urlencode({"error":"unauthorized_email"})
        return redirect(f"{frontend_url}/login?{params}")

    allowed_domain = current_app.config["STUDENT_EMAIL_DOMAIN"]
    current_app.logger.info("[auth] allowed_domain=%s", allowed_domain)
    if allowed_domain!="all" and not email.endswith(f"@{allowed_domain}"):
        current_app.logger.warning(
            "[auth] unauthorized_email domain_mismatch email_domain=%s",
            (email.split("@", 1)[1] if "@" in email else None),
        )
        params = urlencode({"error":"unauthorized_email"})
        return redirect(f"{frontend_url}/login?{params}")

    jwt_token = create_access_token(
        identity=email, 
        additional_claims={
        "role": "student"
        }
    )

    current_app.logger.info("[auth] jwt issued identity=%s role=student", email)


    return redirect(f"{frontend_url}/auth/callback?token={jwt_token}")
