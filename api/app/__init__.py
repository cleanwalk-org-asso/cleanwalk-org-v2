# app/__init__.py
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os
from flask_mail import Mail 

from datetime import timedelta

# Charger les variables d'environnement
load_dotenv()

# Initialiser l'extension SQLAlchemy
db = SQLAlchemy()
mail = Mail()

def create_app():
    app = Flask(__name__)
    CORS(app)
    # Configurer l'application
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
    app.config['API_KEY'] = os.getenv('API_KEY')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=30)
    app.config['FRONTEND_URL'] = os.getenv('FRONTEND_URL')

    # Configurer Flask-Mail
    app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
    app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
    app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS', 'True').lower() in ['true', '1', 'yes']
    app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
    app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER', 'noreply@demo.com')
    app.config['RESET_PASSWORD_SALT'] = os.getenv('RESET_PASSWORD_SALT')

    # R2 Configuration - Use environment variables
    app.config['R2_ENDPOINT_URL'] = os.getenv('R2_ENDPOINT_URL')
    app.config['R2_ACCESS_KEY_ID'] = os.getenv('R2_ACCESS_KEY_ID')
    app.config['R2_SECRET_ACCESS_KEY'] = os.getenv('R2_SECRET_ACCESS_KEY')
    app.config['R2_BUCKET_NAME'] = os.getenv('R2_BUCKET_NAME')
    app.config['R2_PUBLIC_URL'] = os.getenv('R2_PUBLIC_URL')  # If you have a public URL configured

    # Initialiser les extensions
    db.init_app(app)
    mail.init_app(app)
    JWTManager(app)

    # Enregistrer les blueprints
    from app.routes.users import users_bp
    from app.routes.articles import articles_bp
    from app.routes.cleanwalks import cleanwalks_bp
    from app.routes.cities import cities_bp
    from app.routes.admin import admin_bp
    from app.routes.upload import upload_bp

    app.register_blueprint(users_bp, url_prefix='/users')
    app.register_blueprint(articles_bp, url_prefix='/articles')
    app.register_blueprint(cleanwalks_bp, url_prefix='/cleanwalks')
    app.register_blueprint(cities_bp, url_prefix='/cities')
    app.register_blueprint(admin_bp, url_prefix='/admin')
    app.register_blueprint(upload_bp, url_prefix='/upload')

    return app
