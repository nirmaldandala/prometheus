prometheus.controller('zeusController', function($rootScope, $scope, $state, $ionicPlatform, $cordovaContacts) {
      $rootScope.navState = {
        groups : "active",
        lists : null,
        search : null
      };

      $rootScope.favoriteList = [];

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