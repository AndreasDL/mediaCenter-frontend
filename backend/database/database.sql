drop database if exists mediator;

create database mediator;
USE mediator;
create table movies (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) not null,
	moviePath varchar(255) not null,
	thumbPath varchar(255) not null
);

insert into movies (name,moviePath,thumbPath) VALUES \
	("die hard 1", "movies/diehard1/movie.mkv", "http://www.chud.com/wp-content/uploads/2013/01/220px-Die_hard.jpg"),\
	("the matrix", "movies/matrix/matrix.mkv", "http://images1.fanpop.com/images/photos/1900000/Matrix-the-matrix-1949932-1024-768.jpg"),\
	("the bucket list", "movies/the bucket list/buckli.mkv", "http://upload.wikimedia.org/wikipedia/en/2/20/Bucket_list_poster.jpg")\
	;