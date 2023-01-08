from models import db, User, Course, ChatRoom, Message, Listing
import hashlib
from flask_jwt_extended import create_access_token
import uuid
import time
from flask import jsonify

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


def get_user_chatrooms(username):
    chatroom_ids = [room.id for room in db.session.query(ChatRoom).filter_by(user=username).all()]

    results = []
    for chatroom_id in chatroom_ids:
        users = [room.user for room in db.session.query(ChatRoom).filter_by(id=chatroom_id).all()]
        results.append({
            "id": chatroom_id,
            "users": users
        })
    return results


def get_user_chat_history(username, chatroom_id):
    chatroom = db.session.query(ChatRoom).filter_by(user=username, id=chatroom_id).first()
    if chatroom is None:
        return None

    history = db.session.query(Message).filter_by(chatroom=chatroom_id).all()
    return [{"timestamp": message.timestamp, "user": message.user, "content": message.content} for message in history]


def send_message(username, recipient, content, timestamp):
    chatroom = db.engine.execute('select id from chatrooms where (user = ? or user = ?) group by id having count(*) >= 2', username, recipient).first()

    if chatroom:
        db.session.add(Message(chatroom=chatroom.id, user=username, content=content, timestamp=timestamp))
        db.session.commit()
        return chatroom.id
    else:
        uid = str(uuid.uuid4())
        db.session.add(ChatRoom(user=username, id=uid))
        db.session.add(ChatRoom(user=recipient, id=uid))
        db.session.add(Message(chatroom=chatroom, user=username, content=content, timestamp=timestamp))
        db.session.commit()
        return uid


def create_listing(username, subjects, location_lat, location_long):
    listing = db.session.query(Listing).filter_by(username=username).first()

    if listing:
        listing.subjects = ','.join(subjects)
        listing.location_lat = location_lat
        listing.location_long = location_long
        listing.last_online = time.time()
        db.session.commit()

    else:
        listing = Listing(username=username, subjects=','.join(subjects), location_lat=location_lat, location_long=location_long, last_online=int(time.time()))
        db.session.add(listing)
        db.session.commit()
    return jsonify(username=username, subjects=','.join(subjects), location_lat=location_lat, location_long=location_long, last_online=int(time.time()))


def update_listing(username, location_lat, location_long):
    listing = db.session.query(Listing).filter_by(username=username).first()

    if listing:
        listing.location_lat = location_lat
        listing.location_long = location_long
        listing.last_online = int(time.time())
        db.session.commit()
        return jsonify(username=username, subjects=listing.subjects, location_lat=location_lat, location_long=location_long, last_online=listing.last_online)


def find_tutors_live(current_time, subject):
    OFFSET = 60*60  # live within the last hour

    users = db.engine.execute(
        'select * from listings where ? - last_online <= ? and subjects like ?', current_time, OFFSET, f"%{subject}%"
    ).all()

    result = []
    for user in users:
        result.append({
            "username": user.username,
            "subjects": user.subjects.split(','),
            "last_online": user.last_online,
            "location_lat": user.location_lat,
            "location_long": user.location_long,
        })

    return jsonify(result)
