define(function(require) {
    'use strict';

    var angular = require('angular');

    ctrlFn.$inject = ['$scope', 'NgTableParams', '$uibModal', 'CustomerService'];

    function ctrlFn($scope, NgTableParams, $uibModal, CustomerService) {
        //Nội dung của controller ghi ở đây
        console.log('đang ở AccountingController');
        var vm = this;
        var data = [];
        var dataSearch = [];
        var dataRoot = [];
        vm.keySearch;

        vm.search = function() {
            if (vm.keySearch != null && vm.keySearch != '') {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].name.indexOf(vm.keySearch) > -1 || data[i].$id.indexOf(vm.keySearch) > -1 ||
                        data[i].phone.indexOf(vm.keySearch) > -1 || data[i].customerType.indexOf(vm.keySearch) > -1) {
                        dataSearch.push(data[i]);
                    }
                }
                if (dataSearch.length === 0) {
                    console.log("not found customer!!!");
                } else {
                    data = dataSearch;
                    vm.tableParams = new NgTableParams({}, {
                        dataset: data
                    });
                    dataSearch = [];
                    data = dataRoot;
                }

            } else {
                dataSearch = [];
                init();
            }
        }

        function init() {
            CustomerService.getAllCustomer()
                .then(function(resp) {
                    data = resp;
                    dataRoot = data;
                    vm.tableParams = new NgTableParams({}, {
                        dataset: data
                    });
                    console.log("Get all customer success", resp);
                })
                .catch(function(error) {
                    console.log("Get all customer error", error);
                });;

        }

        function getNewCustomerModal() {
            return $uibModal.open({
                animation: true,
                templateUrl: 'room/templates/updateavailable.html',
                controller: 'NewCustomerController',
                controllerAs: 'vm',
            });
        }

        function onCreateNewCustomer() {
            getNewCustomerModal().result.then(function() {});
        }

        vm.onCreateNewCustomer = onCreateNewCustomer;

        init();
    }

    return ctrlFn;
});
