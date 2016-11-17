define(function(require){
    'use strict';

    var angular = require('angular');
    var _ = require('lodash');
    var module = angular.module('app.config', []);

    appConfig.$inject = ['$locationProvider', '$urlRouterProvider', 'localStorageServiceProvider'];
    function appConfig($locationProvider, $urlRouterProvider, localStorageServiceProvider){
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });
        $urlRouterProvider.otherwise('/');
        localStorageServiceProvider
            .setPrefix('quanlykhachsan')
            .setStorageType('sessionStorage')
            .setNotify(false, false);
    }
    module.config(appConfig);

    module.constant('appConstant', {
        firebaseConfig: {
            apiKey: "AIzaSyCgyDNyMtaTH9S_H0ri4pk5y6stGFfLzno",
            authDomain: "quanlikhachsan-5e6a3.firebaseapp.com",
            databaseURL: "https://quanlikhachsan-5e6a3.firebaseio.com",
            storageBucket: "quanlikhachsan-5e6a3.appspot.com",
            messagingSenderId: "254261538487"
        }
    });

    return module.name;
});