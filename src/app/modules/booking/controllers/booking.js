define(function(require){
    'use strict';

    var angular = require('angular');

    ctrlFn.$inject = ['$scope'];
    function ctrlFn($scope){
        //Nội dung của controller ghi ở đây
        $scope.uiConfig = {
            calendar:{
                height: 450,
                editable: true,
                header:{
                    left: 'title',
                    center: '',
                    right: 'today prev,next'
                },
            }
        };
    }

    return ctrlFn;
});