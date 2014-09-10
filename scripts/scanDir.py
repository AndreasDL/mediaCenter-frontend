import sys
import os

dir  = ""
if len(sys.argv) != 2:
	print("Usage: python scanDir <directory>")
	print('using default: /mnt/data/done')
	dir = "/mnt/data/done"
else:	
	dir = sys.argv[1]

print("scanning",dir)

output = open("output.sql", "w")
output.write("USE mediaCenter;\ninsert into movies (name,moviePath,thumbPath) VALUES")

count = 0
for f in os.listdir(dir):
	name = f
	path = dir + "/" + f

	if os.path.isdir(path):
		for i in os.listdir(path):
			if i.endswith(".mkv") or i.endswith(".avi") or i.endswith(".wmi") or i.endswith("mp4"):
				path = path + "/" + i
				break;

		if (count > 0):
			output.write( ",\\\n\t(\"" + name + "\",\"" + path + "\",\"" + "" + "\")")
		else:
			output.write(  "\\\n\t(\"" + name + "\",\"" + path + "\",\"" + "" + "\")")
		count += 1

output.write(";\n\n")