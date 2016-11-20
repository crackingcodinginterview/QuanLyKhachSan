define(function(require) {
    'use strict';

    var angular = require('angular');

    ctrlFn.$inject = ['$scope', 'NgTableParams', '$uibModal', 'CustomerService', 'toaster', 'ajaxLoadingFactory'];

    function ctrlFn($scope, NgTableParams, $uibModal, CustomerService, toaster, ajaxLoadingFactory) {
        //Nội dung của controller ghi ở đây
        var vm = this;
        var data = [];
        var dataSearch = [];
        var dataRoot = [];
        vm.keySearch;
        //ajaxLoadingFactory.show();
        //ajaxLoadingFactory.hide();
        //toaster.pop('error', 'Note', 'Error Happened!');

        vm.search = function() {
            if (vm.keySearch != null && vm.keySearch != '') {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].name.indexOf(vm.keySearch) > -1 || data[i].$id.indexOf(vm.keySearch) > -1 ||
                        data[i].phone.indexOf(vm.keySearch) > -1 || data[i].customerType.indexOf(vm.keySearch) > -1) {
                        dataSearch.push(data[i]);
                    }
                }
                if (dataSearch.length === 0) {
                    toaster.pop('error', 'Note', 'Not found customer!!!');
                    //console.log("not found customer!!!");
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
          ajaxLoadingFactory.show();
            CustomerService.getAllCustomer()
                .then(function(resp) {
                    data = resp;
                    dataRoot = data;
                    vm.tableParams = new NgTableParams({}, {
                        dataset: data
                    });
                      toaster.pop('success', 'Note', 'Get all customer success');
                    //console.log("Get all customer success", resp);
                })
                .catch(function(error) {
                    toaster.pop('error', 'Note', 'Get all customer error');
                    //console.log("Get all customer error", error);
                })
                .finally(function() {
                    ajaxLoadingFactory.hide();
                });

        }

        function getNewCustomerModal() {
            return $uibModal.open({
                animation: true,
                templateUrl: 'src/app/modules/accounting/templates/newCustomer.html',
                controller: 'NewCustomerController',
                controllerAs: 'vm',
            });
        }

        function onCreateNewCustomer() {
            getNewCustomerModal().result.then(function() {
            });
        }

        vm.onCreateNewCustomer = onCreateNewCustomer;

        init();
    }

    return ctrlFn;
});
