<?php
 //debug output
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);
require_once __DIR__.'/vendor/autoload.php';

$app = new Silex\Application();
$app['debug'] = true; //debug output

//load loging data from config.php, you can create one by cloning the configTemplate.php
require_once __DIR__.'/config.php';
$locd = $GLOBALS["locd"];
$user = $GLOBALS["user"];
$pass = $GLOBALS["pass"];
$dbna = $GLOBALS["dbna"];

//movies
$app->get('movie/all', function() use($locd,$user,$pass,$dbna){
	$db = new mysqli($locd,$user,$pass,$dbna);

	$stmt = $db->prepare("select * from movies");
	$stmt->execute();
	$stmt->bind_result($_id,$_name,$_moviePath,$_thumbPath);

	$return = array();
	while ($stmt->fetch()){
		array_push($return, 
			array( "id" => $_id,
				"name" => $_name,
				"moviePath" => $_moviePath,
				"thumbPath" => $_thumbPath
			)
		);
	}
	$stmt->close();
	$db->close();
	return json_encode($return);
});
$app->get('/movie/id/{id}', function($id) use($locd,$user,$pass,$dbna){
	$db = new mysqli($locd,$user,$pass,$dbna);

	$stmt = $db->prepare("select * from movies where id = ?");
	$stmt->bind_param("i",$id);
	$stmt->execute();
	$stmt->bind_result($_id,$_name,$_moviePath,$_thumbPath);

	$return = array();
	while ($stmt->fetch()){
		array_push($return, 
			array( "id" => $_id,
				"name" => $_name,
				"moviePath" => $_moviePath,
				"thumbPath" => $_thumbPath
			)
		);
	}
	$stmt->close();
	$db->close();
	return json_encode($return);
});

$app->get('/movie/name/{name}', function($name) use($locd,$user,$pass,$dbna){
	$db = new mysqli($locd,$user,$pass,$dbna);

	$stmt = $db->prepare("select * from movies where name = ?");
	$stmt->bind_param("s",$name);
	$stmt->execute();
	$stmt->bind_result($_id,$_name,$_moviePath,$_thumbPath);

	$return = array();
	while ($stmt->fetch()){
		array_push($return, 
			array( "id" => $_id,
				"name" => $_name,
				"moviePath" => $_moviePath,
				"thumbPath" => $_thumbPath
			)
		);
	}
	$stmt->close();
	$db->close();
	return json_encode($return);
});

$app->run();