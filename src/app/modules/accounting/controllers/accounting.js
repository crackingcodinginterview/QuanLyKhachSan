define(function(require){
    'use strict';

    var angular = require('angular');

    ctrlFn.$inject = ['$scope', 'NgTableParams', '$uibModal', 'CustomerService'];
    function ctrlFn($scope, NgTableParams, $uibModal, CustomerService){
        //Nội dung của controller ghi ở đây
        console.log('đang ở AccountingController');
        var vm = this;
        CustomerService.addNewCustomer({a: 'bbbb'});
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
                size: 'sm'
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