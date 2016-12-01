define(function(require) {
    'use strict';

    var angular = require('angular');
    var _ = require('lodash');

    ctrlFn.$inject = ['$scope', 'UserService', '$state', 'UserContext', 'ProfileService', 'toaster', 'ajaxLoadingFactory', 'PropertyService', '$q'];

    function ctrlFn($scope, UserService, $state, UserContext, ProfileService, toaster, ajaxLoadingFactory, PropertyService, $q) {
        $scope.email = '';
        $scope.password = '';
        $scope.login = function() {
            ajaxLoadingFactory.show();
            if ($scope.email != '' && $scope.password.length >= 6) {
                var userId;
                UserService.login($scope.email, $scope.password)
                    .then(function(resp) {
                        userId = resp.uid;
                        var promise1 = ProfileService.getUserProfile(userId);
                        var promise2 = PropertyService.getAllProperty(userId);
                        return $q.all([promise1, promise2]);
                    })
                    .then(function(resp){
                        var contextData = {
                            userId: userId,
                            firstName: resp[0].firstName,
                            lastName: resp[0].lastName,
                            email: resp[0].email,
                            propertyId: _.keys(resp[1])[0]
                        };
                        UserContext.fillContext(contextData);
                        toaster.pop('success', 'Note', 'Login success!');
                        ajaxLoadingFactory.hide();
                        $state.go('base3.booking');
                    })
                    .catch(function(error){
                        toaster.pop('error', 'Note', 'Error Happened!');
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
