# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

from scrapy.item import Item, Field

class LoginItem(Item):
    user = Field()
    status = Field()

class ProfileItem(Item):
    user = Field()
    first_name = Field()
    last_name = Field()
    email = Field()
    city = Field()
    country = Field()
    timezone = Field()
    language = Field()
    interests = Field()
    website = Field()
    messengers = Field()
    id_number = Field()
    institution = Field()
    department = Field()
    landline_phone = Field()
    mobile_phone = Field()
    address = Field()
    image_urls = Field()
    images = Field()

class AttendanceItem(Item):
    user = Field()
    semester = Field()
    course_id = Field()
    course_name = Field()
    sessions = Field()
    presents = Field()
    absents = Field()
    _index = Field()

class ScheduleItem(Item):
    user = Field()
    edp_code = Field()
    course_code = Field()
    course_id = Field()
    course_name = Field()
    faculty_name = Field()
    day = Field()
    time = Field()
    hours = Field()
    location = Field()
    today = Field()
    session_no = Field()
    _index = Field()

class TranscriptItem(Item):
    user = Field()
    degree = Field()
    hours = Field()
    custom_cgpa = Field()
    courses = Field()

class ResultItem(Item):
    user = Field()
    course_name = Field()
    midterm = Field()
    quizes_assignments = Field()
    project = Field()
    final = Field()
    total = Field()
    grade = Field()
    points = Field()
    _index = Field()