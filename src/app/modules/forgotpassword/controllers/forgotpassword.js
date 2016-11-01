define(function(require){
    'use strict';

    var angular = require('angular');
       
    ctrlFn.$inject = ['$scope', '$window','UserService','$state'];
    function ctrlFn($scope, $window,UserService,$state){

        $scope.Name = "";
        
        //Nội dung của controller ghi ở đây
            $scope.ShowAlert = function () {
                console.log("fghfdghdfkhg");
                if (typeof ($scope.Name) == "undefined" || $scope.Name == "" || $scope.Name.indexOf("gmail.com") == -1) {
                   // $window.alert("Please enter your name!");
                   document.getElementById("email_error").innerHTML = "login or email does not exists";
                    return;
                }
                $state.go('base2.login');//test di
                UserService.resetPassword($scope.Name);
                               //$window.alert("Hello " + $scope.Name);
            }
            

          console.log('đang ở forgotpassword');
    }

    return ctrlFn;

});