prometheus.controller('searchController', function($scope, $rootScope, $ionicHistory, omdbget, $http, StorageService) {
  var curPage = 0;
  $scope.canShowMore = false;
  $scope.noResults = false;
  $scope.certified = false;
  $scope.rotten = false;

  $scope.search = function() {
    var searchKey = $scope.searchKey;
    omdbget.getMovieInfo($scope.searchKey).then(function(response) {
      if(response.data.Response === "True") {
        $scope.noResults = false;
        $scope.movieList = response.data.Search;
        if($scope.movieList.length > 5) {
          $scope.canShowMore = true;
          curPage++;
        }
      }
      else{
        $scope.noResults = true;
      }
      
    });
  };

  $scope.loadMore = function (argument) {
    if(!$scope.searchKey){
      $scope.searchKey = "";
    }
    omdbget.getMovieInfo($scope.searchKey).then(function(response) {
        if(response && response.length === 0) {
          $scope.canShowMore = false;
        }else{
          $scope.noResults = false;
          $scope.movieList = $scope.movieList.concat(response);
          $scope.canShowMore = false;
          curPage++;
        }
        $scope.$broadcast('scroll.InfiniteScrollComplete');
    })
  };

  $scope.shareMovie = function(movie) {
    StorageService.add(movie);
  };

  $scope.taptest = function(movie) {
    $rootScope.movieCardInfo = {};
    $scope.getAllInfo(movie.imdbID);
  };

  $scope.getAllInfo = function(id) {
    omdbget.getAllInfo(id).then(function(response, data) {
       $rootScope.movieCardInfo = response.data;
    });
  };

  $scope.myGoBack = function() {
     $ionicHistory.goBack();
  };

});