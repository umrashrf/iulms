#!/usr/bin/python

import os
import web
import json
import requests

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

    def GET(self, path):
        root = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "../"))
        dest = '%s/%s/index.html' % (root, self.app_dir)
        if path:
            dest = '%s/%s/%s' % (root, self.app_dir, path)
        with open(dest, 'r') as f:
            return f.read()
        return ''

class JSONFeed(Handler):
    def __init__(self):
        #web.header('Content-Type', 'application/json')
        pass

class Login(JSONFeed):
    def GET(self):
        i = web.input(id='', pwd='', password='')
        if login(i.id, i.pwd or i.password):
            return json.dumps({'success': 'true'})
        return json.dumps({'success': 'false'})

    def POST(self):
        i = web.input(id='', pwd='', password='')
        if login(i.id, i.pwd or i.password):
            return json.dumps({'success': 'true'})
        return json.dumps({'success': 'false'})

class News:
    def GET(self):
        url = 'https://www.facebook.com/feeds/page.php?format=atom10&id=140641789392100'
        return requests.get(url).content

class Schedule(JSONFeed):
    def GET(self):
        i = web.input(id='', pwd='', password='')
        l = login(i.id, i.pwd or i.password)
        if l:
            return json.dumps(get_schedule(l))
        return json.dumps([])

class Attendance(JSONFeed):
    def GET(self):
        i = web.input(id='', pwd='', password='')
        l = login(i.id, i.pwd or i.password)
        if l:
            return json.dumps(get_attendance(l))
        return json.dumps([])

class Transcript(JSONFeed):
    def GET(self):
        i = web.input(id='', pwd='', password='')
        l = login(i.id, i.pwd or i.password)
        if l:
            return json.dumps(get_transcript(l))
        return json.dumps([])

class Profile(JSONFeed):
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
    app = web.application(urls, globals())
    app.run()