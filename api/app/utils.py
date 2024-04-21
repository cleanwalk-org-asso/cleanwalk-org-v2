# utils.py
import hashlib
from flask import current_app
from flask_uploads import UploadSet, IMAGES


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

photos = UploadSet('photos', IMAGES)

def upload_img(image):
    filename = photos.save(image)
    return filename