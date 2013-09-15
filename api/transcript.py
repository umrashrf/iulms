import json
import requests

from lxml import etree

from utils import get_first
from config import DEFAULT_HEADERS


def get_transcript(session):
    transcripts = []
    transcript_page = session.get('http://iulms.edu.pk/sic/Transcript.php', headers=DEFAULT_HEADERS)
    root = etree.HTML(transcript_page.content)
    degrees = root.xpath('id("cmbDegree")/option')
    for degree in degrees:
        name = get_first(degree.xpath('text()'))
        slug = get_first(degree.xpath('@value'))
        degree = {'slug': slug, 'name': name}

        transcript = session.post('http://iulms.edu.pk/sic/SICDataService.php',
                                            headers=DEFAULT_HEADERS,
                                            data={
                                                'action': 'GetTranscript',
                                                'degreeId': slug
                                            })
        transcript = json.loads(transcript.content)
        transcript['degree'] = degree

        cgpa = 0
        hours = 0
        for course in transcript['attemptedCourses']:
            if not course['crsGrade'] in ['F', 'W', 'I']:
                hours += int(course['crsHours'])
                cgpa += float(course['gpa']) * int(course['crsHours'])

        transcript['hours'] = hours
        transcript['custom_cgpa'] = round(cgpa / hours, 2)

        transcripts.append(transcript)

    return transcripts[0]