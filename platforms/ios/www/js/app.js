// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var prometheus = angular.module('prometheus', ['ionic', 'firebase', 'ui.router', 'ngCordova'])

prometheus.controller('zeusController', function($rootScope, $scope, $state, $ionicPlatform, $cordovaContacts) {
      $rootScope.navState = {
        groups : "active",
        lists : null,
        search : null
      };

      $scope.changeState = function() {
        var currentState = event.currentTarget.className.split(" ");
        if(!currentState[2] !== 'active') {
          var curKey = currentState[1];
          for(var key in $scope.navState) {
            if(key === curKey) {
              $rootScope.navState[curKey] = 'active';
              
            }
            else{
              $rootScope.navState[key] = null;
            }
          }
        }
      };

      $scope.addUser = function() {
        $scope.userInfo = {
            "email" : $scope.email,
            "password" : $scope.password
        };

        $scope.callAddUser($scope.userInfo);
      };

      $scope.callAddUser = function(userinfo) {
        var ref = new Firebase("https://torrid-fire-916.firebaseio.com/users");
        ref.createUser(userinfo, function(error, userData) {
          if (error) {
            console.log("Error creating user:", error);
          } 
          else {
            console.log("Successfully created user account with uid:", userData.uid);
            $scope.gotoApp(userinfo);
          }
        });
      };

      $scope.gotoApp = function(userinfo) {
        var ref = new Firebase("https://torrid-fire-916.firebaseio.com/users");
        ref.authWithPassword(userinfo, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            $state.go('groups');
          }
        });
      };
});

prometheus.controller('groupsController', function($scope, $cordovaContacts) {
  $scope.phoneList = ['a', 'b', 'c', 'd', 'e'];

  $scope.addGroup = function() {
    $cordovaContacts.find({filter: ''}).then(function(response) {
      $scope.contactList = response;
    });
  };

  $scope.createGroup = function() {
      $scope.albumNameArray = [];
      angular.forEach($scope.item, function(album){
        if (!!album.selected) $scope.albumNameArray.push(album.name);
      })
  };

});

prometheus.controller('searchController', function($scope, $rootScope, $ionicHistory, omdbget, $http) {
  var curPage = 0;
  $scope.canShowMore = false;
  $scope.noResults = false;
  $scope.certified = false;
  $scope.rotten = false;
  $scope.movieList = [];
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

  $scope.taptest = function(movie) {
    $rootScope.movieCardInfo = {};
    $scope.getAllInfo(movie.imdbID);
  };

  $scope.getAllInfo = function(id) {
    omdbget.getAllInfo(id).then(function(response) {
       $rootScope.movieCardInfo = response.data;
    });
  };

  $scope.myGoBack = function() {
     $ionicHistory.goBack();
  };
});


prometheus.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('signup', {
      url: '/',
      templateUrl: 'views/signup.html'
    })
    $stateProvider.state('groups', {
      url: '/groups',
      templateUrl: 'views/groups.html'
    })
    $stateProvider.state('lists', {
      url: '/lists',
      templateUrl: 'views/lists.html'
    })
    $stateProvider.state('success', {
      url: '/success',
      templateUrl: 'views/successpage.html'
    })
    $stateProvider.state('search', {
      url: '/search',
      templateUrl: 'views/search.html'
    })
    $stateProvider.state('moviecard', {
      url: '/moviecard',
      templateUrl: 'views/moviecard.html'
    })
    $urlRouterProvider.otherwise('/');
});