prometheus.controller('groupsController', function($scope, $cordovaContacts) {

  $scope.addGroup = function() {
    $scope.phoneList = [{
      "name" : "a",
      "phone" : "1"  
    },
    {
      "name" : "b",
      "phone" : "2"  
    },
    {
      "name" : "c",
      "phone" : "3"  
    },
    {
      "name" : "d",
      "phone" : "4"  
    },
    {
      "name" : "e",
      "phone" : "5"  
    }];
    // $cordovaContacts.find({filter: ''}).then(function(response) {
    //   $scope.contactList = response;

    // });
  };

  $scope.createGroup = function() {
      //creategroup
      $scope.groupInfo = {
        "group_name" : "movies_group",
        "members" : {}
      };
      var ref = new Firebase("https://torrid-fire-916.firebaseio.com/");
      var keystamp = (ref.child("groups").push().key()).valueOf();
      var keyObj = {};
      keyObj[keystamp] = true;
      angular.forEach($scope.phoneList, function(value, key){
        if (value.selected) {
          $scope.groupInfo.members[value.phone] = true;
          ref.child("users/"+value.phone+"/groups").update(keyObj, function(error){
          if(error) {
            prompt(error);
          }
          else{
           prompt('Data into successful');
          }
        });
        }
      }); 
      ref.child("groups/"+ keystamp).update($scope.groupInfo, function(error){
        if(error) {
          prompt(error);
        }
        else{
         prompt('Data successful');
        }
      });
  };

});
