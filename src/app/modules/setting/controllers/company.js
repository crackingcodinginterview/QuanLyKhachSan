define(function(require){
    'use strict';

    var angular = require('angular');

    ctrlFn.$inject = ['$scope','UserService','$state','ajaxLoadingFactory','toaster'];
    function ctrlFn($scope,UserService,$state,ajaxLoadingFactory,toaster){
        $scope.tabs = [
            {
                id: 1,
                title:'Dynamic Title 1',
                content:'Dynamic content 1'
            },
            {
                id: 2,
                title:'Dynamic Title 2',
                content:'Dynamic content 2',
                disabled: true
            }
        ];
    }

    return ctrlFn;
});