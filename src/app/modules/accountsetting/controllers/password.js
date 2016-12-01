define(function(require){
    'use strict';
    var angular = require('angular');
    ctrlFn.$inject = ['$scope', 'UserContext', '$state', 'toaster', 'ajaxLoadingFactory'];
    function ctrlFn($scope, UserContext, $state, toaster, ajaxLoadingFactory){
        //Nội dung của controller ghi ở đây
        //var vm = this;
        $scope.oldPassStt = false;
        $scope.newPassStt = false;
        $scope.confPassStt = false;
        $scope.confPassStt = false;
        $scope.clickChangePassword = function() {
            ajaxLoadingFactory.show();
            var isValid = true;
            if ($scope.oldPassword.length < 6 || $scope.oldPassword === "")
            {
                $scope.oldPassStt = true;
                isValid = false;
            }
            else
            {
                $scope.oldPassStt = false;
            }
            if ($scope.newPassword.length < 6 || $scope.newPassword === "")
            {
                $scope.newPassStt = true;
                isValid = false;
            }
            else
            {
                $scope.newPassStt = false;
            }
            if ($scope.confirmPassword.length < 6 || $scope.confirmPassword === "")
            {
                $scope.confPassStt = true;
                isValid = false;
            }
            else
            {
                $scope.confPassStt = false;
            }
            if ($scope.newPassword != $scope.confirmPassword)
            {
                $scope.confPassStt2 = true;
                isValid = false;
            }
            else
            {
                $scope.confPassStt2 = false;
            }
            if (typeof($scope.oldPassword) === "undefined"
                || typeof($scope.newPassword) === "undefined"
                || typeof($scope.confirmPassword) === "undefined")
            {
                isValid = false;
            }
            if (isValid === true)
            {
                UserContext.changePassword($scope.newPassword)
                    .then(function(resp){
                        toaster.pop('success', 'Note', 'Change password success!');
                        ajaxLoadingFactory.hide();
                        return UserContext.signOut();
                    })
                    .then(function(resp){
                        $state.go('base2.login');
                    })
                    .catch(function(error){
                        toaster.pop('error', 'Note', 'Something wrong!');
                        ajaxLoadingFactory.hide();
                    });
            }
            else{
                toaster.pop('error', 'Note', 'Something wrong!');
                ajaxLoadingFactory.hide();
            }
        }
    }
    return ctrlFn;
});