mediater
========


Media center to run on your nas / homeserver that uses html5 + AngularJS to display a catalog of movies & stuffs with backend to keep track of movies.
This repo contains the backend.

**Backend**
* Uses silex, composer file included
 * FYI i don't know a lot about silex so things might get pretty dirty
* uses mysql or equivalent, sql definiton of database included.
* Login data is needed via config.php, a template for you to fill in is included in configTemplate.php


**installation**
* install lamp
* mysql -u "user" -p < database.sql (create database)
* Run php composer.phar install (install silex)
* open configTemplate.php
 * fill in user & password
 * save as config.php