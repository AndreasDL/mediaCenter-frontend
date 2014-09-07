import sys
import os

dir  = ""
type = ""
if len(sys.argv) != 3:
	print("Usage: python scanDir <directory> <type>")
	print('using defaults: /mnt/data/done and movie')
	dir = "/mnt/data/done"
	type = "movie"
else:	
	dir = sys.argv[1]
	type = sys.argv[2]

print("scanning",dir,"for",type)

output = open("output.sql", "w")
output.write("USE mediaCenter;\ninsert into movies (name,moviePath,thumbPath) VALUES")

count = 0
for f in os.listdir(dir):
	name = f
	path = dir + "/" + f
	if not os.path.isdir(path):
		print("Skipping" + path)
		continue;

	for i in os.listdir(path):
		if i.endswith(".mkv") or i.endswith(".avi") or i.endswith(".wmi") or i.endswith("mp4"):
			path = i
			break;

	if (count > 0):
		output.write( ",\\\n\t(\"" + name + "\",\"" + path + "\",\"" + "" + "\")")
	else:
		output.write(  "\\\n\t(\"" + name + "\",\"" + path + "\",\"" + "" + "\")")
	count += 1

output.write(";\n\n")