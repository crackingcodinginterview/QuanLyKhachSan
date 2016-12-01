define(function(require){
    'use strict';

    var angular = require('angular');
    var _ = require('lodash');

    ctrlFn.$inject = ['ajaxLoadingFactory', 'toaster', 'CompanyService', 'UserContext', 'ModelFactory', 'moment', 'EmailService', '$q'];
    function ctrlFn(ajaxLoadingFactory, toaster, CompanyService, UserContext, ModelFactory, moment, EmailService, $q){
        var vm = this;
        var _userInfor = UserContext.getUserInfor();

        function initModelInvoiceEmail(){
            vm.invoiceEmailForm = {
                data: ModelFactory.getModelData('invoiceEmail'),
                ui: {},
                $selector: null
            };
        }
        function onInvoiceEmailTab_Click(){
            ajaxLoadingFactory.show();
            initModelInvoiceEmail();
            EmailService.getInvoiceEmail(_userInfor.userId, _userInfor.propertyId)
                .then(function(resp){
                    vm.invoiceEmailForm.data = resp;
                    ajaxLoadingFactory.hide();
                })
                .catch(function(error){
                    ajaxLoadingFactory.hide();
                });
        }
        function onInvoiceEmailUpdateButton_Click(){
            ajaxLoadingFactory.show();
            var invoiceEmailDataModel = ModelFactory.createNewModelFromSource(vm.invoiceEmailForm.data, 'invoiceEmail');
            EmailService.setInvoiceEmail(_userInfor.userId, _userInfor.propertyId, invoiceEmailDataModel)
                .then(function(resp){
                    toaster.pop('success', 'Note', 'Update invoiceEmail success!');
                    ajaxLoadingFactory.hide();
                })
                .catch(function(error){
                    toaster.pop('error', 'Note', 'Update invoiceEmail fail!');
                    ajaxLoadingFactory.hide();
                });
        }
        function initModelBookingConfirmationEmail(){
            vm.bookingConfirmationEmailForm = {
                data: ModelFactory.getModelData('bookingConfirmationEmail'),
                ui: {},
                $selector: null
            };
        }
        function onBookingConfirmationEmailTab_Click(){
            ajaxLoadingFactory.show();
            initModelBookingConfirmationEmail();
            EmailService.getbookingConfirmationEmail(_userInfor.userId, _userInfor.propertyId)
                .then(function(resp){
                    vm.bookingConfirmationEmailForm.data = resp;
                    ajaxLoadingFactory.hide();
                })
                .catch(function(error){
                    ajaxLoadingFactory.hide();
                });
        }
        function onBookingConfirmationEmailUpdateButton_Click(){
            ajaxLoadingFactory.show();
            var bookingConfirmationEmailDataModel = ModelFactory.createNewModelFromSource(vm.bookingConfirmationEmailForm.data, 'bookingConfirmationEmail');
            EmailService.setBookingConfirmationEmail(_userInfor.userId, _userInfor.propertyId, bookingConfirmationEmailDataModel)
                .then(function(resp){
                    toaster.pop('success', 'Note', 'Update bookingConfirmationEmail success!');
                    ajaxLoadingFactory.hide();
                })
                .catch(function(error){
                    toaster.pop('error', 'Note', 'Update bookingConfirmationEmail fail!');
                    ajaxLoadingFactory.hide();
                });
        }
        vm.onInvoiceEmailTab_Click = onInvoiceEmailTab_Click;
        vm.onInvoiceEmailUpdateButton_Click = onInvoiceEmailUpdateButton_Click;
        vm.onBookingConfirmationEmailTab_Click = onBookingConfirmationEmailTab_Click;
        vm.onBookingConfirmationEmailUpdateButton_Click = onBookingConfirmationEmailUpdateButton_Click;

        onInvoiceEmailTab_Click();
    }

    return ctrlFn;
});