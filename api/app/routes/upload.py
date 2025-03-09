from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from flask import current_app
from app.utils import validate_api_key
import uuid
import os
import boto3
from botocore.client import Config
from flask_jwt_extended import jwt_required
import time

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    _, extension = os.path.splitext(filename)
    extension = extension[1:]
    if extension.lower() in ALLOWED_EXTENSIONS:
        return extension.lower()
    else:
        return False

upload_bp = Blueprint('upload', __name__)

# Initialize R2 connection
def get_r2_client():
    return boto3.client('s3',
        endpoint_url=current_app.config['R2_ENDPOINT_URL'],
        aws_access_key_id=current_app.config['R2_ACCESS_KEY_ID'],
        aws_secret_access_key=current_app.config['R2_SECRET_ACCESS_KEY'],
        config=Config(signature_version='s3v4')
    )

@upload_bp.before_request
def check_api_key():
    if request.method == 'OPTIONS':  # Handle preflight requests to enable CORS
        return
    api_key = request.headers.get('X-API-Key')  # Get the api key from the header
    # Verify the api key
    if not validate_api_key(api_key):
        return jsonify({'message': 'Invalid API KEY'}), 401

@upload_bp.route('', methods=['POST'])
@jwt_required()
def upload_file():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part in the request'}), 400

        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected for uploading'}), 400
            
        # Sécuriser le nom de fichier
        filename = secure_filename(file.filename)
        
        # Générer un nom de fichier unique avec timestamp
        timestamp = int(time.time())
        unique_filename = f"{timestamp}_{filename}"
        
        # Upload vers R2 directement depuis l'objet file
        try:
            s3_client = boto3.client(
                's3',
                endpoint_url=current_app.config['R2_ENDPOINT_URL'],
                aws_access_key_id=current_app.config['R2_ACCESS_KEY_ID'],
                aws_secret_access_key=current_app.config['R2_SECRET_ACCESS_KEY'],
            )
            
            # Upload direct depuis l'objet file sans sauvegarder localement
            file.seek(0)  # S'assurer de lire depuis le début du fichier
            s3_client.upload_fileobj(
                file, 
                current_app.config['R2_BUCKET_NAME'], 
                unique_filename
            )
            
            # Construire l'URL publique du fichier
            file_url = f"{current_app.config['R2_PUBLIC_URL']}/{unique_filename}"
            
            return jsonify({'url': file_url, 'success': True}), 200
            
        except Exception as e:
            # Log l'erreur pour le débogage
            print(f"Error uploading to R2: {str(e)}")
            return jsonify({'error': f'Failed to upload to R2: {str(e)}'}), 500
            
    except Exception as e:
        # Log l'erreur générale
        print(f"General upload error: {str(e)}")
        return jsonify({'error': f'Upload failed: {str(e)}'}), 500