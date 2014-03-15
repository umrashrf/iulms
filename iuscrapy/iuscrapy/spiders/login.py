import os
import json
import hashlib
import MySQLdb

from scrapy import log
from scrapy.conf import settings
from scrapy.spider import BaseSpider
from scrapy.selector import Selector
from scrapy.http import Request, FormRequest

from iuscrapy.items import LoginItem
from . import cookie_dict, flush_sessions

class Login(BaseSpider):
    name = 'login'
    start_urls = ['http://iulms.edu.pk/login/index.php']

    login_url = 'http://iulms.edu.pk/login/index.php'
    campus = 'karachi_main'

    def start_requests(self):
        try:
            host = os.getenv('MYSQL_HOST', 'localhost')
            user = os.getenv('MYSQL_USER', 'root')
            pwd = os.getenv('MYSQL_PWD', 'root')
            db = os.getenv('MYSQL_DB', 'iulms')
            self.db = MySQLdb.connect(host=host, user=user, passwd=pwd, db=db)
        except:
            self.log('MySQL database connection failed', level=log.ERROR)
            return []

        # flushing old session files (1 hour old)
        flush_sessions(settings['SESSION_STORE'])

        cursor = self.db.cursor()
        cursor.execute("SELECT * FROM users WHERE last_login_status = 'success'")
        reqs = []
        for u in cursor.fetchall():
            m = hashlib.md5()
            m.update(u[0])
            m.update(self.campus)
            user = m.hexdigest()

            session_file = '%s/%s' % (settings['SESSION_STORE'], user)
            if os.path.isfile(session_file):
                with open(session_file, 'r') as f:
                    for url in self.start_urls:
                        reqs.append(
                            Request(url, callback=self.parse, dont_filter=True,
                                cookies=json.loads(f.read()), meta={'user': user, 'cookiejar': user}))
            else:
                reqs.append(
                    FormRequest(self.login_url, callback=self.after_login, dont_filter=True,
                        formdata={
                            'username': u[0],
                            'password': u[1]
                        },
                        meta={
                            'user': user,
                            'cookiejar': user
                        }))
        return reqs

    def after_login(self, response):
        sel = Selector(response)
        user = response.meta.get('user')
        if sel.xpath('//a[span[contains(text(), "Logout")]]'):
            with open('%s/%s' % (settings['SESSION_STORE'], user), 'w+') as f:
                f.write(json.dumps(cookie_dict(response.request.headers.get('Cookie'))))
        else:
            self.log('Login failed for %s' % user, level=log.ERROR)
            return
        return self.parse(response)

    def parse(self, response):
        sel = Selector(response)
        li = LoginItem()
        li['user'] = response.meta.get('user')
        li['status'] = 'success' if sel.xpath('//a[span[contains(text(), "Logout")]]') else 'failure'
        return li