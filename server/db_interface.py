from models import db, User, Course
import hashlib
from flask_jwt_extended import create_access_token


def _hash_password(username, password):
    return hashlib.sha256((username+password).encode('utf-8')).hexdigest()


def create_user(username, password):
    new_user = User(username=username, password=_hash_password(username, password))
    db.session.add(new_user)
    db.session.commit()


def _check_password(username, password):
    hashed_password = db.session.query(User).filter_by(username=username).first().password

    return _hash_password(username, password) == hashed_password


def login_user(username, password):
    if _check_password(username, password):
        login_token = create_access_token(username)
        return login_token


def get_courses():
    return [course.id for course in db.session.query(Course).all()]
