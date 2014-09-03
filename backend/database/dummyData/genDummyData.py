#/usr/bin/python
import re
import httplib2
import html
import sys

imgreg = re.compile('img src="([^"]+)"');
titlereg = re.compile('<a href="[^>]+">([^<]+)</a>')

file = open('test.html','r')
url_img = "";
txt_title = "";
for line in file:
	#get url from the line
	line = line.strip()

	img = imgreg.findall(line)
	if (len(img) > 0) :
		url_img = "http://ia.media-imdb.com/images/M/" + img[0][13:-22] + "214_AL_.jpg"

	title = titlereg.findall(line)
	if (len(title) > 0):
		txt_title = title[0]
		print( "\t(\"", txt_title, "\",\"movie.mkv\",\"", url_img, "\"),\\")
		url_img=""
		txt_title=""