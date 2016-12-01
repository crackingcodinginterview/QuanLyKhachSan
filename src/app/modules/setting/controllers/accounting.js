define(function(require){
    'use strict';

    var angular = require('angular');
    var _ = require('lodash');

    ctrlFn.$inject = ['ajaxLoadingFactory', 'toaster', 'CompanyService', 'UserContext', 'ModelFactory', 'AccountingService', '$q', '$state'];
    function ctrlFn(ajaxLoadingFactory, toaster, CompanyService, UserContext, ModelFactory, AccountingService, $q, $state){
        var vm = this;
        var _userInfor = UserContext.getUserInfor();
        function initModelInvoice(){
            vm.invoiceForm = {
                data:  ModelFactory.getModelData('invoice'),
                ui: {},
                $selector: {}
            }
        }
        function onInvoiceTab_Click(){
            ajaxLoadingFactory.show();
            initModelInvoice();
            AccountingService.getInvoice(_userInfor.userId, _userInfor.propertyId)
                .then(function(resp){
                    vm.invoiceForm.data = resp;
                    ajaxLoadingFactory.hide();
                })
                .catch(function (error) {
                    ajaxLoadingFactory.hide();
                })
        }
        function onInvoiceUpdateButton_Click(){
            ajaxLoadingFactory.show();
            AccountingService.setInvoice(_userInfor.userId, _userInfor.propertyId, vm.invoiceForm.data)
                .then(function(resp){
                    toaster.pop('success', 'Note', 'Update invoice success!');
                    ajaxLoadingFactory.hide();
                })
                .catch(function (error) {
                    toaster.pop('error', 'Note', 'Update invoice fail!');
                    ajaxLoadingFactory.hide();
                })
        }
        function initModelCustomerType() {
            vm.customerTypeForm = {
                data: {},
                ui: {},
                $selector: null
            }
        }
        function onCustomerTypeTab_Click() {
            ajaxLoadingFactory.show();
            initModelCustomerType();
            AccountingService.getCustomerType(_userInfor.userId, _userInfor.propertyId)
                .then(function(resp){
                    vm.customerTypeList = resp;
                    vm.customerTypeFormList = _.map(vm.customerTypeList, function (customerType, index) {
                        var newForm = angular.copy(vm.customerTypeForm);
                        if(index === 0){
                            newForm.ui.isNotAbleDelete = true;
                        }
                        newForm.data = customerType;
                        return newForm;
                    });
                    ajaxLoadingFactory.hide();
                })
                .catch(function (error) {
                    ajaxLoadingFactory.hide();
                })
        }
        function onAddCustomerType_Click() {
            var newForm = angular.copy(vm.customerTypeForm);
            newForm.ui.isNew = true;
            vm.customerTypeFormList.push(newForm);
        }
        function onSaveAllCustomerType_Click(){
            _.forEach(vm.customerTypeFormList, function (customerTypeForm) {
                if(customerTypeForm.ui.isNew === true){
                    vm.customerTypeList.$add(customerTypeForm.data);
                    customerTypeForm.ui.isNew = false;
                    $state.reload();
                }
            });
        }
        function onCustomerTypeDeleteButton_Click(customerTypeForm) {
            vm.customerTypeList.$remove(customerTypeForm.data);
            $state.reload();
        }
        vm.onInvoiceTab_Click = onInvoiceTab_Click;
        vm.onInvoiceUpdateButton_Click = onInvoiceUpdateButton_Click;
        vm.onCustomerTypeTab_Click = onCustomerTypeTab_Click;
        vm.onAddCustomerType_Click = onAddCustomerType_Click;
        vm.onSaveAllCustomerType_Click = onSaveAllCustomerType_Click;
        vm.onCustomerTypeDeleteButton_Click = onCustomerTypeDeleteButton_Click;

        onInvoiceTab_Click();
    }

    return ctrlFn;
});