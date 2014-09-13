SAVEPATH="/mnt/series/";

if [ $# -lt 5 ]; then
	echo "Needed <password> <directory> <name> <Pic url> <season1 episode Count> [season2 episode Count] ...";
	exit;
else
	PASS=$1;
	shift;
	
	if [ ! -d "$1" ]; then
		echo "$1 is not a valid directory";
		exit;
	fi
	DIR=$1;
	shift;
	NAME=$1;
	shift;
	PIC=$1;
	shift;

#####chmod
	echo "chmod!";
	sudo chown -R user:user "$DIR";

#####cleanup
	echo "Cleaning files";
	find "$DIR" -type f -iname "*.txt" -delete;
	find "$DIR" -type f -iname "*.jpg" -delete;
	find "$DIR" -type f -iname "*.nfo" -delete;
	find "$DIR" -type f -iname "*.png" -delete;
	find "$DIR" -type f -iname "*.url" -delete;
	find "$DIR" -type f -iname "*.exe" -delete;
	find "$DIR" -type f -iname "*sample*" -delete;

####moviepath
	echo "getting series";
	SEASON=1;
	for var in "$@"
	do
		echo "Season $SEASON"
		for i in `seq 1 $var`;
		do
			TEMPI="0$i";
			TEMP="O$SEASON";
	
			MOVIEPATH=$(find "$DIR" -type f -iregex ".*s\($TEMP\|$SEASON\)\(E\|X\)\($i\|$TEMPI\).*\(avi\|mkv\|mp4\)" );
#			
			if [ "$MOVIEPATH" == "" ]; then
				echo "Path not found";
				continue;
			fi

			echo "Found S${SEASON}E${TEMP} at $MOVIEPATH";
			#add to mysqls
			#echo "add to mysql";
			
			#THUMBPATH="$SAVEPATH$NAME/pic.jpg";
			#remove first /
			#MOVIEPATH=${MOVIEPATH:1:${#MOVIEPATH}-1};	
			#THUMBPATH=${THUMBPATH:1:${#THUMBPATH}-1};

			#mysql -u "root" -p $PASS -D mediaCenter -e "insert into movies (name,moviePath,thumbPath) VALUES (\"$NAME\",\"$MOVIEPATH\",\"$THUMBPATH\");"

		done
		let SEASON=SEASON+1;
	done;
fi