import os
from datetime import timedelta

class Config:
    GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
    GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    FRONTEND_URL = os.getenv("FRONTEND_URL")
    STUDENT_EMAIL_DOMAIN = os.getenv("STUDENT_EMAIL_DOMAIN")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=3)
