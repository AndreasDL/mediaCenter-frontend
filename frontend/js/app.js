(function(){
	console.log("nothing");
	var app = angular.module('mediater', []);

	app.controller("MovieController", function( $scope, movieService){
		console.log("movieController");
		$scope.movies = [];
		loadRemoteData();



		function loadRemoteData(){
			console.log("loadRemoteData");
			movieService.getMovies().then(function(movies){
				$scope.movies = movies
			});
		}
		console.log($scope.movies);
	});

	app.service("movieService", function( $http, $q ){
		console.log("movieService");
		return({
			getMovies: getMovies
		});

		//get all movies (<api>/movies/all)
		function getMovies(){
			console.log("getMovies");
			var request = $http({
				method: "get",
				url: "http://localhost/mediater-backend/movie/all"
			});
			console.log( request );
			return ( request.then(handleSucces, handleError) );
		}

		function handleSucces(response){
			console.log("success!");
			return( response.data );
		}
		function handleError(response){
			console.log("error!");
			if( !angular.isObject( response.data ) || !response.data.message) {
            	return( $q.reject( "An unknown error occurred." ) );
        	}
	        // Otherwise, use expected error message.
	        return( $q.reject( response.data.message ) );
		}

	});

})();