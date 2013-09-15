import requests

from lxml import etree

from utils import get_first
from config import DEFAULT_HEADERS


def get_schedule(session):
    fields = [
        'secCourseCode', 'courseId', 'courseName', 'facultyName',
        'day', 'time', 'hours', 'location', 'today', 'sessionNo'
    ]
    get = lambda x: 'td[@class="detailsStyle"]/table/tr/td/span[contains(text(), "%s")]/following-sibling::text()[1]' % x
    schedules = []
    schedule_page = session.get('http://iulms.edu.pk/sic/Schedule.php', headers=DEFAULT_HEADERS)
    root = etree.HTML(schedule_page.content)
    trs = root.xpath('//div[p/span[contains(text(), "Semester Schedule")]]/following-sibling::table[1]/tr')
    for tr in trs:
        day = get_first(tr.xpath('td[@class="dateStyle"]/table/tr/td/span/text()'))
        time = get_first(tr.xpath('td[@class="dateStyle"]/table/tr/td/text()'))
        hours = get_first(tr.xpath('td[@class="dateStyle"]/table/tr/td/text()'))
        course_name = get_first(tr.xpath(get('Course Title'))).strip()
        faculty_name = get_first(tr.xpath(get('Faculty'))).strip()
        location = get_first(tr.xpath(get('Location'))).strip()
        edp_code = get_first(tr.xpath(get('EDP Code'))).strip()
        course_code = get_first(tr.xpath(get('Course Code'))).strip()
        schedule = [course_code, '', course_name, faculty_name, day, time, hours, location, '', '']
        schedules.append(dict(zip(fields, schedule)))
    return schedules