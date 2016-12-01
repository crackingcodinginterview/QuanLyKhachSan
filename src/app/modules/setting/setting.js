define(function(require){
    'use strict';

    var angular = require('angular');
    var module = angular.module('app.setting', []);
    var template = require('text!./templates/setting.html');

    var companyTemplate = require('text!./templates/company.html');
    var generalInfomationTemplate = require('text!./templates/company/generalinfomation.html');
    var employeesTemplate = require('text!./templates/company/employees.html');
    var nightAuditDateTemplate = require('text!./templates/company/nightauditdate.html');
    var policiesTemplate = require('text!./templates/company/policies.html');

    var roomsTemplate = require('text!./templates/rooms.html');
    var roomTemplate = require('text!./templates/rooms/room.html');
    var houseKeepingTemplate = require('text!./templates/rooms/housekeeping.html');
    var houseTypeTemplate = require('text!./templates/rooms/roomtype.html');

    var accountingTemplate = require('text!./templates/accounting.html');
    var chargeTypesTemplate = require('text!./templates/accounting/chargetypes.html');
    var customerFieldsTemplate = require('text!./templates/accounting/customerfields.html');
    var customerTypesTemplate = require('text!./templates/accounting/customertypes.html');
    var paymentGatewaysTemplate = require('text!./templates/accounting/paymentgateways.html');
    var paymentTypesTemplate = require('text!./templates/accounting/paymenttypes.html');
    var taxTypesTemplate = require('text!./templates/accounting/taxtypes.html');
    var invoiceTemplate = require('text!./templates/accounting/invoice.html');

    var emailTemplate = require('text!./templates/email.html');
    var invoiceEmailTemplate = require('text!./templates/email/invoiceemail.html');
    var bookConfirmationEmailTemplate = require('text!./templates/email/bookconfirmationemail.html');

    var ratesTemplate = require('text!./templates/rates.html');
    var extrasTemplate = require('text!./templates/rates/extras.html');
    var rateplansTemplate = require('text!./templates/rates/rateplans.html');

    var controller = require('./controllers/setting');
    var companyController = require('./controllers/company');
    var roomsController = require('./controllers/rooms');
    var emailController = require('./controllers/email');
    var accountingController = require('./controllers/accounting');

    //Đăng kí controller
    module.controller('SettingController', controller);
    module.controller('CompanyController', companyController);
    module.controller('RoomsController', roomsController);
    module.controller('EmailController', emailController);
    module.controller('AccountingSettingController', accountingController);

    run.$inject = ['$templateCache'];
    function run($templateCache){
        $templateCache.put('setting/templates/setting.html', template);

        $templateCache.put('setting/templates/company.html', companyTemplate);
        $templateCache.put('setting/templates/company/generalinfomation.html', generalInfomationTemplate);
        $templateCache.put('setting/templates/company/employees.html', employeesTemplate);
        $templateCache.put('setting/templates/company/nightauditdate.html', nightAuditDateTemplate);
        $templateCache.put('setting/templates/company/policies.html', policiesTemplate);

        $templateCache.put('setting/templates/rooms.html', roomsTemplate);
        $templateCache.put('setting/templates/rooms/room.html', roomTemplate);
        $templateCache.put('setting/templates/rooms/housekeeping.html', houseKeepingTemplate);
        $templateCache.put('setting/templates/rooms/roomtype.html', houseTypeTemplate);

        $templateCache.put('setting/templates/accounting.html', accountingTemplate);
        $templateCache.put('setting/templates/accounting/chargetypes.html', chargeTypesTemplate);
        $templateCache.put('setting/templates/accounting/customerfields.html', customerFieldsTemplate);
        $templateCache.put('setting/templates/accounting/customertypes.html', customerTypesTemplate);
        $templateCache.put('setting/templates/accounting/paymentgateways.html', paymentGatewaysTemplate);
        $templateCache.put('setting/templates/accounting/paymenttypes.html', paymentTypesTemplate);
        $templateCache.put('setting/templates/accounting/taxtypes.html', taxTypesTemplate);
        $templateCache.put('setting/templates/accounting/invoice.html', invoiceTemplate);

        $templateCache.put('setting/templates/email.html', emailTemplate);
        $templateCache.put('setting/templates/email/invoiceemail.html', invoiceEmailTemplate);
        $templateCache.put('setting/templates/email/bookconfirmationemail.html', bookConfirmationEmailTemplate);

        $templateCache.put('setting/templates/rates.html', ratesTemplate);
        $templateCache.put('setting/templates/rates/extras.html', extrasTemplate);
        $templateCache.put('setting/templates/rates/rateplans.html', rateplansTemplate);
    }
    module.run(run);

    config.$inject = ['$stateProvider'];
    function config($stateProvider){
        $stateProvider
            .state('base3.setting', {
                url: '',
                abstract: true,
                views: {
                    'base3': {
                        templateUrl: 'setting/templates/setting.html',
                    }
                }
            })
            .state('base3.setting.company', {
                url: '/settings/company',
                authorization: true,
                views: {
                    'setting': {
                        templateUrl: 'setting/templates/company.html',
                        controller: 'CompanyController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('base3.setting.rooms', {
                url: '/settings/room_inventory',
                authorization: true,
                views: {
                    'setting': {
                        templateUrl: 'setting/templates/rooms.html',
                        controller: 'RoomsController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('base3.setting.accounting', {
                url: '/settings/accounting',
                authorization: true,
                views: {
                    'setting': {
                        templateUrl: 'setting/templates/accounting.html',
                        controller: 'AccountingSettingController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('base3.setting.email', {
                url: '/settings/email',
                authorization: true,
                views: {
                    'setting': {
                        templateUrl: 'setting/templates/email.html',
                        controller: 'EmailController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('base3.setting.rates', {
                url: '/settings/rates',
                authorization: true,
                views: {
                    'setting': {
                        templateUrl: 'setting/templates/rates.html',
                        controller: 'CompanyController'
                    }
                }
            });
    }
    module.config(config);

    return module.name;
});