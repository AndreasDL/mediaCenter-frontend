drop database if exists mediaCenter;

create database mediaCenter;
USE mediaCenter;

create table movies (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) not null,
	moviePath varchar(255) not null,
	thumbPath varchar(255) not null
);

create table series (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) not null,
	thumbPath varchar(255) not null
);
create table episodes (
	serieId INT NOT NULL, #--References series.id
	season INT NOT NULL,
	episode INT NOT NULL
);