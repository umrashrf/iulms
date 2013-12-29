BOT_NAME = 'iuscrapy'

SPIDER_MODULES = ['iuscrapy.spiders']
NEWSPIDER_MODULE = 'iuscrapy.spiders'

User_Agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.65 Safari/537.36'

ITEM_PIPELINES = {
    'scrapy.contrib.pipeline.images.ImagesPipeline': 1
}

IMAGES_STORE = '/home/umair/Development/IQRAUniversity/src/iuscrapy/images'
SESSION_STORE = '/home/umair/Development/IQRAUniversity/.sessions'

PRODUCTION_PLATFORMS = ['web1']

if platform.node() in PRODUCTION_PLATFORMS:
    IMAGES_STORE = '/home/web/iulms/iuscrapy/images'
    SESSION_STORE = '/home/web/iulms/iuscrapy/.sessions'
