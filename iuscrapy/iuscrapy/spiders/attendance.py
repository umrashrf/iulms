import re

from datetime import date

from scrapy.http import Request
from scrapy.selector import Selector

from . import get_first, get_season
from .login import Login
from iuscrapy.items import AttendanceItem

class Attendance(Login):
    name = 'attendance'
    start_urls = ['http://iulms.edu.pk/sic/StudentAttendance.php']

    def parse(self, response):
        sel = Selector(response)
        trs = sel.xpath('//table[contains(@class, "attendance-table")]/tr[position()>1 or contains(@class, "attendanceRow")]')
        today = date.today()
        for i, tr in enumerate(trs):
            ai = AttendanceItem()
            ai['_index'] = i
            ai['user'] = response.meta.get('user')
            ai['semester'] = '%s %s' % (get_season(today), today.strftime('%Y'))
            ai['course_name'] = get_first(tr.xpath('td[contains(@class, "attendanceRowCourse")]/text()').extract()).strip()
            ai['course_id'] = get_first(re.findall('\((\d+)\)$', ai['course_name']))
            ai['sessions'] = get_first(tr.xpath('td[2]/text()').extract()).strip()
            ai['presents'] = get_first(tr.xpath('td[3]/text()').extract()).strip()
            ai['absents'] = get_first(tr.xpath('td[4]/text()').extract()).strip()
            yield ai