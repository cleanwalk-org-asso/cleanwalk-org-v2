# utils.py
import hashlib
from flask import current_app
from werkzeug.utils import secure_filename
import os

def validate_api_key(api_key):
    # Get the API key from app.config
    app_api_key = current_app.config.get('API_KEY')
    print(app_api_key)

    # Compare the api_key from the header with the one from app.config
    return api_key == app_api_key

def hash_password(password, salt):
    salted_password = salt + password.encode('utf-8')
    hashed_password = hashlib.sha256(salted_password).hexdigest()
    return hashed_password

def upload_img(image):
    # Check if the image is allowed
    if '.' in image.filename and image.filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']:
        filename = secure_filename(image.filename)
        image.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
        return filename
    else:
        return None
    

