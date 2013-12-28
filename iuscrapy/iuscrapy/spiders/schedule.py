from scrapy.http import Request
from scrapy.selector import Selector

from . import get_first
from .login import Login
from iuscrapy.items import ScheduleItem

class Schedule(Login):
    name = 'schedule'
    start_urls = ['http://iulms.edu.pk/sic/Schedule.php']

    def parse(self, response):
        sel = Selector(response)
        get = lambda x: 'td[@class="detailsStyle"]/table/tr/td/span[contains(text(), "%s")]/following-sibling::text()[1]' % x
        trs = sel.xpath('//div[p/span[contains(text(), "Semester Schedule")]]/following-sibling::table[1]/tr')
        for i, tr in enumerate(trs):
            ai = ScheduleItem()
            ai['_index'] = i
            ai['user'] = response.meta.get('user')
            day = get_first(tr.xpath('td[@class="dateStyle"]/table/tr/td/span/text()').extract()).title()
            ai['day'] = 'N/A' if day == 'Non' else day
            time = get_first(tr.xpath('td[@class="dateStyle"]/table/tr/td/text()').extract())
            ai['time'] = '00:00/00:00' if time == '/' else time
            ai['hours'] = get_first(tr.xpath('td[@class="dateStyle"]/table/tr/td/text()').extract())
            ai['location'] = get_first(tr.xpath(get('Location')).extract()).strip()
            ai['edp_code'] = get_first(tr.xpath(get('EDP Code')).extract()).strip()
            ai['course_code'] = get_first(tr.xpath(get('Course Code')).extract()).strip()
            ai['course_name'] = get_first(tr.xpath(get('Course Title')).extract()).strip()
            ai['faculty_name'] = get_first(tr.xpath(get('Faculty')).extract()).strip()
            yield ai