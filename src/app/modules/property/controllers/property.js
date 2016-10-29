define(function(require){
    'use strict';

    var angular = require('angular');

    ctrlFn.$inject = ['$scope', '$uibModal'];
    function ctrlFn($scope, $uibModal){
        var vm = this;
        //Nội dung của controller ghi ở đây
        console.log('đang ở property');

        function getNewProperty(){
            return $uibModal.open({
                animation: true,
                templateUrl: 'property/templates/newProperty.html',
                controller: 'NewPropertyController',
                controllerAs: 'vm',
                size: 'lg'
            });
        }
        function onCreateNewProperty(){
            getNewProperty().result.then(function(){
                debugger;
            });
        }

        vm.onCreateNewProperty = onCreateNewProperty;
    }

    return ctrlFn;
});