define(function(require){
    'use strict';

    var angular = require('angular');
    var module = angular.module('app.accounting', []);
    var template = require('text!./templates/accounting.html');
    var newCustomerTemplate = require('text!./templates/newCustomer.html');
    var controller = require('./controllers/accounting');
    var newCustomerController = require('./controllers/newCustomer');

    //Đăng kí controller
    module.controller('AccountingController', controller);
    module.controller('NewCustomerController', newCustomerController);

    run.$inject = ['$templateCache'];
    function run($templateCache){
        $templateCache.put('accounting/templates/accounting.html', template);
        $templateCache.put('accounting/templates/newCustomer.html', newCustomerTemplate);
    }
    module.run(run);

    config.$inject = ['$stateProvider'];
    function config($stateProvider){
        $stateProvider.state('base3.accounting', {
            url: '/customer/show_customers',
            views: {
                'base3': {
                    templateUrl: 'accounting/templates/accounting.html',
                    controller: 'AccountingController',
                    controllerAs: 'vm'
                }
            }
        });
    }
    module.config(config);

    return module.name;
});