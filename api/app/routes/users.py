# users_bp.py (ou le nom de votre Blueprint)

from flask import Blueprint, jsonify, request
from app.models import db, User
from app.utils import validate_api_key, hash_password
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, get_jwt

import os

users_bp = Blueprint('users', __name__)

@users_bp.before_request
def check_api_key():
    api_key = request.headers.get('X-API-Key')  # Get the api key from the header
    
    # Verify the api key
    if not validate_api_key(api_key):
        return jsonify({'message': 'Invalide API KEY'}), 401

# Secure routes

#------------------------------------GET------------------------------------#

# route for get user by id
@users_bp.route('/<string:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)

    if user:
        user_data = {
            'id': user.id,
            'firstname': user.firstname,
            'lastname': user.lastname,
            'email': user.email,
            'created_at': user.created_at,
            'profile_picture': user.profile_picture,
        }
        return jsonify(user_data)
    else:
        return jsonify({'message': 'User not found'}), 404

# route for get all users
@users_bp.route('', methods=['GET'])
def get_all_users():
    users = User.query.all()
    if users:
        user_data = []
        for user in users:
            user_data.append({
                'id': user.id,
                'firstname': user.firstname,
                'lastname': user.lastname,
                'email': user.email,
                'created_at': user.created_at,
                'profile_picture': user.profile_picture,
            })
        return jsonify(user_data)
    else:
        return jsonify({'message': 'Users not found'}), 404

#------------------------------------DELETE------------------------------------#

# route for delete user by id
@users_bp.route('/<string:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'})
    else:
        return jsonify({'message': 'User not found'}), 404

#------------------------------------POST------------------------------------#
# login route
@users_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()  # Obtenir les données JSON de la requête

    email = data.get('email')
    user = User.query.filter_by(email=email).first()
    if user:
        if user.password == hash_password(data.get('password'), user.salt):
            access_token = create_access_token(identity=user.id, additional_claims={'role': 'user'})
            return jsonify({'message': 'Successful connection', 'id': user.id, 'email': email, 'firstname': user.firstname, 'profile_picture': user.profile_picture, 'access_token': access_token}), 200
        else:
            return jsonify({'message': 'Username or password incorrect'}), 401
    else:
        return jsonify({'message': 'Unknown email address'}), 401
    
    
#login with token route
@users_bp.route('/token-login', methods=['POST'])
@jwt_required()
def tokenLogin():
    current_user = get_jwt_identity()
    claims = get_jwt()

    if current_user:
        user = User.query.get(current_user)
        return jsonify({'message': 'Successful connection', 'id': user.id, 'email': user.email, 'firstname': user.firstname, 'profile_picture': user.profile_picture, "role":claims["role"]}), 200
    else:
        return jsonify({'message': 'invalide token'}), 401


# route for creating a new user
@users_bp.route('', methods=['POST'])
def create_user():
    data = request.get_json()

    # Extract user data from the request JSON
    firstname = data.get('firstname')
    lastname = data.get('lastname')
    email = data.get('email')
    profile_picture = data.get('profile_picture')
    salt = os.urandom(16)
    password = hash_password(data.get('password'), salt)

    # Create a new User object and add it to the database
    new_user = User(
        firstname=firstname,
        lastname=lastname,
        email=email,
        profile_picture=profile_picture,
        password=password,
        salt=salt
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully', 'user_id': new_user.id}), 201

#------------------------------------PUT------------------------------------#
# route for updating user by id

@users_bp.route('/<string:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)

    if user:
        data = request.get_json()

        # Update user data from the request JSON
        user.firstname = data.get('firstname', user.firstname)
        user.lastname = data.get('lastname', user.lastname)
        user.email = data.get('email', user.email)
        user.profile_picture = data.get('profile_picture', user.profile_picture)

        db.session.commit()
        return jsonify({'message': 'User updated successfully'})
    else:
        return jsonify({'message': 'User not found'}), 404
