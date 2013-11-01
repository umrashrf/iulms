#!/usr/bin/python

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
    '/profile', 'Profile',
    '/(.*)', 'General'
)

class Handler():
    pass

class General(Handler):
    app_dir = 'sencha'
    app_dir = 'build/production/me.umairashraf.iu'

    def GET(self, path):
        try:
            if path.startswith('touch/'):
                self.app_dir = ''
            root = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "../"))
            dest = '%s/%s/index.html' % (root, self.app_dir)
            if path:
                dest = '%s/%s/%s' % (root, self.app_dir, path)
            with open(dest, 'r') as f:
                return f.read()
        except:
            status = '404 Not Found'
            headers = {'Content-Type': 'text/html'}
            data = 'Resource not found.'
            raise web.HTTPError(status, headers, data)
        return ''

class JSONHandler(Handler):
    def __init__(self):
        web.header('Content-Type', 'application/json')

class XMLHandler(Handler):
    def __init__(self):
        web.header('Content-Type', 'application/xml')

class Login(JSONHandler):
    def __init__(self):
        host = os.getenv('MYSQL_HOST', 'localhost')
        user = os.getenv('MYSQL_USER', 'root')
        pwd = os.getenv('MYSQL_PWD', 'root')
        db = os.getenv('MYSQL_DB', 'iulms')
        self.db = MySQLdb.connect(host=host, user=user, passwd=pwd, db=db)

    def GET(self):
        status = 'failure'
        result = json.dumps({'success': 'false'})

        i = web.input(id='', pwd='', password='')
        if login(i.id, i.pwd or i.password):
            status = 'success'
            result = json.dumps({'success': 'true'})

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

    def POST(self):
        status = 'failure'
        result = json.dumps({'success': 'false'})

        i = web.input(id='', pwd='', password='')
        if login(i.id, i.pwd or i.password):
            status = 'success'
            result = json.dumps({'success': 'true'})

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
        url = 'https://www.facebook.com/feeds/page.php?format=atom10&id=140641789392100'
        return requests.get(url).content

class Schedule(JSONHandler):
    def GET(self):
        i = web.input(id='', pwd='', password='')
        l = login(i.id, i.pwd or i.password)
        if l:
            return json.dumps(get_schedule(l))
        return json.dumps([])

class Attendance(JSONHandler):
    def GET(self):
        i = web.input(id='', pwd='', password='')
        l = login(i.id, i.pwd or i.password)
        if l:
            return json.dumps(get_attendance(l))
        return json.dumps([])

class Transcript(JSONHandler):
    def GET(self):
        i = web.input(id='', pwd='', password='')
        l = login(i.id, i.pwd or i.password)
        if l:
            return json.dumps(get_transcript(l))
        return json.dumps([])

class Profile(JSONHandler):
    def GET(self):
        i = web.input(id='', pwd='', password='')
        l = login(i.id, i.pwd or i.password)
        if l:
            return json.dumps(get_profile(l, i.id))
        return json.dumps([])

    def POST(self):
        i = web.input(id='', pwd='', password='')
        l = login(i.id, i.pwd or i.password)
        if l:
            return json.dumps(get_profile(l, i.id))
        return json.dumps([])

if __name__ == '__main__':
    web.wsgi.runwsgi = lambda func, addr=None: web.wsgi.runfcgi(func, addr)
    app = web.application(urls, globals())
    app.run()