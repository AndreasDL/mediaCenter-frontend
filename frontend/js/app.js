(function(){
	var app = angular.module('mediaCenter', ['ngRoute']);

	app.config(['$routeProvider',function($routeProvider){
		$routeProvider
			//movies
			.when('/movie/all', {
				templateUrl: "templates/show-movies.html",
				controller: 'MoviesController',
			}).when('/movieById/:id', {
				templateUrl: "templates/show-video.html",
				controller: 'MovieIdController'
			}).when('/movieByName/:name', {
				templateUrl: "templates/show-video.html",
				controller: 'MovieNameController'
			})

			//Series
			.when('/serie/all', {
				templateUrl: "templates/show-series.html",
				controller: 'SeriesController'
			}).when('/serieById/:id', {
				templateUrl: "templates/show-episodes.html",
				controller: 'SerieByIdController'
			}).when('/serieByName/:name', {
				templateUrl: "templates/show-episodes.html",
				controller: 'SerieByNameController'
			})

			//default
			.otherwise({
				redirectTo: '/movie/all'
			});
	}]);


//movies
	app.controller("MoviesController", function( $scope, dataService){
		$scope.movies = [];
		dataService.getMovies().then(function(movies){
			$scope.selection = movies
		});
	});
	app.controller("MovieIdController", function($scope, dataService, $routeParams){
		$scope.movie = "";
		dataService.getMovieId($routeParams.id).then(function(movie){
			$scope.video = movie;
		});
	});
	app.controller("MovieNameController", function($scope, dataService, $routeParams){
		$scope.movie = "";
		dataService.getMovieName($routeParams.name).then(function(movie){
			$scope.video = movie;
		});
	});

//series
	app.controller("SeriesController", function( $scope, dataService){
		$scope.series = [];
		dataService.getSeries().then(function(series){
			$scope.selection = series
		});
	});
	app.controller("SerieByIdController", function($scope,dataService,$routeParams){
		console.log("hoi" + $routeParams.id);
		$scope.episodes = [];
		dataService.getSerieId($routeParams.id).then(function(series){
			$scope.selection = series
			console.log(series)
		});
	});
	app.controller("SerieByNameController", function($scope,dataService,$routeParams){
		$scope.episodes = [];
		dataService.getSerieName($routeParams.name).then(function(series){
			$scope.selection = series
		});
	});


//Service
	app.service("dataService", function( $http, $q ){
		return({
			getMovies: getMovies,
			getMovieId: getMovieId,
			getMovieName: getMovieName,
			
			getSeries: getSeries,
			getSerieId: getSerieId,
			getSerieName: getSerieName
		});

		//get all movies (<api>/movie/all)
		function getMovies(){
			var request = $http({
				method: "get",
				url: "../backend/movie/all"
			});
			return ( request.then(handleSelectionSucces, handleError) );
		}
		function getMovieId(id){
			var request = $http({
				method: "get", 
				url: "../backend/movie/id/" + encodeURIComponent(id)
			});
			return( request.then(handleSucces,handleError) );
		}
		function getMovieName(name){
			var request = $http({
				method: "get", 
				url: "../backend/movie/name/" + encodeURIComponent(name)
			});
			return( request.then(handleSucces,handleError) );
		}


		//get all series (<api>/serie/all)
		function getSeries(){
			var request = $http({
				method: "get",
				url: "../backend/serie/all"
			});
			return( request.then(handleSelectionSucces, handleError) );
		}
		function getSerieId(id){
			var request = $http({
				method: "get", 
				url: "../backend/serie/id/" + encodeURIComponent(id)
			});
			return( request.then(handleSerieSucces,handleError) );
		}
		function getSerieName(name){
			var request = $http({
				method: "get", 
				url: "../backend/serie/name/" + encodeURIComponent(name)
			});
			return( request.then(handleSerieSucces,handleError) );
		}

		function handleSucces(response){ //get first element of the returned list (everything is returned as a list)
			return response.data[0];
		}
		function handleSelectionSucces(response){ //Expect list (everything is returned as a list)
			var data = response.data;
			var groupedData = [];

			//group per 4
			var i = 0;
			var group = [];
			for (movie in data){
				group.push(data[movie]);
				i++;
				
				if (i % 6 == 0){
					groupedData.push(group);
					group = [];
					i = 0;
				}
			}
			groupedData.push(group);

			return( groupedData );
		}
		function handleSerieSucces(response){
			var data = response.data;
			var groupedData = [];
			groupedData[0]  = [];

			//group per season
			for (i in data){
				if (!groupedData[data[i]["season"]]){
					groupedData[data[i]["season"]] = [];
				}
				console.log(data[i]["season"] + "\t" + data[i]["episode"]);
				groupedData[ data[i]["season"] ][ data[i]["episode"] ] = data[i];
			}

			return( groupedData );
		}
		function handleError(response){
			if( !angular.isObject( response.data ) || !response.data.message) {
            	return( $q.reject( "An unknown error occurred." ) );
        	}
	        // Otherwise, use expected error message.
	        return( $q.reject( response.data.message ) );
		}
	});	

})();
