SAVEPATH="/mnt/series/";

if [ $# -lt 4 ]; then
	echo "Needed <directory> <name> <Pic url> <season1 episode Count> [season2 episode Count] ...";
	exit;
else
	if [ ! -d $1 ]; then
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
			ATTDRIE="S${SEASON}E$i";
			ATTVIER="S${SEASON}E$i";

			if [ ${#i} -eq 1 ]; then
				i="0$i";
			fi
			ATTEEN="S${SEASON}E$i";
			ATTWEE="S${SEASON}x$i";

			TEMP="$SEASON";
			if [ ${#SEASON} -eq 1 ]; then
				TEMP="O$TEMP";
			fi
			ATTVIJF="S${TEMP}E$i";
			ATTZES="S${TEMP}x$i";

			echo "$ATTEEN $ATTWEE $ATTDRIE $ATTVIER $ATTVIJF $ATTZES";

			MOVIEPATH=$(find "$DIR" -type f -iname "*${ATTEEN}*");
			if [ "$MOVIEPATH" == "" ]; then
				echo "  ${ATTEEN} Not found!";
				MOVIEPATH=$(find "$DIR" -type f -iname "*${ATTWEE}*");
			fi
			if [ "$MOVIEPATH" == "" ]; then
				echo "  ${ATTWEE} Not found!";
				MOVIEPATH=$(find "$DIR" -type f -iname "*${ATTDRIE}*");
			fi
			if [ "$MOVIEPATH" == "" ]; then
				echo "  ${ATTDRIE} Not found!";
				MOVIEPATH=$(find "$DIR" -type f -iname "*${ATTVIER}*");
			fi
			if [ "$MOVIEPATH" == "" ]; then
				echo "  ${ATTVIER} Not found!";
				echo "find \"$DIR\" -type f -iname \"*${ATTVIJF}*\"";
				MOVIEPATH=$(find "$DIR" -type f -iname "*${ATTVIJF}*");
			fi
			if [ "$MOVIEPATH" == "" ]; then
				echo "  ${ATTVIJF} Not found!";
				MOVIEPATH=$(find "$DIR" -type f -iname "*${ATTZES}*");
			fi

			if [ "$MOVIEPATH" == "" ]; then
				echo "  $ATTZES  not found"
				continue;
			fi

			echo "Found $ATTEEN at $MOVIEPATH";
			#add to mysql
			#echo "add to mysql";
			
			#THUMBPATH="$SAVEPATH$NAME/pic.jpg";
			#remove first /
			#MOVIEPATH=${MOVIEPATH:1:${#MOVIEPATH}-1};	
			#THUMBPATH=${THUMBPATH:1:${#THUMBPATH}-1};

			#mysql -u "root" -p -D mediaCenter -e "insert into movies (name,moviePath,thumbPath) VALUES (\"$NAME\",\"$MOVIEPATH\",\"$THUMBPATH\");"

		done
		let SEASON=SEASON+1;
	done;
fi