(function(){
	var app = angular.module('mediaCenter', ['ngRoute']);

	app.config(['$routeProvider',function($routeProvider){
		$routeProvider
			//movies
			.when('/movie/all', {
				templateUrl: "templates/show-movies.html",
				controller: 'MoviesController',
			}).when('/movieById/:id', {
				templateUrl: "templates/show-movie.html",
				controller: 'MovieIdController'
			}).when('/movieByName/:name', {
				templateUrl: "templates/show-movie.html",
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

			//episodes
			.when('/episodeById/:id', {
				templateUrl: "templates/show-episode.html",
				controller: "EpisodeByIdController"
			})

			//torrents
			.when('/torrents', {
				templateUrl: "templates/show-torrents.html"
			})

			//default
			.otherwise({
				redirectTo: '/movie/all'
			});
	}]);

	app.filter("reverse", function(){
		return function(items){
			return items.slice().reverse();
		}
	});

	app.filter("makerows", function(){
		return function(data){
			var groupedData = [];

			//group per row
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

			return groupedData;
		}
	});

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
		$scope.episodes = [];
		dataService.getSerieId($routeParams.id).then(function(series){
			$scope.selection = series
		});
	});
	app.controller("SerieByNameController", function($scope,dataService,$routeParams){
		$scope.episodes = [];
		dataService.getSerieName($routeParams.name).then(function(series){
			$scope.selection = series
		});
	});

//episodes
	app.controller("EpisodeByIdController", function($scope,dataService,$routeParams){
		$scope.episode = "";
		dataService.getEpisodeId($routeParams.id).then(function(episode){
			$scope.episode = episode;
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
			getSerieName: getSerieName,

			getEpisodeId: getEpisodeId
		});

		//get all movies (<api>/movie/all)
		function getMovies(){
			var request = $http({
				method: "get",
				url: "backend/movie/all"
			});
			return ( request.then(handleSelectionSucces, handleError) );
		}
		function getMovieId(id){
			var request = $http({
				method: "get", 
				url: "backend/movie/id/" + encodeURIComponent(id)
			});
			return( request.then(handleSucces,handleError) );
		}
		function getMovieName(name){
			var request = $http({
				method: "get", 
				url: "backend/movie/name/" + encodeURIComponent(name)
			});
			return( request.then(handleSucces,handleError) );
		}


		//get all series (<api>/serie/all)
		function getSeries(){
			var request = $http({
				method: "get",
				url: "backend/serie/all"
			});
			return( request.then(handleSelectionSucces, handleError) );
		}
		function getSerieId(id){
			var request = $http({
				method: "get", 
				url: "backend/serie/id/" + encodeURIComponent(id)
			});
			return( request.then(handleSerieSucces,handleError) );
		}
		function getSerieName(name){
			var request = $http({
				method: "get", 
				url: "backend/serie/name/" + encodeURIComponent(name)
			});
			return( request.then(handleSerieSucces,handleError) );
		}

		//episodes
		function getEpisodeId(id){
			var request = $http({
				method: "get",
				url: "backend/episode/id/" + encodeURIComponent(id)
			});
			return( request.then(handleSucces, handleError) );

		}

		//handle success
		function handleSucces(response){ //get first element of the returned list (everything is returned as a list)
			return response.data[0];
		}
		function handleSelectionSucces(response){ //Expect list (everything is returned as a list)
			var data = response.data;
			var groupedData = [];

			//group per row
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
				groupedData[ data[i]["season"] ][ data[i]["episode"] ] = data[i];
			}
			console.log(groupedData);

			//reverse
			groupedData = groupedData.slice().reverse();
	
			console.log(groupedData);

			//group per 6 seasons
			var result= [];
			var group = [];
			var i = 0;
			for (s in groupedData){
				group.push(groupedData[s]);
				i++;

				if ( i % 6 == 0){
					console.log(group);
					result.push(group);
					group = [];
					i = 0;
				}
			}
			result.push(group);

			console.log(result);

			return( result );
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
