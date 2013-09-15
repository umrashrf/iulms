import re
import requests

from lxml import etree

from utils import get_first
from config import DEFAULT_HEADERS


def get_profile(session, reg_id):
    transcripts = []
    profile_page = session.get('http://iulms.edu.pk/user/edit.php?cancelemailchange=1', headers=DEFAULT_HEADERS)
    root = etree.HTML(profile_page.content)
    fields = ['reg_id', 'first_name', 'last_name', 'email']
    first_name = just_words(get_first(root.xpath('//div[div/label[contains(text(), "First name")]]/following-sibling::div[1]/text()')).strip())
    last_name = just_words(get_first(root.xpath('//div[div/label[contains(text(), "Surname")]]/following-sibling::div[1]/text()')).strip())
    email = get_first(root.xpath('//input[@name="email"]/@value'))
    return dict(zip(fields, [reg_id, first_name, last_name, email]))

def just_words(text):
    return ' '.join(re.findall('[a-zA-Z]+', text))