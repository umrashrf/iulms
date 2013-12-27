# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

from scrapy.item import Item, Field

class LoginItem(Item):
    user = Field()
    status = Field()

class AttendanceItem(Item):
    user = Field()
    semester = Field()
    course_id = Field()
    course_name = Field()
    sessions = Field()
    presents = Field()
    absents = Field()

class TranscriptItem(Item):
    user = Field()
    degree = Field()
    hours = Field()
    custom_cgpa = Field()
    courses = Field()