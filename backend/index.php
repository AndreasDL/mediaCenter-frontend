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

	$stmt = $db->prepare("select * from movies order by name");
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

//movies
$app->get('/serie/all', function() use($locd,$user,$pass,$dbna){
	$db = new mysqli($locd,$user,$pass,$dbna);

	$stmt = $db->prepare("select * from series order by name");
	$stmt->execute();
	$stmt->bind_result($_id,$_name,$_thumbPath);

	$return = array();
	while ($stmt->fetch()){
		array_push($return, 
			array( "id" => $_id,
				"name" => $_name,
				"thumbPath" => $_thumbPath
			)
		);
	}
	$stmt->close();
	$db->close();
	return json_encode($return);
});
$app->get('/serie/id/{id}', function($id) use($locd,$user,$pass,$dbna){
	$db = new mysqli($locd,$user,$pass,$dbna);

	$stmt = $db->prepare("select * from episodes e 
		join series s on s.id = e.serieId
			where e.serieId = ?
		order by season,episode");
	$stmt->bind_param("i",$id);
	$stmt->execute();
	$stmt->bind_result($_episodeId,$_serieId,$_season,$_episode,$_moviePath,$_id,$_name,$_thumbPath);

	$return = array();
	while ($stmt->fetch()){
		array_push($return, 
			array( "id" => $_id,
				"episodeId" => $_episodeId,
				"season" => $_season,
				"episode" => $_episode,
				"moviePath" => $_moviePath,
				"name" => $_name,
				"thumbPath" => $_thumbPath
			)
		);
	}
	$stmt->close();
	$db->close();
	return json_encode($return);
});
$app->get('/serie/name/{name}', function($name) use($locd,$user,$pass,$dbna){
	$db = new mysqli($locd,$user,$pass,$dbna);

	$stmt = $db->prepare("select * from episodes e 
		join series s on s.id = e.serieId
			where s.name = ?
		order by season,episode");
	$stmt->bind_param("s",$name);
	$stmt->execute();
	$stmt->bind_result($_episodeId,$_serieId,$_season,$_episode,$_moviePath,$_id,$_name,$_thumbPath);

	$return = array();
	while ($stmt->fetch()){
		array_push($return, 
			array( "id" => $_id,
				"episodeId" => $_episodeId,
				"season" => $_season,
				"episode" => $_episode,
				"moviePath" => $_moviePath,
				"name" => $_name,
				"thumbPath" => $_thumbPath
			)
		);
	}
	$stmt->close();
	$db->close();
	return json_encode($return);
});


$app->get('/', function(){
	return '<table>
		<tr>
			<td><b>What</b></td>
			<td><b>Url</b></td>
		</tr><tr>
			<td>Get all movies</td>
			<td><a href="./movie/all">/movie/all</a></td>
		</tr><tr>
			<td>Get movie by id</td>	
			<td><a href="./movie/id/1">/movie/id/1</a></td>
		</tr><tr>
			<td>Get movie by name</td>
			<td><a href="./movie/name/the%20matrix">/movie/name/the matrix</a></td>
		</tr><tr>
			<td>Get all series</td>
			<td><a href="./serie/all">/serie/all</a></td>
		</tr><tr>
			<td>Get serie by id</td>	
			<td><a href="./serie/id/1">/serie/id/1</a></td>
		</tr><tr>
			<td>Get serie by name</td>
			<td><a href="./serie/name/suits">/serie/name/suits</a></td>
		</tr>
	</table>';
	;
});

$app->run();