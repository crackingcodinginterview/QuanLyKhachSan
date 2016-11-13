define(function(require) {
    'use strict';

    var angular = require('angular');


    ctrlFn.$inject = ['$scope', '$window', 'UserService', '$state', 'UserContext'];

    function ctrlFn($scope, $window, UserService, $state, UserContext) {
        $scope.email = '';
        $scope.password = '';
        $scope.login = function() {
                if ($scope.email != '' && $scope.password.length >= 6) {
                    UserService.login($scope.email, $scope.password).then(function(currentUser) {
                        UserContext.fillContext(currentUser);
                        $state.go('base3.booking'); //test di
                    }, function(err) {
                        console.log(err);
                    });
                }
            };
            //Nội dung của controller ghi ở đây
        console.log('đang ở login');
    }

    return ctrlFn;
});
