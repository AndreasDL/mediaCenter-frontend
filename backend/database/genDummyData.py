#/usr/bin/python
import re
import httplib2
import html
import sys

output = open("data.sql",'w')

#movies
imgreg = re.compile('img src="([^"]+)"');
titlereg = re.compile('<a href="[^>]+">([^<]+)</a>')
output.write("USE mediaCenter;\ninsert into movies (name,moviePath,thumbPath) VALUES")
file = open('dummyData/movies.html','r')
url_img = ""
txt_title = ""
count = 0
for line in file:
	#get url from the line
	line = line.strip()

	img = imgreg.findall(line)
	if (len(img) > 0) :
		url_img = "http://ia.media-imdb.com/images/M/" + img[0][13:-22] + "214_AL_.jpg"

	title = titlereg.findall(line)
	if (len(title) > 0):
		txt_title = title[0]
		if (count > 0):
			output.write( ",\\\n\t(\"" + txt_title + "\",\"movie.mkv\",\"" + url_img + "\")")
		else:
			output.write( "\\\n\t(\"" + txt_title + "\",\"movie.mkv\",\"" + url_img + "\")")
		url_img=""
		txt_title=""
		count += 1
output.write(";\n\n")

#series
series = []
imgreg = re.compile('img.+src="([^"]+)"')
img2reg = re.compile('img.+loadlate="([^"]+)"')
titlereg = re.compile('<a onclick.+href="[^>]+">([^<]+)</a>')
output.write("USE mediaCenter;\ninsert into series (name,thumbPath) VALUES")
file = open('dummyData/series.html','r')
url_img = ""
txt_title = ""
count = 0
for line in file:
	#get url from the line
	line = line.strip()

	img = imgreg.findall(line)
	if (len(img) > 0) :
		url_img = "http://ia.media-imdb.com/images/M/" + img[0][15:-22] + "214_AL_.jpg"

	if (url_img == "http://ia.media-imdb.com/images/M/214_AL_.jpg"):
		if (len(img) > 0):
			img = img2reg.findall(line)[0]
			url_img = img


	title = titlereg.findall(line)
	if (len(title) > 0):
		txt_title = title[0]
		if (count > 0):
			output.write( ",\\\n\t(\"" + txt_title + "\",\"" + url_img + "\")")
		else:
			output.write( "\\\n\t(\"" + txt_title + "\",\"" + url_img + "\")")
		url_img=""
		txt_title=""
		count += 1
output.write(";\n\n")

counter = 0
output.write("INSERT INTO `episodes`(`serieId`, `season`, `episode`, `moviePath`) VALUES\\\n")
for i in range(0,count):
	for season in range(0,5):
		for episode in range(0,24):
			if counter > 0 :
				output.write(",\\\n\t(" + str(i) + "," + str(season) + ","+ str(episode) + ",\"movie.mkv\")")
			else :
				output.write("\\\n\t(" + str(i) + "," + str(season) + ","+ str(episode) + ",\"movie.mkv\")")
			counter += 1


output.close();