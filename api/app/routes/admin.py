# admin_bp.py (ou le nom de votre Blueprint)

from flask import Blueprint, jsonify, request
from app.models import db, User, Role
from app.utils import hash_password
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, get_jwt


admin_bp = Blueprint('admin', __name__)


#------------------------------------GET------------------------------------#


#------------------------------------POST------------------------------------#
# login route
@admin_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()  # Obtenir les données JSON de la requête

    email = data.get('email')
    res = db.session.query(User, Role).join(Role, User.role_id == Role.id).filter(User.email == email).first()
    if res:
        if (res.User.password == hash_password(data.get('password'), res.User.salt) and (res.Role.role == 'admin1' or res.Role.role == 'admin2'or res.Role.role == 'admin3')):
            access_token = create_access_token(identity=res.User.id, additional_claims={'role': res.Role.role})
            return jsonify({
                'message': 'Successful connection', 
                'id': res.User.id, 'email': email, 
                'firstname': res.User.firstname, 
                'profile_picture': res.User.profile_picture, 
                'access_token': access_token,
                'role': res.Role.role
            }), 200
        else:
            return jsonify({'message': 'Username or password incorrect'}), 401
    else:
        return jsonify({'message': 'Unknown email address'}), 404
    
    
#login with token route
@admin_bp.route('/token-login', methods=['POST'])
@jwt_required()
def tokenLogin():
    current_user = get_jwt_identity()
    claims = get_jwt()
    role = claims["role"]

    if current_user and (role == 'admin1' or role == 'admin2'or role == 'admin3'):
        res = db.session.query(User, Role).join(Role, User.role_id == Role.id).filter(User.id == current_user).first()
        return jsonify({
            'message': 'Successful connection', 
            'id': res.User.id, 
            'email': res.User.email, 
            'firstname': res.User.firstname,
            'lastname': res.User.lastname, 
            'profile_picture': res.User.profile_picture, 
            "role":claims["role"]
        }), 200
    else:
        return jsonify({'message': 'invalide token'}), 401
    
#------------------------------------PUT------------------------------------#

#------------------------------------DELETE------------------------------------#
