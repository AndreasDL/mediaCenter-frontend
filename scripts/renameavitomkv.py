import pymysql
import sys
import re


if len(sys.argv) != 3:
	print("Usage: python renameavitomkv.py <user> <pass>")
	sys.exit(-1)


con = pymysql.connect("localhost", sys.argv[1],sys.argv[2], "mediaCenter")
p = re.compile("\.avi")
with con:
	cur = con.cursor()
	cur.execute("SELECT * FROM movies order by name")
	rows = cur.fetchall()
	for row in rows:
		print(row[2])
		test = p.sub('.mkv',row[2])

		cur.execute ("""
		   UPDATE movies
		   SET moviePath=%s
		   WHERE id=%s
		""", (test, row[0]))
		print (test)

con.commit()