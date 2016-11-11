define(function(require){
    'use strict';

    var angular = require('angular');

    ctrlFn.$inject = ['$scope', '$window', 'UserContext', '$state'];
    function ctrlFn($scope, $window, UserContext, $state){
        //Nội dung của controller ghi ở đây
        //var vm = this;
        console.log('Đang ở Account Settings');

        $scope.clickChangePassword = function() {
        	console.log('Đã click Change Password!');
        	if (typeof($scope.oldPassword) === "undefined" || $scope.oldPassword === "" 
        		|| typeof($scope.newPassword) === "undefined" || $scope.newPassword === "" 
        		|| typeof($scope.confirmPassword) === "undefined" || $scope.confirmPassword === ""
        		|| $scope.newPassword != $scope.confirmPassword)
        	{
        		alert("Something wrong!");
        	}
        	else
        	{
        		UserContext.changePassword($scope.newPassword);
        		$state.go('base2.login');
        		
        	}
        }
    }
    return ctrlFn;
});