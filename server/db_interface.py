from models import db, User, Course, ChatRoom, Message
import hashlib
from flask_jwt_extended import create_access_token
import uuid

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
    else:
        uid = str(uuid.uuid4())
        db.session.add(ChatRoom(user=username, id=uid))
        db.session.add(ChatRoom(user=recipient, id=uid))
        db.session.add(Message(chatroom=chatroom, user=username, content=content, timestamp=timestamp))
        db.session.commit()
