from models import db, User, Course, ChatRoom, Message, Listing
import time
from app import app


if __name__ == '__main__':
    with app.app_context():
        user1 = User(username="ben", password="password")
        user2 = User(username="dan", password="password")
        user3 = User(username="steve", password="password")
        user4 = User(username="mike", password="password")
        db.session.add(user1)
        db.session.add(user2)
        db.session.add(user3)
        db.session.add(user4)
        db.session.commit()

        db.session.add(Listing(username="dan", subjects="CMPUT229", last_online=int(time.time()), location_lat=53.544388, location_long=-113.490929))
        db.session.add(Listing(username="steve", subjects="MATH114,MATH115", last_online=int(time.time()), location_lat=53.544388, location_long=-113.490929))
        db.session.add(Listing(username="mike", subjects="STAT252", last_online=int(time.time()), location_lat=53.544388, location_long=-113.490929))
        db.session.commit()
