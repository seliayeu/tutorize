from flask_sqlalchemy import SQLAlchemy
import uuid

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'
    username = db.Column(db.String, primary_key=True)
    password = db.Column(db.String)


class Course(db.Model):
    __tablename__ = 'courses'
    id = db.Column(db.String, primary_key=True)


class Listing(db.Model):
    __tablename__ = 'listings'
    username = db.Column(db.String, db.ForeignKey('users.username'), primary_key=True)
    subjects = db.Column(db.String)
    last_online = db.Column(db.Integer)
    location_lat = db.Column(db.Float)
    location_long = db.Column(db.Float)


class ChatRoom(db.Model):
    __tablename__ = 'chatrooms'
    id = db.Column(db.String, primary_key=True)
    user = db.Column(db.String, primary_key=True)


class Message(db.Model):
    def gen_id():
        return str(uuid.uuid4())

    __tablename__ = 'messages'
    id = db.Column(db.String, primary_key=True, default=gen_id)
    chatroom = db.Column(db.String, db.ForeignKey('chatrooms.id'))
    user = db.Column(db.String, db.ForeignKey('users.username'))
    content = db.Column(db.String)
    timestamp = db.Column(db.Integer)




def upload_courses():
    with open('courses.txt') as f:
        for course in f.read().splitlines():
            existing_course = db.session.query(Course).filter_by(id=course).first()
            if not existing_course:
                new_course = Course(id=course)
                db.session.add(new_course)
                db.session.commit()


def setup():
    db.create_all()
    upload_courses()
