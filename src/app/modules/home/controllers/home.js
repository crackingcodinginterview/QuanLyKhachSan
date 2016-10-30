define(function(require){
    'use strict';

    var angular = require('angular');

    ctrlFn.$inject = ['$scope', 'UserService'];
    function ctrlFn($scope, UserService){
        //Nội dung của controller ghi ở đây
        console.log('đang ở home');
    }

    return ctrlFn;
});