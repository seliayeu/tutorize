from models import db, User, Course, ChatRoom, Message, Listing
import time
from app import app
from db_interface import _hash_password


if __name__ == '__main__':
    with app.app_context():
        user1 = User(username="ben", password=_hash_password("ben", "password"))
        user2 = User(username="dan", password=_hash_password("dan", "password"))
        user3 = User(username="steve", password=_hash_password("steve", "password"))
        user4 = User(username="mike", password=_hash_password("mike", "password"))
        db.session.add(user1)
        db.session.add(user2)
        db.session.add(user3)
        db.session.add(user4)
        db.session.commit()

        db.session.add(Listing(username="dan", subjects="CMPUT229", last_online=int(time.time()), location_lat=53.544388, location_long=-113.490929))
        db.session.add(Listing(username="steve", subjects="MATH114,MATH115", last_online=int(time.time()), location_lat=53.544388, location_long=-113.490929))
        db.session.add(Listing(username="mike", subjects="STAT252", last_online=int(time.time()), location_lat=53.544388, location_long=-113.490929))
        db.session.commit()

        db.session.add(ChatRoom(id="123123123123", user="ben"))
        db.session.add(ChatRoom(id="123123123123", user="dan"))
        db.session.add(ChatRoom(id="312312312321312", user="ben"))
        db.session.add(ChatRoom(id="312312312321312", user="steve"))
        db.session.commit()

        db.session.add(Message(chatroom="123123123123", user="ben", content="hi", timestamp=int(time.time())))
        db.session.add(Message(chatroom="123123123123", user="dan", content="hey", timestamp=int(time.time())))
        db.session.commit()
