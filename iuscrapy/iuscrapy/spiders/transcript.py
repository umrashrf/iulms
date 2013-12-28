import re
import json

from scrapy.http import Request, FormRequest
from scrapy.selector import Selector

from . import get_first
from .login import Login
from iuscrapy.items import TranscriptItem

class Transcript(Login):
    name = 'transcript'
    start_urls = ['http://iulms.edu.pk/sic/Transcript.php']

    def parse(self, response):
        sel = Selector(response)
        degrees = sel.xpath('id("cmbDegree")/option')
        for degree in degrees:
            name = get_first(degree.xpath('text()').extract())
            slug = get_first(degree.xpath('@value').extract())
            yield FormRequest('http://iulms.edu.pk/sic/SICDataService.php',
                    callback=self.parse_transcript, dont_filter=True,
                    formdata={
                        'action': 'GetTranscript',
                        'degreeId': slug
                    },
                    meta={
                        'degree_name': name,
                        'degree_slug': slug,
                        'cookiejar': response.meta.get('cookiejar')
                    })

    def parse_transcript(self, response):
        data = re.sub('[\x90-\xff]', '', response.body)
        transcript = json.loads(data)

        cgpa = 0
        hours = 0
        for course in transcript['attemptedCourses']:
            if not course['crsGrade'] in ['F', 'W', 'I']:
                hours += int(course['crsHours'])
                cgpa += float(course['gpa']) * int(course['crsHours'])

        ti = TranscriptItem()
        ti['user'] = response.meta.get('user')
        ti['degree'] = {
            'slug': response.meta.get('degree_name'),
            'name': response.meta.get('degree_name')
        }
        ti['degree'] = hours
        #ti['custom_cgpa'] = round(cgpa / hours, 2)
        ti['courses'] = transcript
        return ti