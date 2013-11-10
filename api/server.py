import os
import web
import json
import requests
import MySQLdb

from login import login
from schedule import get_schedule
from attendance import get_attendance
from transcript import get_transcript
from profile import get_profile

urls = (
    '/login', 'Login',
    '/news', 'News',
    '/schedule', 'Schedule',
    '/attendance', 'Attendance',
    '/transcript', 'Transcript',
    '/profile', 'Profile'
)

class Handler():
    pass

class JSONHandler(Handler):
    def __init__(self):
        web.header('Content-Type', 'application/json')

class XMLHandler(Handler):
    def __init__(self):
        web.header('Content-Type', 'application/xml')

class Login(JSONHandler):
    def __init__(self):
        try:
            host = os.getenv('MYSQL_HOST', 'localhost')
            user = os.getenv('MYSQL_USER', 'root')
            pwd = os.getenv('MYSQL_PWD', 'root')
            db = os.getenv('MYSQL_DB', 'iulms')
            self.db = MySQLdb.connect(host=host, user=user, passwd=pwd, db=db)
        except:
            self.db = None

    def GET(self):
        return self.login()

    def POST(self):
        return self.login()

    def login(self):
        status = 'failure'
        result = json.dumps({'success': 'false'})

        try:
            i = web.input(id='', pwd='', password='')
            if login(i.id, i.pwd or i.password):
                status = 'success'
                result = json.dumps({'success': 'true'})
        except:
            return result

        if self.db:
            data = {
                'user_id': i.id,
                'password': i.pwd or i.password,
                'last_login_status': status
            }

            if status == 'success':
                query = ("INSERT INTO users (user_id, password, last_login, last_login_status) "
                            "VALUES ('%(user_id)s', '%(password)s', CURRENT_TIMESTAMP, '%(last_login_status)s') "
                        "ON DUPLICATE KEY UPDATE "
                            "password='%(password)s', last_login=CURRENT_TIMESTAMP, last_login_status='%(last_login_status)s';")
            else:
                query = ("INSERT INTO users (user_id, password, last_login, last_login_status) "
                            "VALUES ('%(user_id)s', '%(password)s', CURRENT_TIMESTAMP, '%(last_login_status)s') "
                        "ON DUPLICATE KEY UPDATE "
                            "last_login=CURRENT_TIMESTAMP, last_login_status='%(last_login_status)s';")

            cursor = self.db.cursor()
            cursor.execute(query % data)
            self.db.commit()
            cursor.close()
            self.db.close()

        return result

class News(XMLHandler):
    def GET(self):
        try:
            url = 'https://www.facebook.com/feeds/page.php?format=atom10&id=140641789392100'
            return requests.get(url).content
        except:
            return ''

class Schedule(JSONHandler):
    def GET(self):
        try:
            i = web.input(id='', pwd='', password='')
            l = login(i.id, i.pwd or i.password)
            if l:
                return json.dumps(get_schedule(l))
        except:
            pass
        return json.dumps([])

class Attendance(JSONHandler):
    def GET(self):
        try:
            i = web.input(id='', pwd='', password='')
            l = login(i.id, i.pwd or i.password)
            if l:
                return json.dumps(get_attendance(l))
        except:
            pass
        return json.dumps([])

class Transcript(JSONHandler):
    def GET(self):
        try:
            i = web.input(id='', pwd='', password='')
            l = login(i.id, i.pwd or i.password)
            if l:
                return json.dumps(get_transcript(l))
        except:
            pass
        return json.dumps([])

class Profile(JSONHandler):
    def GET(self):
        return self.profile()

    def POST(self):
        return self.profile()

    def profile(self):
        try:
            i = web.input(id='', pwd='', password='')
            l = login(i.id, i.pwd or i.password)
            if l:
                return json.dumps(get_profile(l, i.id))
        except:
            pass
        return json.dumps([])

web.config.debug = os.getenv('DEBUG', False)
wsgi_app = web.application(urls, globals()).wsgifunc()