mediater
========


Media center to run on your nas / homeserver that uses html5 + AngularJS to display a catalog of movies & stuffs with backend to keep track of movies.

# Backend
Silex - PHP backend api

## installation
* install lamp
* create database
```bash
mysql -u "user" -p < backend/database/database.sql
```
* Install silex
```bash
php composer.phar install
```
* open configTemplate.php
 * fill in user & password
 * save as config.php

## notes
* Uses silex, composer file included
 * FYI i don't know a lot about silex so things might get pretty dirty
* uses mysql or equivalent, sql definiton of database included.
* Login data is needed via config.php, a template for you to fill in is included in configTemplate.php
* dummy data = top 250 movies from imdb + top 100 series


# frontend
html5 js css - AngularJS jQuery

* If you only want dummy data you could run 
```bash
#generate dummydata
python /backend/database/genDummyData.py 
#dummydata => database
mysql -u "user" -p < /backend/database/data.sql
```


## Thanks
* template [miniport](http://html5up.net/uploads/demos/miniport/) from [html5up](http://html5up.net/)
 * [miniport_license](/frontend/LICENSE_miniport.txt)
 * [miniport_README](/frontend/README_miniport.txt)
* [blog post about http request in angular](http://www.bennadel.com/blog/2612-using-the-http-service-in-angularjs-to-make-ajax-requests.htm)
* [routing in angular](http://scotch.io/tutorials/javascript/single-page-apps-with-angularjs-routing-and-templating)
* [routing in angular - outdated](http://viralpatel.net/blogs/angularjs-routing-and-views-tutorial-with-example/)