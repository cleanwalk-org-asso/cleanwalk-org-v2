# users_bp.py (ou le nom de votre Blueprint)

import datetime
from flask import Blueprint, jsonify, request
from flask_cors import CORS
from app.models import db, User, Role, Organisation
from app.utils import validate_api_key, hash_password, upload_img
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, get_jwt
from sqlalchemy.exc import IntegrityError

import os

users_bp = Blueprint('users', __name__)

@users_bp.before_request
def check_api_key():
    if request.method == 'OPTIONS': # Handle preflight requests to enable CORS
        return
    
    api_key = request.headers.get('X-API-Key')  # Get the api key from the header
    
    # Verify the api key
    if not validate_api_key(api_key):
        return jsonify({'message': 'Invalide API KEY'}), 401

# Secure routes

#------------------------------------GET------------------------------------#

# route for get user by id
@users_bp.route('/<string:user_id>', methods=['GET'])
def get_user(user_id):
    user = db.session.query(User, Role).join(Role, User.role_id == Role.id).filter(User.id == user_id).first()

    if user:
        user_data = {
            'id': user.User.id,
            'name': user.User.name,
            'email': user.User.email,
            'created_at': user.User.created_at,
            'profile_picture': user.User.profile_picture,
            'role': user.Role.role
        }
        return jsonify(user_data)
    else:
        return jsonify({'message': 'User not found'}), 404
    
# route for get association by user id
@users_bp.route('/association/<string:user_id>', methods=['GET'])
def get_association(user_id):
    user = db.session.query(User, Organisation).join(Organisation, User.id == Organisation.user_id).filter(User.id == user_id).first()

    if user:
        user_data = {
            'id':user.User.id,
            'name':user.User.name,
            'email':user.User.email,
            'description':user.Organisation.description,
            'web_site':user.Organisation.web_site,
            'social_mediass':user.Organisation.social_medias,
            'banner_img':user.Organisation.banner_img,
            'profile_picture':user.User.profile_picture,
            'role':user.User.role_id
        }
        return jsonify(user_data)
    else:
        return jsonify({'message': 'User not found'}), 404
    
    # route for get all organisations
@users_bp.route('/organisations', methods=['GET'])
def get_all_organisations():
    organisations =  db.session.query(Organisation).join(User).all()
    if organisations:
        organisation_data = []
        for organisation in organisations:
            user = User.query.get(organisation.user_id)
            organisation_data.append({
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'description': organisation.description,
                'web_site': organisation.web_site,
                'social_medias': organisation.social_medias,
                'banner_img': organisation.banner_img,
                'profile_picture': user.profile_picture,
                'role': user.role_id
            })
        return jsonify(organisation_data)
    else:
        return jsonify({'message': 'Organisations not found'}), 404
    


# route for get all users
@users_bp.route('', methods=['GET'])
def get_all_users():
    users = db.session.query(User, Role).join(Role, User.role_id == Role.id)
    if users:
        user_data = []
        for user in users:
            user_data.append({
                'id': user.User.id,
                'name': user.User.name,
                'email': user.User.email,
                'created_at': user.User.created_at,
                'profile_picture': user.User.profile_picture,
                'role': user.Role.role
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
    res = db.session.query(User, Role).join(Role, User.role_id == Role.id).filter(User.email == email).first()
    if res:
        if res.User.password == hash_password(data.get('password'), res.User.salt):
            access_token = create_access_token(identity=res.User.id, additional_claims={'role': res.Role.role})
            return jsonify({
                'message': 'Successful connection', 
                'id': res.User.id, 'email': email, 
                'name': res.User.name,
                'profile_picture': res.User.profile_picture, 
                'access_token': access_token,
                'role': res.Role.role
            }), 200
        else:
            return jsonify({'message': 'Username or password incorrect'}), 401
    else:
        return jsonify({'message': 'Unknown email address'}), 404
    
    
#login with token route
@users_bp.route('/token-login', methods=['POST'])
@jwt_required()
def tokenLogin():
    current_user = get_jwt_identity()
    claims = get_jwt()

    if current_user:
        res = db.session.query(User, Role).join(Role, User.role_id == Role.id).filter(User.id == current_user).first()
        return jsonify({
            'message': 'Successful connection', 
            'id': res.User.id, 
            'email': res.User.email, 
            'name': res.User.name,
            'profile_picture': res.User.profile_picture, 
            "role":claims["role"]
        }), 200
    else:
        return jsonify({'message': 'invalide token'}), 401

# route for creating a new user
@users_bp.route('', methods=['POST'])
def create_user():
    data = request.get_json(silent=True) # Get JSON data from the request
    print(data)
    if not data:
        return jsonify({'message': 'Request body is empty or not a valid JSON'}), 400

    required_keys = ['name', 'email', 'password', 'role_id']
    if not all(key in data for key in required_keys):
        return jsonify({'message': 'Request body is incomplete'}), 400

    # Extract user data from the request JSON
    name = data.get('name')
    email = data.get('email')
    profile_picture = data.get('profile_picture')
    salt = os.urandom(16)
    password = hash_password(data.get('password'), salt)
    role_id = data.get('role_id')
    

    try:
        # Essayez de créer le nouvel utilisateur
        new_user = User(
            name=name,
            email=email,
            profile_picture=profile_picture,
            password=password,
            salt=salt,
            role_id=role_id,
            created_at=datetime.datetime.now()
        )
        db.session.add(new_user)
        db.session.commit()

        if role_id == 2: # If the user is an organisation create association table
            new_association = Organisation(user_id=new_user.id)
            db.session.add(new_association)
            db.session.commit()

        return jsonify({'message': 'User created successfully', 'user_id': new_user.id}), 201

    except IntegrityError as e:
        print(e, "ErrorIntegrity")
        # Gérez l'erreur d'intégrité (adresse e-mail en double)
        db.session.rollback()  # Annuler la transaction
        return jsonify({'message': 'Email address already in use'}), 400

# ...

#------------------------------------PUT------------------------------------#
# route for updating user by id

@users_bp.route('/<string:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    user = User.query.get(user_id)

    if user:
        data = request.get_json()

        # Update user data from the request JSON
        user.name = data.get('name', user.name)
        user.profile_picture = data.get('profile_picture', user.profile_picture)
        db.session.commit()
        return jsonify({'message': 'User updated successfully'})
    else:
        return jsonify({'message': 'User not found'}), 404
    
# route for updating user password by id
@users_bp.route('/password/<string:user_id>', methods=['PUT'])
@jwt_required()
def update_user_password(user_id):
    user = User.query.get(user_id)

    if user:
        data = request.get_json()
        print("my datata",data)

        # Check if the old password is correct
        if user.password == hash_password(data.get('old_password'), user.salt):
            # Update user password
            user.password = hash_password(data.get('new_password'), user.salt)
            db.session.commit()
            return jsonify({'message': 'Password updated successfully'})
        else:
            return jsonify({'message': 'Old password is incorrect'}), 400
        
# route for updating association by user id
@users_bp.route('/association/<string:user_id>', methods=['PUT'])
@jwt_required()
def update_association(user_id):
    # Récupérer l'utilisateur
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'message': 'User not found'}), 404

    # Vérifier si l'utilisateur est une organisation
    association = Organisation.query.filter_by(user_id=user_id).first()
    
    if not association:
        return jsonify({'message': 'Association not found'}), 404

    # Obtenir les données de la requête JSON
    data = request.get_json()
    
    # Mettre à jour les champs de l'association si fournis
    association.description = data.get('description', association.description)
    association.web_site = data.get('web_site', association.web_site)
    association.social_medias = data.get('social_medias', association.social_medias)
    association.banner_img = data.get('banner_img', association.banner_img)
    
    # Mettre à jour les champs de l'utilisateur si fournis
    user.profile_picture = data.get('profile_picture', user.profile_picture)
    
    try:
        db.session.commit()
        return jsonify({'message': 'Association updated successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to update association', 'error': str(e)}), 500

