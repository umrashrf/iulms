import re, json

from scrapy.spider import BaseSpider
from scrapy.http import Request, FormRequest

from .login import Login

class FileServer(BaseSpider):
    name = 'fileserver'
    start_urls = ['https://gist.github.com/umrashrf/8138686/raw/87291cd3d82e43efab4b455a7fcffac64738f257/iulms.fs.pub.json']

    def parse(self, response):
        return self.download(response)

    def scrape(self, response):
        return Request('http://iulms.edu.pk/FileServer/filemanager/action.php?fmContainer=fmCont1&fmMode=refresh&preventCache=1388090040446',
                    callback=self.download)

    def download(self, response):
        sizes = []
        pattern = r"([a-zA-Z_][a-zA-Z_0-9]*)\s*\:"
        repl = lambda match: '"{}":'.format(match.group(1))
        data = eval(re.sub(pattern, repl, response.body))
        for item in data['entries']['items']:
            sizes.append(item['size'])
        print sizes
