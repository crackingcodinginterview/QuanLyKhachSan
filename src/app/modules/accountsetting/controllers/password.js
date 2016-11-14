define(function(require){
    'use strict';

    var angular = require('angular');

    ctrlFn.$inject = ['$scope', '$window', 'UserContext', '$state'];
    function ctrlFn($scope, $window, UserContext, $state){
        //Nội dung của controller ghi ở đây
        //var vm = this;
        console.log('Đang ở Account Settings');
        
        $scope.oldPassStt = false;
        $scope.newPassStt = false;
        $scope.confPassStt = false;
        $scope.confPassStt = false;

        $scope.clickChangePassword = function() {
        	console.log('Đã click Change Password!');
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
        		alert("Something wrong!");
        		isValid = false;
        	}
        	if (isValid === true)
        	{
        		UserContext.changePassword($scope.newPassword);
        		//$state.go('base2.login');
        		alert("Your password is changed successfully!");
        	}
        }
    }
    return ctrlFn;
});