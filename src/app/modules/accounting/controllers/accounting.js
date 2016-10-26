define(function(require){
    'use strict';

    var angular = require('angular');

    ctrlFn.$inject = ['$scope', 'NgTableParams', '$uibModal'];
    function ctrlFn($scope, NgTableParams, $uibModal){
        //Nội dung của controller ghi ở đây
        console.log('đang ở AccountingController');
        var vm = this;
        var data;

        function init(){
            data = [{name: "Moroni", age: 50}];

            vm.tableParams = new NgTableParams({}, { dataset: data});
        }
        function getNewCustomerModal(){
            return $uibModal.open({
                animation: true,
                templateUrl: 'accounting/templates/newCustomer.html',
                controller: 'NewCustomerController',
                controllerAs: 'vm',
            });
        }
        function onCreateNewCustomer(){
            getNewCustomerModal().result.then(function(){
                debugger;
            });
        }

        vm.onCreateNewCustomer = onCreateNewCustomer;

        init();
    }

    return ctrlFn;
});