drop database if exists mediator;

create database mediator;
USE mediator;
create table movies (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) not null,
	moviePath varchar(255) not null,
	thumbPath varchar(255) not null
);
