import re

from datetime import date

from scrapy.http import Request
from scrapy.selector import Selector

from . import get_first, get_season
from .login import Login
from iuscrapy.items import ProfileItem

class Profile(Login):
    name = 'profile'

    def scrape(self, response):
        return Request('http://iulms.edu.pk/user/edit.php?cancelemailchange=1', callback=self.scrape_profile)

    def scrape_profile(self, response):
        sel = Selector(response)
        get = lambda x: '//div[contains(@class, "fcontainer")]/div[contains(@class, "fitem")]%s' % x
        pi = ProfileItem()
        pi['user'] = self.get_user_hash()
        pi['first_name'] = get_first(sel.xpath(get('/div[div/label[contains(text(), "First name")]]/following-sibling::div[1]/text()')).extract())
        pi['last_name'] = get_first(sel.xpath(get('/div[div/label[contains(text(), "Surname")]]/following-sibling::div[1]/text()')).extract())
        pi['email'] = get_first(sel.xpath(get('//input[@name="email"]/@value')).extract())
        pi['city'] = get_first(sel.xpath(get('//input[@name="city"]/@value')).extract())
        pi['country'] = get_first(sel.xpath(get('//select[@name="country"]/option[@selected]/@value')).extract())
        pi['timezone'] = get_first(sel.xpath(get('//select[@name="timezone"]/option[@selected]/text()')).extract())
        pi['language'] = get_first(sel.xpath(get('//select[@name="lang"]/option[@selected]/@value')).extract())
        pi['interests'] = get_first(sel.xpath(get('//textarea[@name="interests"]/@value')).extract())
        pi['website'] = get_first(sel.xpath(get('//input[@name="url"]/@value')).extract())

        messenger_values = []
        messengers = ['icq', 'skype', 'aim', 'yahoo', 'msn']
        for messenger in messengers:
            messenger_values.append(get_first(sel.xpath(get('//input[@name="%s"]/@value' % messenger)).extract()))
        pi['messengers'] = ', '.join(['%s: %s' % ((x, y) if y else (x, 'N/A')) for x,y in zip(messengers, messenger_values)])

        pi['id_number'] = get_first(sel.xpath(get('//input[@name="idnumber"]/@value')).extract())
        pi['institution'] = get_first(sel.xpath(get('//input[@name="institution"]/@value')).extract())
        pi['department'] = get_first(sel.xpath(get('//input[@name="department"]/@value')).extract())
        pi['landline_phone'] = get_first(sel.xpath(get('//input[@name="phone1"]/@value')).extract())
        pi['mobile_phone'] = get_first(sel.xpath(get('//input[@name="phone2"]/@value')).extract())
        pi['address'] = get_first(sel.xpath(get('//input[@name="address"]/@value')).extract())
        pi['image_urls'] = sel.xpath(get('//img[contains(@class, "userpicture")]/@src')).extract()
        yield pi