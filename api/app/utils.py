# utils.py
import hashlib
from flask import current_app
from werkzeug.utils import secure_filename
import os
from google.oauth2 import id_token
from google.auth.transport import requests
from flask_mail import Message
from .extensions import mail
from itsdangerous import URLSafeTimedSerializer
from flask import request, jsonify

CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
RESET_PASSWORD_SALT = os.getenv("RESET_PASSWORD_SALT")

# Create an instance of the serializer for tokens
serializer = URLSafeTimedSerializer(JWT_SECRET_KEY)

def verify_google_token(token):
    try:
        # Validate the token received from Google
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
        
        # If validation is successful, return user information
        return {
            'google_id': idinfo['sub'],
            'email': idinfo['email'],
            'name': idinfo.get('name'),
            'picture': idinfo.get('picture')
        }
    except ValueError:
        # If the token is invalid, return None
        return None

def validate_api_key(api_key):
    app_api_key = current_app.config.get('API_KEY')
    print(app_api_key)
    return api_key == app_api_key

def hash_password(password, salt):
    salted_password = salt + password.encode('utf-8')
    hashed_password = hashlib.sha256(salted_password).hexdigest()
    return hashed_password

def upload_img(image):
    if '.' in image.filename and image.filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']:
        filename = secure_filename(image.filename)
        image.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
        return filename
    else:
        return None

def send_reset_email(user_email):
    # Generate a token for password reset
    token = serializer.dumps(user_email, salt=RESET_PASSWORD_SALT)

    # Generate a link to reset the password
    reset_link = f"{current_app.config['FRONTEND_URL']}/reset-password/{token}"

    msg = Message("Password Reset Request",
                  sender=current_app.config['MAIL_DEFAULT_SENDER'],
                  recipients=[user_email])

    msg.body = f"To reset your password, please click the following link: {reset_link}\n" \
               f"This link will expire in one hour."

    # Send the email
    mail.send(msg)
    
def check_api_key():
    # Handle preflight requests to enable CORS
    if request.method == 'OPTIONS': 
        return
    # Get the api key from the header
    api_key = request.headers.get('X-API-Key')  
    
    # Missing API key
    if not api_key:
        return jsonify({'message': 'Missing API Key'}), 400
    
    # Verify the api key
    if not validate_api_key(api_key):
        return jsonify({'message': 'Invalide API KEY'}), 401
    
    return None
