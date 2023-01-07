from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class User(db.Model):
    username = db.Column(db.String, primary_key=True)
    password = db.Column(db.String)


class Course(db.Model):
    id = db.Column(db.String, primary_key=True)


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
