SAVEPATH="/mnt/films/";

if [ $# -ne 3 ]; then
	echo "Needed <directory> <name> <coverUrl>";
	exit;
else
	if [ ! -d "$1" ]; then
		echo "$1 is not a valid directory";
		exit;
	fi

#####chmod
	echo "chmod!";
	sudo chown -R user:user "$1";

#####cleanup
	echo "Cleaning files";
	find "$1" -type f -iname "*.txt" -delete;
	find "$1" -type f -iname "*.jpg" -delete;
	find "$1" -type f -iname "*.nfo" -delete;
	find "$1" -type f -iname "*.png" -delete;
	find "$1" -type f -iname "*.url" -delete;
	find "$1" -type f -iname "*.exe" -delete;
	find "$1" -type f -iname "*sample*" -delete;

#####get picture
	echo "getting picture";
	wget -O "$1pic.jpg" "$3";
	
####moviepath
	echo "getting movie & converting if needed";
	
	MOVIEPATH=$(find "$1" -type f -iname "*.mp4");
	EXT="mp4";
	if [ "$MOVIEPATH" == "" ]; then
		MOVIEPATH=$(find "$1" -type f -iname "*.mkv" | head -n 1);
		EXT="mkv";
	fi
	if [ "$MOVIEPATH" == "" ]; then
		MOVIEPATH=$(find "$1" -type f -iname "*.avi" | head -n 1);
	
		if [ "$MOVIEPATH" != "" ]; then
			while true; do
				read -p "\tavi found, we don't like avi! Do you like to convert this file?" yn;
			    case $yn in
			        [Yy]* ) 
						OLDPATH=$MOVIEPATH;
						MOVIEPATH="${OLDPATH/.avi/.mkv}";
						ffmpeg -i "$OLDPATH" "$MOVIEPATH";
						EXT="mkv"
						;;
			        [Nn]* ) exit;;
			        * ) echo "Please answer yes(y) or no(n).";;
			    esac
			done
		else
			echo "?! no movie found in path: $1";
			echo "supported extensions are .mp4, .mkv & .avi (with conversion)";
			exit;
		fi
	fi

	#move
	echo "moving";
	mv -v "$1" "$SAVEPATH$2/";

	#add to mysql
	echo "add to mysql";
	
	name=$2
	MOVIEPATH=$(find "$SAVEPATH$2/" -type f -iname "*$EXT");
	THUMBPATH="$SAVEPATH$2/pic.jpg";
	#remove first /
	MOVIEPATH=${MOVIEPATH:1:${#MOVIEPATH}-1};	
	THUMBPATH=${THUMBPATH:1:${#THUMBPATH}-1};

#	echo "$SAVEPATH$2/";
#	echo $EXT;
#	echo $MOVIEPATH;
	
	mysql -u "root" -p -D mediaCenter -e "insert into movies (name,moviePath,thumbPath) VALUES (\"$name\",\"$MOVIEPATH\",\"$THUMBPATH\");"
fi
