var appControllers=angular.module('app.controllers',[]);

appControllers.controller('LoginController',function($state,$scope,UserService,AuthTokenFactory,Storage){
    $scope.user={};

    $scope.login=function(email,password){
     $scope.loginError=null;
     var request_body={"email":email,"password":password};
     UserService.login(request_body)
     .then(function(response){
             console.log("RESPONSE IS "+JSON.stringify(response));
             AuthTokenFactory.setToken(response.data.token);
             Storage.save('username',response.data.username);
             Storage.save('loggedIn',true);
             Storage.save('id',response.data.id);
             Storage.save('role',response.data.role);
             $state.go('tasks');
           },
           function(error){ $scope.loginError="Oops! Invalid email or password";});
   }

});
