import platform

BOT_NAME = 'iuscrapy'

SPIDER_MODULES = ['iuscrapy.spiders']
NEWSPIDER_MODULE = 'iuscrapy.spiders'

User_Agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.65 Safari/537.36'

ITEM_PIPELINES = {
    'scrapy.contrib.pipeline.images.ImagesPipeline': 1
}

FEED_FORMAT = 'jsonlines'

FEED_URI = '/home/umair/Development/IQRAUniversity/src/iuscrapy/feeds/%(name)s/%(time)s.jl'
IMAGES_STORE = '/home/umair/Development/IQRAUniversity/src/iuscrapy/feeds/images'
SESSION_STORE = '/home/umair/Development/IQRAUniversity/.sessions'

PRODUCTION_PLATFORMS = ['web1']

if platform.node() in PRODUCTION_PLATFORMS:
    FEED_URI = '/home/web/iuscrapy/feeds'
    IMAGES_STORE = '/home/web/iuscrapy/feeds/images'
    SESSION_STORE = '/home/web/iuscrapy/.sessions'
