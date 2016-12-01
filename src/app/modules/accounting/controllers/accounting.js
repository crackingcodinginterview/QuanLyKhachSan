define(function(require) {
    'use strict';

    var angular = require('angular');
    var _ = require('lodash');

    ctrlFn.$inject = ['NgTableParams', '$uibModal', 'CustomerService', 'toaster', 'ajaxLoadingFactory', 'UserContext', 'ModelFactory', '$state', 'AccountingService', '$q'];
    function ctrlFn(NgTableParams, $uibModal, CustomerService, toaster, ajaxLoadingFactory, UserContext, ModelFactory, $state, AccountingService, $q) {
        var vm = this;
        var _userInfor = UserContext.getUserInfor();

        function initModel() {
            vm.searchCustomerForm = {
                data: {},
                ui: {},
                $selector: null
            }
        }
        function onPageLoading() {
            ajaxLoadingFactory.show();
            var promise1 = CustomerService.getAllCustomer(_userInfor.userId, _userInfor.propertyId);
            var promise2 = AccountingService.getCustomerType(_userInfor.userId, _userInfor.propertyId);
            $q.all([promise1, promise2])
                .then(function(resp) {
                    vm.customerList = resp[0];
                    vm.customerDataset = resp[0];
                    vm.customerTypeList = resp[1];
                    vm.tableParams = new NgTableParams({}, {
                        dataset: vm.customerDataset
                    });
                    ajaxLoadingFactory.hide();
                })
                .catch(function(error) {
                    ajaxLoadingFactory.hide();
                });
        }
        function showCustomerModal(customer) {
            return $uibModal.open({
                animation: true,
                templateUrl: 'accounting/templates/newCustomer.html',
                controller: 'NewCustomerController',
                controllerAs: 'vm',
                resolve: {
                    customer: function () {
                        return customer;
                    },
                    customerTypeList: function () {
                        return vm.customerTypeList;
                    }
                }
            });
        }
        function onCreateNewCustomer() {
            var newCustomer = ModelFactory.getModelData('customer');
            showCustomerModal(newCustomer)
                .result
                .then(function(resp) {
                    vm.customerList.$add(resp);
                })
                .then(function (resp) {
                    toaster.pop('success', 'Note', 'Add customer success!');
                    $state.reload();
                })
                .catch(function (error) {
                    toaster.pop('error', 'Note', 'Add customer fail!');
                })
        }
        function onEditCustomer(customer){
            showCustomerModal(customer)
                .result
                .then(function(resp) {
                    customer = angular.extend(customer, resp);
                    vm.customerList.$save(customer);
                })
                .then(function (resp) {
                    toaster.pop('success', 'Note', 'Edit customer success!');
                    $state.reload();
                })
                .catch(function (error) {
                    toaster.pop('error', 'Note', 'Edit customer fail!');
                })
        }
        function onDeleteCustomer(customer) {
            vm.customerList.$remove(customer)
                .then(function (resp) {
                    toaster.pop('success', 'Note', 'Delete customer success!');
                    $state.reload();
                })
                .catch(function (error) {
                    toaster.pop('error', 'Note', 'Delete customer fail!');
                });
        }
        function search(searchCustomerForm) {
            var customerName = searchCustomerForm.data.customerName.toLowerCase();
            vm.customerDataset = _.filter(vm.customerList, function (customer) {
                return customer.name.indexOf(customerName) > -1 && (!searchCustomerForm.customerTypeId || (customer.customerTypeId === searchCustomerForm.customerTypeId));
            });
            vm.tableParams = new NgTableParams({}, {
                dataset: vm.customerDataset
            });
        }
        vm.onCreateNewCustomer = onCreateNewCustomer;
        vm.onEditCustomer = onEditCustomer;
        vm.onDeleteCustomer = onDeleteCustomer;
        vm.search = search;

        initModel();
        onPageLoading();
    }

    return ctrlFn;
});
