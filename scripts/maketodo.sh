MAX=$(find /mnt/films -type f -iname "*avi" | wc -l);
echo "Found $MAX files!\n";

find /mnt/series -type f -iname "*.avi" -print0 | while IFS= read -r -d $'\0' line; do
	new="${line/avi/mkv}";
	echo "ffmpeg -i \"$line\" \"$new\";";
done
