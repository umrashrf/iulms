import hashlib

from scrapy import log
from scrapy.spider import BaseSpider
from scrapy.selector import Selector
from scrapy.http import Request, FormRequest

from iuscrapy.items import LoginItem

class Login(BaseSpider):
    name = 'login'
    start_urls = ['http://iulms.edu.pk/login/index.php']

    usr = '20934'
    pwd = 'maximus'
    campus = 'karachi_main'

    def parse(self, response):
        return FormRequest(self.start_urls[0], callback=self.after_login,
                            formdata={
                                'username': self.usr,
                                'password': self.pwd
                            })

    def after_login(self, response):
        sel = Selector(response)
        if not sel.xpath('//a[span[contains(text(), "Logout")]]'):
            self.log('Login failed', level=log.ERROR)
            return
        return self.scrape(response)

    def scrape(self, response):
        sel = Selector(response)
        li = LoginItem()
        li['user'] = self.get_user_hash()
        li['status'] = 'success' if sel.xpath('//a[span[contains(text(), "Logout")]]') else 'failure'
        return li

    def get_user_hash(self):
        m = hashlib.md5()
        m.update(self.usr)
        m.update(self.campus)
        return m.hexdigest()