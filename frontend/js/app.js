(function(){
	var app = angular.module('mediaCenter', []);

	app.controller("MovieController", function( $scope, movieService){
		$scope.movies = [];
		loadRemoteData();



		function loadRemoteData(){
			movieService.getMovies().then(function(movies){
				$scope.movies = movies
			});
		}
		console.log($scope.movies);
	});

	app.service("movieService", function( $http, $q ){
		return({
			getMovies: getMovies
		});

		//get all movies (<api>/movies/all)
		function getMovies(){
			var request = $http({
				method: "get",
				url: "http://localhost/mediaCenter/backend/movie/all"
			});
			return ( request.then(handleSucces, handleError) );
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

			console.log("Got: ");
			console.log(groupedData);
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