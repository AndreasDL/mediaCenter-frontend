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
	("die hard 1", "movies/diehard1/movie.mkv", "movies.diehard1/thumb.png"),\
	("the matrix", "movies/matrix/matrix.mkv", "movies/matrix/thumb.png"),\
	("the bucket list", "movies/the bucket list/buckli.mkv", "moves/the bucket list/buckli.png")\
	;