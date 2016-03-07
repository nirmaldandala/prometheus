prometheus.controller('listController', function($scope, StorageService) {
	$scope.favoriteList = [];
	$scope.pageTitle = "Favorites";
	$scope.favoriteList = StorageService.getAll();

	$scope.deleteMovie = function(movieid) {
	    angular.forEach($scope.favoriteList, function(value, key){
	      if(value.imdbID === movieid) {
	        $scope.favoriteList.splice(key, 1);
	      }
	    });
	};
});