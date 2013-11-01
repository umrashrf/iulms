import re
import requests

from lxml import etree
from datetime import date

from utils import get_first
from config import DEFAULT_HEADERS


def get_attendance(session):
    fields = [
        'semester', 'course_id', 'course_name',
        'sessions', 'presents', 'absents'
    ]
    get = lambda x: 'td[@class="detailsStyle"]/table/tr/td/span[contains(text(), "%s")]/following-sibling::text()[1]' % x
    attendances = []
    attendance_page = session.get('http://iulms.edu.pk/sic/StudentAttendance.php', headers=DEFAULT_HEADERS)
    root = etree.HTML(attendance_page.content)
    trs = root.xpath('//table[contains(@class, "attendance-table")]/tr[position()>1 or contains(@class, "attendanceRow")]')
    for tr in trs:
        today = date.today()
        semester = '%s %s' % (get_season(today), today.strftime('%Y'))
        course_name = get_first(tr.xpath('td[contains(@class, "attendanceRowCourse")]/text()')).strip()
        course_id = get_first(re.findall('\((\d+)\)$', course_name))
        sessions = get_first(tr.xpath('td[2]/text()')).strip()
        presents = get_first(tr.xpath('td[3]/text()')).strip()
        absents = get_first(tr.xpath('td[4]/text()')).strip()
        attendance = [semester, course_id, course_name, sessions, presents, absents]
        attendances.append(dict(zip(fields, attendance)))
    return attendances

def get_season(date):
    # convert date to month and day as integer (md), e.g. 4/21 = 421, 11/17 = 1117, etc.
    m = date.month * 100
    d = date.day
    md = m + d
    if ((md > 320) and (md < 621)):
        s = 'Spring'
    elif ((md > 620) and (md < 923)):
        s = 'Summer'
    elif ((md > 922) and (md < 1223)):
        s = 'Fall'
    else:
        s = 'Winter'
    return s