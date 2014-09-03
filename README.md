mediater
========


Media center to run on your nas / homeserver that uses html5 + AngularJS to display a catalog of movies & stuffs with backend to keep track of movies.

# Backend
## notes
* Uses silex, composer file included
 * FYI i don't know a lot about silex so things might get pretty dirty
* uses mysql or equivalent, sql definiton of database included.
* Login data is needed via config.php, a template for you to fill in is included in configTemplate.php
* dummy data = top 250 from imdb, the script creates a part of the list, if you just want to load the data then just load data.sql

## installation
* install lamp
* ```bash
mysql -u "user" -p < backend/database/database.sql #create database
```
* Run php composer.phar install (install silex)
* open configTemplate.php
 * fill in user & password
 * save as config.php


# frontend
* If you only want dummy data you could run 
```bash
#generate dummydata
python /backend/database/genDummyData.py 
#dummydata => database
mysql -u "user" -p < /backend/database/data.sql
```


## Thanks
* [blog post about http request in angular](http://www.bennadel.com/blog/2612-using-the-http-service-in-angularjs-to-make-ajax-requests.htm)
* template [miniport](http://html5up.net/uploads/demos/miniport/) from [html5up](http://html5up.net/)
 * [miniport_license](/frontend/LICENSE_miniport.txt)
 * [miniport_README](/frontend/README_miniport.txt)