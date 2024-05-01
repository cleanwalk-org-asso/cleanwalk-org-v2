import datetime
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from sqlalchemy import func, text
from app.models import CleanwalkUser, User, db, Cleanwalk
from app.utils import validate_api_key


cleanwalks_bp = Blueprint('cleanwalks', __name__)

@cleanwalks_bp.before_request
def check_api_key():
    api_key = request.headers.get('X-API-Key')  # Get the api key from the header
    
    # Verify the api key
    if not validate_api_key(api_key):
        return jsonify({'message': 'Invalide API KEY'}), 401

# Secure routes

#------------------------------------GET------------------------------------#

# Route for get Cleanwalk by id
@cleanwalks_bp.route('/<int:cleanwalk_id>', methods=['GET'])
def get_cleanwalk_by_id(cleanwalk_id):
    cleanwalk = db.session.query(
        Cleanwalk.id.label('cleanwalk_id'),
        Cleanwalk.name.label('cleanwalk_name'),
        Cleanwalk.pos_lat,
        Cleanwalk.pos_long,
        Cleanwalk.date_begin,
        Cleanwalk.duration,
        Cleanwalk.description,
        Cleanwalk.address,
        User.firstname,
        User.lastname,
        User.role_id,
        User.profile_picture,
        User.id.label('author_id')
    ).join(
        CleanwalkUser, Cleanwalk.id == CleanwalkUser.cleanwalk_id
    ).join(
        User, CleanwalkUser.user_id == User.id
    ).filter(
        Cleanwalk.id == cleanwalk_id,
        CleanwalkUser.is_host == True
    ).one_or_none()  # Retrieves one or none object, which helps in case there are no records found or just one.

    if cleanwalk:
        cleanwalk_data = {
            'id': cleanwalk.cleanwalk_id,
            'name': cleanwalk.cleanwalk_name,
            'pos_lat': cleanwalk.pos_lat,
            'pos_long': cleanwalk.pos_long,
            'date_begin': cleanwalk.date_begin.isoformat(),
            'duration': cleanwalk.duration,
            'description': cleanwalk.description,
            'address': cleanwalk.address,
            'host': {
                'author_id': cleanwalk.author_id,  # This key is missing in the original code snippet, so I added it to match the expected JSON output
                'firstname': cleanwalk.firstname,
                'lastname': cleanwalk.lastname,
                'role_id': cleanwalk.role_id,
                'profile_picture': cleanwalk.profile_picture
            }
        }
        return jsonify(cleanwalk_data)
    else:
        return jsonify({'message': 'Cleanwalk not found'}), 404

    
# Route for get all Cleanwalks

@cleanwalks_bp.route('', methods=['GET'])

def get_all_cleanwalks():
    now = func.now()  # Use current server time; ensure that the server time zone matches your requirements
    two_months_later = func.date_add(now, text("interval 2 month"))  # Calculate the date 2 months from now

    cleanwalks = db.session.query(
        Cleanwalk.id.label('cleanwalk_id'),
        Cleanwalk.name.label('cleanwalk_name'),
        Cleanwalk.pos_lat,
        Cleanwalk.pos_long,
        Cleanwalk.date_begin,
        Cleanwalk.duration,
        Cleanwalk.description,
        Cleanwalk.address,
        User.firstname,
        User.lastname,
        User.role_id,
        User.profile_picture
    ).join(
        CleanwalkUser, Cleanwalk.id == CleanwalkUser.cleanwalk_id
    ).join(
        User, CleanwalkUser.user_id == User.id
    ).filter(
        CleanwalkUser.is_host == True,
        Cleanwalk.date_begin + func.interval(Cleanwalk.duration, 'MINUTE') > now,
        Cleanwalk.date_begin <= two_months_later
    ).all()

    cleanwalk_data = [{
        'id': cw.cleanwalk_id,
        'name': cw.cleanwalk_name,
        'pos_lat': cw.pos_lat,
        'pos_long': cw.pos_long,
        'date_begin': cw.date_begin.isoformat(),  # Format datetime for JSON output
        'duration': cw.duration,
        'description': cw.description,
        'address': cw.address,
        'host': {
            'firstname': cw.firstname,
            'lastname': cw.lastname,
            'role_id': cw.role_id,
            'profile_picture': cw.profile_picture
        }
    } for cw in cleanwalks] if cleanwalks else []

    return jsonify(cleanwalk_data)

#------------------------------------POST------------------------------------#

# Route for create a new Cleanwalk
@cleanwalks_bp.route('', methods=['POST'])
@jwt_required()
def create_cleanwalk():
    try:
        data = request.json
        new_cleanwalk = Cleanwalk(
            name=data['name'],
            pos_lat=data['pos_lat'],
            pos_long=data['pos_long'],
            date_begin=data['date_begin'],
            duration=data['duration'],
            description=data['description'],
            address=data['address']
        )
        db.session.add(new_cleanwalk)
        db.session.commit()  # Commit here to get the cleanwalk_id
        
        new_cleanwalk_user = CleanwalkUser(
            cleanwalk_id=new_cleanwalk.id,
            user_id=data['user_id'],  # This needs to be provided in the request
            is_host=True
        )
        db.session.add(new_cleanwalk_user)
        db.session.commit()

        return jsonify({'message': 'Cleanwalk and host association created successfully'}), 201

    except Exception as e:
        db.session.rollback()  # Roll back in case of error
        return jsonify({'error': str(e)}), 500

#------------------------------------PUT------------------------------------#

# Route for update a Cleanwalk by its ID
@cleanwalks_bp.route('/<int:cleanwalk_id>', methods=['PUT'])
def update_cleanwalk(cleanwalk_id):
    updated_cleanwalk_data = request.json
    cleanwalk = Cleanwalk.query.get(cleanwalk_id)

    if cleanwalk:
        cleanwalk.name = updated_cleanwalk_data['name']
        cleanwalk.pos_lat = updated_cleanwalk_data['pos_lat']
        cleanwalk.pos_long = updated_cleanwalk_data['pos_long']
        cleanwalk.date_begin = updated_cleanwalk_data['date_begin']
        cleanwalk.duration = updated_cleanwalk_data['duration']
        cleanwalk.description = updated_cleanwalk_data['description']
        cleanwalk.city_id = updated_cleanwalk_data['city_id']
        cleanwalk.address = updated_cleanwalk_data['address']
        db.session.commit()
        return jsonify({'message': 'Cleanwalk updated successfully'}), 200
    else:
        return jsonify({'message': 'Cleanwalk not found'}), 404
    
#------------------------------------DELETE------------------------------------#

# RRoute for delete a Cleanwalk by its ID
@cleanwalks_bp.route('/<int:cleanwalk_id>', methods=['DELETE'])
def delete_cleanwalk(cleanwalk_id):
    cleanwalk = Cleanwalk.query.get(cleanwalk_id)

    if cleanwalk:
        db.session.delete(cleanwalk)
        db.session.commit()
        return jsonify({'message': 'Cleanwalk deleted successfully'}), 200
    else:
        return jsonify({'message': 'Cleanwalk not found'}), 404

