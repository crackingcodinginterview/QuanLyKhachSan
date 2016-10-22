define(function(require){
    'use strict';
    
    var angular = require('angular');
    var module = angular.module('app.config', []);

    appConfig.$inject = ['$locationProvider', '$urlRouterProvider'];
    function appConfig($locationProvider, $urlRouterProvider){
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });
        $urlRouterProvider.otherwise('/');
    }

    module.config(appConfig);
    return module.name;
});