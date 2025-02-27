import hashlib
import os
from flask import current_app, request, jsonify
from werkzeug.utils import secure_filename
from google.oauth2 import id_token
from google.auth.transport import requests
from flask_mail import Message
from .extensions import mail
from itsdangerous import URLSafeTimedSerializer


def get_serializer():
    secret_key = current_app.config.get('JWT_SECRET_KEY')
    if not secret_key:
        raise ValueError("JWT_SECRET_KEY is not defined in Flask config.")
    return URLSafeTimedSerializer(secret_key)


def verify_google_token(token):
    try:
        client_id = current_app.config.get("GOOGLE_CLIENT_ID")
        if not client_id:
            raise ValueError("GOOGLE_CLIENT_ID is not defined in Flask config.")
        
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), client_id)
        
        return {
            'google_id': idinfo['sub'],
            'email': idinfo['email'],
            'name': idinfo.get('name'),
            'picture': idinfo.get('picture')
        }
    except ValueError:
        return None


def validate_api_key(api_key):
    app_api_key = current_app.config.get('API_KEY')
    if not app_api_key:
        raise ValueError("API_KEY is not defined in Flask config.")
    
    return api_key == app_api_key


def hash_password(password, salt):
    salted_password = salt + password.encode('utf-8')
    hashed_password = hashlib.sha256(salted_password).hexdigest()
    return hashed_password


def upload_img(image):
    allowed_extensions = current_app.config.get('ALLOWED_EXTENSIONS')
    upload_folder = current_app.config.get('UPLOAD_FOLDER')

    if not allowed_extensions or not upload_folder:
        raise ValueError("ALLOWED_EXTENSIONS or UPLOAD_FOLDER is not defined in Flask config.")

    if '.' in image.filename and image.filename.rsplit('.', 1)[1].lower() in allowed_extensions:
        filename = secure_filename(image.filename)
        image.save(os.path.join(upload_folder, filename))
        return filename
    else:
        return None


def send_reset_email(user_email):
    reset_salt = current_app.config.get('RESET_PASSWORD_SALT')
    frontend_url = current_app.config.get('FRONTEND_URL')
    mail_sender = current_app.config.get('MAIL_DEFAULT_SENDER')

    if not reset_salt or not frontend_url or not mail_sender:
        raise ValueError("RESET_PASSWORD_SALT, FRONTEND_URL or MAIL_DEFAULT_SENDER is missing in Flask config.")

    token = get_serializer().dumps(user_email, salt=reset_salt)
    reset_link = f"{frontend_url}/reset-password/{token}"

    msg = Message("Password Reset Request",
                  sender=mail_sender,
                  recipients=[user_email])

    msg.body = f"To reset your password, please click the following link: {reset_link}\n" \
               f"This link will expire in one hour."

    mail.send(msg)


def check_api_key():
    if request.method == 'OPTIONS': 
        return

    api_key = request.headers.get('X-API-Key')  
    
    if not api_key:
        return jsonify({'message': 'Missing API Key'}), 400
    
    if not validate_api_key(api_key):
        return jsonify({'message': 'Invalid API Key'}), 401
    
    return None
