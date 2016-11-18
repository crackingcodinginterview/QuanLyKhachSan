define(function(require){
    'use strict';

    var angular = require('angular');

    ctrlFn.$inject = ['$scope','UserService','$state','ajaxLoadingFactory','toaster'];
    function ctrlFn($scope,UserService,$state,ajaxLoadingFactory,toaster){

        $scope.Name = "";

        //Nội dung của controller ghi ở đây

        $scope.ShowAlert = function () {
            ajaxLoadingFactory.show();
            if (typeof ($scope.Name) == "undefined" || $scope.Name == "" || $scope.Name.indexOf("gmail.com") == -1) {
                document.getElementById("email_error").innerHTML = "login or email does not exists";
                toaster.pop('Error', 'Note', 'Email invalid!');
                return;
            }
            UserService.resetPassword($scope.Name)
                .then(function ( ) {
                    toaster.pop('success', 'Note', 'check email to reset!');
                    $state.go('base2.login');
                })
                .catch(function(error){
                    toaster.pop('error', 'Note', 'Email invalid!');
                    console.log(error);
                })
                .finally(function () {
                    ajaxLoadingFactory.hide();
                });
        }
    }

    return ctrlFn;

});