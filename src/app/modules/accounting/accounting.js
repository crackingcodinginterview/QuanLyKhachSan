define(function(require) {
    'use strict';

    var angular = require('angular');
    var module = angular.module('app.accounting', []);
    var template = require('text!./templates/accounting.html');
    var newCustomerTemplate = require('text!./templates/newCustomer.html');
    var showProfileTemplate = require('text!./templates/showProfile.html');
    var controller = require('./controllers/accounting');
    var newCustomerController = require('./controllers/newCustomer');
    var showProfileController = require('./controllers/showProfile');

    //Đăng kí controller
    module.controller('AccountingController', controller);
    module.controller('NewCustomerController', newCustomerController);
    module.controller('ShowProfileController', showProfileController);

    run.$inject = ['$templateCache'];

    function run($templateCache) {
        $templateCache.put('accounting/templates/accounting.html', template);
        $templateCache.put('accounting/templates/newCustomer.html', newCustomerTemplate);
        $templateCache.put('accounting/templates/showProfile.html', showProfileTemplate);
    }
    module.run(run);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider.state('base3.accounting', {
            url: '/customer/show_customers',
            authorization: true,
            views: {
                'base3': {
                    templateUrl: 'accounting/templates/accounting.html',
                    controller: 'AccountingController',
                    controllerAs: 'vm',
                    resolve: {}
                }
            }
        });
    }
    module.config(config);

    return module.name;
});
