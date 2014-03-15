import os
import datetime

def get_first(obj, index=0):
    if obj and len(obj) > index:
        return obj[index]
    return ''

def get_season(date):
    # convert date to month and day as integer (md), e.g. 4/21 = 421, 11/17 = 1117, etc.
    m = date.month * 100
    d = date.day
    md = m + d
    if ((md > 320) and (md < 621)):
        s = 'Spring'
    elif ((md > 620) and (md < 923)):
        s = 'Summer'
    elif ((md > 922) and (md < 1223)):
        s = 'Fall'
    else:
        s = 'Winter'
    return s

def cookie_dict(cookie_str):
    cookies = {}
    for c in cookie_str.split(';'):
        cparts = c.strip().split('=')
        cookies.update({ cparts[0]: cparts[1] })
    return cookies

def flush_sessions(dir_to_search, minutes=60):
    for dirpath, dirnames, filenames in os.walk(dir_to_search):
       for f in filenames:
          curpath = os.path.join(dirpath, f)
          file_modified = datetime.datetime.fromtimestamp(os.path.getmtime(curpath))
          if datetime.datetime.now() - file_modified > datetime.timedelta(minutes=minutes):
              os.remove(curpath)