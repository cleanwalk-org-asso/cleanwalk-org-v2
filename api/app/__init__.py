# app/__init__.py
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os
from datetime import timedelta

# Charger les variables d'environnement
load_dotenv()

# Initialiser l'extension SQLAlchemy
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)
    # Configurer l'application
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
    app.config['API_KEY'] = os.getenv('API_KEY')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=30)
    app.config['UPLOAD_FOLDER'] = os.getenv('UPLOAD_FOLDER') or '../uploads'

    # Initialiser les extensions
    db.init_app(app)
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
