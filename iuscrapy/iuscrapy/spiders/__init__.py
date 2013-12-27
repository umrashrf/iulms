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