import re

from scrapy.http import Request
from scrapy.selector import Selector

from . import get_first
from .login import Login
from iuscrapy.items import ResultItem

class ExamResult(Login):
    name = 'exam_result'
    start_urls = ['http://iulms.edu.pk/sic/examresult.php']

    def parse(self, response):
        sel = Selector(response)
        trs = sel.xpath('//table[contains(@class, "tblAttendance")]/tr[position()>1 and position()<last()]')
        for i, tr in enumerate(trs):
            ri = ResultItem()
            ri['_index'] = i
            ri['user'] = response.meta.get('user')
            ri['course_name'] = get_first(tr.xpath('td[1]/text()').extract()).strip()
            ri['midterm'] = get_first(tr.xpath('td[2]/text()').extract()).strip()
            ri['quizes_assignments'] = get_first(tr.xpath('td[3]/text()').extract()).strip()
            ri['project'] = get_first(tr.xpath('td[4]/text()').extract()).strip()
            ri['final'] = get_first(tr.xpath('td[5]/text()').extract()).strip()
            ri['total'] = get_first(tr.xpath('td[6]/text()').extract()).strip()
            ri['grade'] = get_first(tr.xpath('td[7]/text()').extract()).strip()
            ri['points'] = get_first(tr.xpath('td[8]/text()').extract()).strip()
            yield ri