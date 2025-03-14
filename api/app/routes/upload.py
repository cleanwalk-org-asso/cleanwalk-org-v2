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
from PIL import Image
from io import BytesIO

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
# Taille maximale de fichier: 1 Mo
MAX_FILE_SIZE = 1 * 1024 * 1024  # 1 Mo en octets

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

# Fonction pour convertir les images en WebP
def convert_to_webp(file_data, quality=80):
    try:
        image = Image.open(BytesIO(file_data))
        output = BytesIO()
        image.save(output, format="WEBP", quality=quality)
        output.seek(0)
        return output
    except Exception as e:
        print(f"Error converting to WebP: {str(e)}")
        return None

@upload_bp.route('', methods=['POST'])
@jwt_required()
def upload_file():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part in the request'}), 400

        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected for uploading'}), 400
        
        # Vérifier si le type de fichier est autorisé
        extension = allowed_file(file.filename)
        if not extension:
            return jsonify({'error': 'File type not allowed'}), 400
        
        # Vérifier la taille du fichier
        file.seek(0, os.SEEK_END)
        file_size = file.tell()
        if file_size > MAX_FILE_SIZE:
            return jsonify({'error': f'File size exceeds maximum limit of {MAX_FILE_SIZE/1024/1024} MB'}), 400
        
        # Générer un nom de fichier basé sur UUID
        unique_filename = f"{uuid.uuid4()}"
        
        # Convert PNG and JPG to WebP
        file.seek(0)  # Reset file pointer to beginning
        file_data = file.read()
        
        if extension.lower() in ['png', 'jpg', 'jpeg']:
            # Convert to WebP
            webp_file = convert_to_webp(file_data)
            if webp_file:
                extension = 'webp'
                file_data = webp_file.getvalue()
        
        # Final filename with extension
        final_filename = f"{unique_filename}.{extension}"
        
        # Upload vers R2 directement
        try:
            s3_client = get_r2_client()
            
            s3_client.put_object(
                Bucket=current_app.config['R2_BUCKET_NAME'],
                Key=final_filename,
                Body=file_data,
                ContentType=f"image/{extension}"
            )
            
            # Construire l'URL publique du fichier
            file_url = f"{current_app.config['R2_PUBLIC_URL']}/{final_filename}"
            
            return jsonify({
                'success': True,
                'img_url': file_url
            }), 200
            
        except Exception as e:
            # Log l'erreur pour le débogage
            print(f"Error uploading to R2: {str(e)}")
            return jsonify({'error': f'Failed to upload to R2: {str(e)}'}), 500
            
    except Exception as e:
        # Log l'erreur générale
        print(f"General upload error: {str(e)}")
        return jsonify({'error': f'Upload failed: {str(e)}'}), 500