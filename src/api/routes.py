"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)
  

@api.route('/signup', methods=['POST'])
def signup():

    data = request.get_json()
    required_fields = ["email", "password", "is_active"]

    for field in required_fields:
        if field not in data:
            return jsonify({"msg": f"Falta el campo: {field}"}, 400)

    try:
        newUser = User (
            email = data["email"],
            password = data["password"],
            is_active = data["is_active"]
        )
        db.session.add(newUser)
        db.session.commit()

        return jsonify({"msg": "usuario creado exitosamente"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": f"error agregando nuevo usuario a la base de datos: {e}"}), 500
    

@api.route('/token', methods=['POST'])
def token():
    data = request.get_json()
    fields = ["email", "password", "is_active"]

    for field in fields:
        if field not in data:
            return jsonify({"msg": f"Falta el campo: {field}"}, 400)
    
    email = data["email"]
    password = data["password"]
        
    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        return jsonify({"msg": "email o password incoreccto"}), 401
    
    access_token = create_access_token(identity=user.id)

    return jsonify({"msg": "ok", "token": access_token, "user_id": user.id, "email": user.email})

@api.route('/users', methods=['POST'])
def users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 201

@api.route('/private', methods=['GET'])
@jwt_required()
def private_route():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    return jsonify({"user_id": user.id, "email": user.email}), 201