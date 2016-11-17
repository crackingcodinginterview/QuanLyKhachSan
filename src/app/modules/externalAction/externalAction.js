define(function(require){
    'use strict';

    var angular = require('angular');
    var module = angular.module('app.externalaction', []);
    var controller = require('./controllers/externalaction');

    //Đăng kí controller
    module.controller('ExternalActionController', controller);

    config.$inject = ['$stateProvider'];
    function config($stateProvider){
        $stateProvider.state('base2.externalaction', {
            url: '/action?mode=?&oobCode=?',
            views: {
                'base2': {
                    controller: 'ExternalActionController'
                }
            }
        });
    }
    module.config(config);

    return module.name;
});