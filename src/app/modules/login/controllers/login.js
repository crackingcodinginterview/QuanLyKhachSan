define(function(require) {
    'use strict';

    var angular = require('angular');


    ctrlFn.$inject = ['$scope', 'UserService', '$state', 'UserContext', 'ProfileService', 'toaster', 'ajaxLoadingFactory'];

    function ctrlFn($scope, UserService, $state, UserContext, ProfileService, toaster, ajaxLoadingFactory) {
        $scope.email = '';
        $scope.password = '';
        $scope.login = function() {
            ajaxLoadingFactory.show();
            if ($scope.email != '' && $scope.password.length >= 6) {
                var promise1,
                    promise2;
                promise1 = UserService.login($scope.email, $scope.password)
                    .then(function(currentUser) {
                        return ProfileService.getFullUserProfile(currentUser.uid);
                    })
                    .then(function(resp){
                        UserContext.fillContext(resp);
                        toaster.pop('success', 'Note', 'Login success!');
                        $state.go('base3.booking');
                    })
                    .catch(function(error){
                        toaster.pop('error', 'Note', 'Error Happened!');
                        console.log(error);
                    })
                    .finally(function(){
                        ajaxLoadingFactory.hide();
                    });
            }
            else {
                toaster.pop('error', 'Note', 'Error Happened!');
                ajaxLoadingFactory.hide();
            }
        };
        //Nội dung của controller ghi ở đây
        console.log('đang ở login');
    }

    return ctrlFn;
});
