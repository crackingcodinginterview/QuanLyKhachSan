define(function(require){
    'use strict';

    var angular = require('angular');
    var module = angular.module('app.accounting', []);
    var template = require('text!./templates/accounting.html');
    var newCustomerTemplate = require('text!./templates/newcustomer.html');
    var historyCustomerTemplate = require('text!./templates/historycustomer.html');
    var controller = require('./controllers/accounting');
    var newCustomerController = require('./controllers/newcustomer');
    var historyCustomerController = require('./controllers/historycustomer');

    //Đăng kí controller
    module.controller('AccountingController', controller);
    module.controller('NewCustomerController', newCustomerController);
    module.controller('HistoryCustomerController', historyCustomerController);

    run.$inject = ['$templateCache'];
    function run($templateCache){
        $templateCache.put('accounting/templates/accounting.html', template);
        $templateCache.put('accounting/templates/newCustomer.html', newCustomerTemplate);
        $templateCache.put('accounting/templates/historyCustomer.html', historyCustomerTemplate);
    }
    module.run(run);

    config.$inject = ['$stateProvider'];
    function config($stateProvider){
        $stateProvider
            .state('base3.accounting', {
                url: '/customer/show_customers',
                authorization: true,
                views: {
                    'base3': {
                        templateUrl: 'accounting/templates/accounting.html',
                        controller: 'AccountingController',
                        controllerAs: 'vm',
                        resolve: {
                        }
                    }
                }
            })
            .state('base3.historycustomer', {
                url: '/customer/history',
                authorization: true,
                views: {
                    'base3': {
                        templateUrl: 'accounting/templates/historyCustomer.html',
                        controller: 'HistoryCustomerController',
                        controllerAs: 'vm',
                        resolve: {
                        }
                    }
                }
            });
    }
    module.config(config);

    return module.name;
});