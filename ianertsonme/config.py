import json
import codecs

config = {}

with codecs.open('config.json', 'r+') as conffile:
    confstr = conffile.read()
    config = json.loads(confstr)
conffile.close()
