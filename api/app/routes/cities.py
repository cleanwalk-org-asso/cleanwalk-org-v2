from flask import Blueprint, jsonify, request
from app.models import db, City
from app.utils import validate_api_key

cities_bp = Blueprint('cities', __name__)

@cities_bp.before_request
def check_api_key():
    if request.method == 'OPTIONS': # Handle preflight requests to enable CORS
        return
    api_key = request.headers.get('X-API-Key')  # Get the api key from the header
    
    # Verify the api key
    if not validate_api_key(api_key):
        return jsonify({'message': 'Invalide API KEY'}), 401

# Secure routes

#------------------------------------GET------------------------------------#

# Route for get city by id
@cities_bp.route('/<int:city_id>', methods=['GET'])
def get_city(city_id):
    city = City.query.get(city_id)

    if city:
        city_data = {
            'id': city.id,
            'name': city.name,
        }
        return jsonify(city_data)
    else:
        return jsonify({'message': 'City not found'}), 404
    
# Route for get all cities
@cities_bp.route('', methods=['GET'])
def get_all_cities():
    cities = City.query.all()
    if cities:
        city_data = []
        for city in cities:
            city_data.append({
                'id': city.id,
                'name': city.name,
            })
        return jsonify(city_data)
    else:
        return jsonify({'message': 'Cities not found'}), 404

#------------------------------------POST------------------------------------#

# Route for create a new city
@cities_bp.route('', methods=['POST'])
def create_city():
    new_city_data = request.json
    new_city = City(
        name=new_city_data['name'],
    )
    db.session.add(new_city)
    db.session.commit()
    return jsonify({'message': 'City created successfully'}), 201

#------------------------------------PUT------------------------------------#

# Route for update a city by its ID
@cities_bp.route('/<int:city_id>', methods=['PUT'])
def update_city(city_id):
    updated_city_data = request.json
    city = City.query.get(city_id)

    if city:
        city.name = updated_city_data['name']
        db.session.commit()
        return jsonify({'message': 'City updated successfully'}), 200
    else:
        return jsonify({'message': 'City not found'}), 404
    
#------------------------------------DELETE------------------------------------#

# Route for delete city by id
@cities_bp.route('/<int:city_id>', methods=['DELETE'])
def delete_city(city_id):
    city = City.query.get(city_id)

    if city:
        db.session.delete(city)
        db.session.commit()
        return jsonify({'message': 'City deleted successfully'}), 200
    else:
        return jsonify({'message': 'City not found'}), 404
