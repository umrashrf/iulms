#!/bin/bash

#cd /home/web/iulms/iuscrapy/iuscrapy
cd /home/umair/Development/IQRAUniversity/src/iuscrapy/iuscrapy
scrapy crawl login
scrapy crawl profile
scrapy crawl attendance
scrapy crawl schedule
scrapy crawl transcript