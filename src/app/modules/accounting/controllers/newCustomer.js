define(function(require) {
    'use strict';

    var angular = require('angular');

    ctrlFn.$inject = ['$uibModalInstance', 'customer', 'customerTypeList'];
    function ctrlFn($uibModalInstance, customer, customerTypeList) {
        var vm = this;

        function initModel() {
            vm.customerForm = {
                data: angular.copy(customer),
                ui: {},
                $selector: null
            };
            vm.customerTypeList = customerTypeList;
        }
        function ok(customerForm) {
            $uibModalInstance.close(customerForm.data);
        }
        function cancel() {
            $uibModalInstance.dismiss();
        }
        vm.ok = ok;
        vm.cancel = cancel;

        initModel();
    }
    return ctrlFn;
});
