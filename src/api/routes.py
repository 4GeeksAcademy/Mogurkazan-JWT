"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)



# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def get_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

@api.route("/signup", methods=["POST"])
def create_user():
    request_body= request.json
    user_query= User.query.filter_by(email=request_body["email"]).first()
    if user_query is None:
        create_user = User(email=request_body["email"], password=request_body["password"], is_active=request_body["is_active"])
        db.session.add(create_user)
        db.session.commit()
        response_body= {
            "msg":"usuario creado con éxito"
        }
        return jsonify(response_body),200
    else: 
        response_body={
            "msg":"usuario ya existe"
        }
        return jsonify(response_body),404


# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['GET'])
def handle_user():

    response_body = {
        "email":"email",
        "password":"password"
    }

    return jsonify(response_body), 200
