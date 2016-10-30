define(function(require){
    'use strict';

    var angular = require('angular');
    var module = angular.module('app.accountsetting', []);
    var template = require('text!./templates/accountsetting.html');
    var passwordTemplate = require('text!./templates/password.html');
    var languageTemplate = require('text!./templates/language.html');
    var subscriptionTemplate = require('text!./templates/subscription.html');

    run.$inject = ['$templateCache'];
    function run($templateCache){
        $templateCache.put('accountsetting/templates/accountsetting.html', template);
        $templateCache.put('accountsetting/templates/password.html', passwordTemplate);
        $templateCache.put('accountsetting/templates/language.html', languageTemplate);
        $templateCache.put('accountsetting/templates/subscription.html', subscriptionTemplate);
    }
    module.run(run);

    config.$inject = ['$stateProvider'];
    function config($stateProvider){
        $stateProvider
            .state('base3.accountsetting', {
                url: '',
                abstract: true,
                views: {
                    'base3': {
                        templateUrl: 'accountsetting/templates/accountsetting.html',
                    }
                }
            })
            .state('base3.accountsetting.password', {
                url: '/account_settings/password',
                views: {
                    'accountsetting': {
                        templateUrl: 'accountsetting/templates/password.html',
                    }
                }
            })
            .state('base3.accountsetting.language', {
                url: '/account_settings/language',
                views: {
                    'accountsetting': {
                        templateUrl: 'accountsetting/templates/language.html',
                    }
                }
            })
            .state('base3.accountsetting.subscription', {
                url: '/account_settings/subscription',
                views: {
                    'accountsetting': {
                        templateUrl: 'accountsetting/templates/subscription.html',
                    }
                }
            });
    }
    module.config(config);

    return module.name;
});