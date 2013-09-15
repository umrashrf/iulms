import requests

from lxml import etree

from config import DEFAULT_HEADERS


def login(uid, password):
    s = requests.Session()
    login = s.post('http://iulms.edu.pk/login/index.php', headers=DEFAULT_HEADERS,
                data={
                    'username': uid,
                    'password': password
                })
    root = etree.HTML(login.content)
    if root.xpath('//a[span[contains(text(), "Logout")]]'):
        return s
    s.close()
    return False