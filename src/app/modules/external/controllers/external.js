define(function(require){
    'use strict';
    var angular = require('angular');

    ctrlFn.$inject = ['$scope','$state'];
    function ctrlFn($scope, $state){
        switch ($state.params.mode.toLowerCase()){
            case "resetpassword": {
                $state.go('base2.confirmnewpassword', {oobCode: $state.params.oobCode});
            }
                break;

            default:
                break;
        }
    }

    return ctrlFn;
});