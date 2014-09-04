(function(){
	var app = angular.module('mediaCenter', ['ngRoute']);

	app.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/movie/all', {
				templateUrl: "templates/show-movies.html",
				controller: 'MovieController'
			}).when('/serie/all', {
				templateUrl: "templates/show-series.html",
				controller: 'SerieController'
			}).otherwise({
				redirectTo: '/movie/all' //default
			});
	}]);

//movies
	app.controller("MovieController", function( $scope, dataService){
		$scope.movies = [];
		dataService.getMovies().then(function(movies){
			$scope.movies = movies
		});

		console.log($scope.movies);
	});


//series
	app.controller("SerieController", function( $scope, dataService){
		$scope.series = [];
		dataService.getSeries().then(function(series){
			$scope.series = series
		});

		console.log($scope.series);
	});


	app.service("dataService", function( $http, $q ){
		return({
			getMovies: getMovies,
			getSeries: getSeries
		});

		//get all movies (<api>/movie/all)
		function getMovies(){
			var request = $http({
				method: "get",
				url: "http://localhost/mediaCenter/backend/movie/all"
			});
			return ( request.then(handleSucces, handleError) );
		}

		//get all series (<api>/serie/all)
		function getSeries(){
			var request = $http({
				method: "get",
				url: "http://localhost/mediaCenter/backend/serie/all"
			});
			return( request.then(handleSucces, handleError) );
		}

		function handleSucces(response){
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

			//console.log("Got: ");
			//console.log(groupedData);
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