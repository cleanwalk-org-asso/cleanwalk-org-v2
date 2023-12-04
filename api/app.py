from flask import Flask
from flask_jwt_extended import JWTManager
from app.models import db
from dotenv import load_dotenv
import os
from datetime import timedelta

# load environement variables from .env file
load_dotenv()

ACCESS_EXPIRES = timedelta(minutes=1)

app = Flask(__name__)

#configure the SQLAlchemy database using environment variables
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
app.config['API_KEY'] = os.getenv('API_KEY')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = ACCESS_EXPIRES

#Init the JWTManager extension
jwt = JWTManager(app)

# Init the SQLAlchemy database
db.init_app(app)

from app.routes.users import users_bp
from app.routes.articles import articles_bp
from app.routes.cleanwalks import cleanwalks_bp
from app.routes.cities import cities_bp
from app.routes.admin import admin_bp

app.register_blueprint(users_bp , url_prefix='/users')
app.register_blueprint(articles_bp , url_prefix='/articles')
app.register_blueprint(cleanwalks_bp , url_prefix='/cleanwalks')
app.register_blueprint(cities_bp , url_prefix='/cities')
app.register_blueprint(admin_bp , url_prefix='/admin')


if __name__ == '__main__':
    app.run(port=5001, debug=True)
