from flask import Blueprint, jsonify, request
from app.models import db, Cleanwalk
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
def get_cleanwalk(cleanwalk_id):
    cleanwalk = Cleanwalk.query.get(cleanwalk_id)

    if cleanwalk:
        cleanwalk_data = {
            'id': cleanwalk.id,
            'name': cleanwalk.name,
            'pos_lat': cleanwalk.pos_lat,
            'pos_long': cleanwalk.pos_long,
            'date_begin': cleanwalk.date_begin,
            'duration': cleanwalk.duration,
            'description': cleanwalk.description,
            'author_id': cleanwalk.author_id,
            'city_id': cleanwalk.city_id,
            'address': cleanwalk.address
        }
        return jsonify(cleanwalk_data)
    else:
        return jsonify({'message': 'Cleanwalk not found'}), 404
    
# Route for get all Cleanwalks
@cleanwalks_bp.route('', methods=['GET'])
def get_all_cleanwalks():
    cleanwalks = Cleanwalk.query.all()
    if cleanwalks:
        cleanwalk_data = []
        for cleanwalk in cleanwalks:
            cleanwalk_data.append({
                'id': cleanwalk.id,
                'name': cleanwalk.name,
                'pos_lat': cleanwalk.pos_lat,
                'pos_long': cleanwalk.pos_long,
                'date_begin': cleanwalk.date_begin,
                'duration': cleanwalk.duration,
                'description': cleanwalk.description,
                'city_id': cleanwalk.city_id,
                'address': cleanwalk.address
            })
        return jsonify(cleanwalk_data)
    else:
        return jsonify({'message': 'Cleanwalks not found'}), 404

#------------------------------------POST------------------------------------#

# Route for create a new Cleanwalk
@cleanwalks_bp.route('', methods=['POST'])
def create_cleanwalk():
    new_cleanwalk_data = request.json
    new_cleanwalk = Cleanwalk(
        name=new_cleanwalk_data['name'],
        pos_lat=new_cleanwalk_data['pos_lat'],
        pos_long=new_cleanwalk_data['pos_long'],
        date_begin=new_cleanwalk_data['date_begin'],
        duration=new_cleanwalk_data['duration'],
        description=new_cleanwalk_data['description'],
        author_id=new_cleanwalk_data['author_id'],
        city_id=new_cleanwalk_data['city_id'],
        address=new_cleanwalk_data['address']
    )
    db.session.add(new_cleanwalk)
    db.session.commit()
    return jsonify({'message': 'Cleanwalk created successfully'}), 201

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
        cleanwalk.author_id = updated_cleanwalk_data['author_id']
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
