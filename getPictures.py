import pymysql
import httplib2
import urllib.parse
import json

con = pymysql.connect(host="127.0.0.1", user="",passwd="", db="mediaCenter")

with con:
	cur = con.cursor()
	cur.execute("SELECT * FROM movies order by name")
	rows = cur.fetchall()
	for row in rows:
		print(row)
		params = urllib.parse.urlencode({'t' : row[1]})
		url = "http://www.omdbapi.Com/?" + params

		resp,content = httplib2.Http().request( url )

		obj = json.loads(content.decode("utf-8"));
		if( "Poster" in obj and len(obj["Poster"]) > 0 and obj["Poster"] != "N/A"):
			print(obj["Poster"])

			resp, content = httplib2.Http().request(obj["Poster"])
			path = "/".join([str(x) for x in row[2].split("/")[0:-1]])
			path = path + "/pic.jpg"
			print(path)
			f = open( "../../" + path, 'wb')
			f.write(content)

			cur.execute ("""
			   UPDATE movies
			   SET thumbPath=%s
			   WHERE id=%s
			""", (path, row[0]))

			con.commit()

