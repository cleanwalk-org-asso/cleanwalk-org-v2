from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from flask import current_app as app
from app.utils import validate_api_key
import uuid
import os

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    _, extension = os.path.splitext(filename)
    extension = extension[1:]
    if extension.lower() in ALLOWED_EXTENSIONS:
        return extension.lower()
    else:
        return False

upload_bp = Blueprint('upload', __name__)

@upload_bp.before_request
def check_api_key():
    if request.method == 'OPTIONS': # Handle preflight requests to enable CORS
        return
    api_key = request.headers.get('X-API-Key')  # Get the api key from the header
    
    # Verify the api key
    if not validate_api_key(api_key):
        return jsonify({'message': 'Invalide API KEY'}), 401

@upload_bp.route('', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file:
        filename = secure_filename(file.filename)
        extention = allowed_file(filename)
        if not extention:
            return jsonify({'error': 'File extention not allowed'}), 400
        unique_filename = str(uuid.uuid4()) + '.' + extention
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], unique_filename))
        
        return jsonify({'message': 'File successfully uploaded', 'img_url': app.config['UPLOADS_URL'] + '/' + unique_filename}), 200