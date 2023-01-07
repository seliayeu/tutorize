import hashlib
import os

from db_interface import create_user, get_courses, login_user
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token
from flask_sqlalchemy import SQLAlchemy
from models import Course, db, setup

load_dotenv()


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(os.getcwd(), 'database.db')
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')
db.init_app(app)
jwt = JWTManager(app)


def gen_login_token(username):
    create_access_token(identity=username)


@app.route('/register', methods=['POST'])
def register():
    username = request.json['username']
    password = request.json['password']

    create_user(username, password)

    return jsonify(success=True), 200


@app.route('/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']
    token = login_user(username, password)

    if token:
        return jsonify(token=token), 200
    else:
        return jsonify(message='Access Denied'), 401


@app.route('/courses', methods=["GET"])
def get():
    return jsonify(courses=get_courses()), 200


if __name__ == '__main__':
    with app.app_context():
        setup()
    app.run(debug=True)
