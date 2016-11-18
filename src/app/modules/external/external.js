define(function(require){
    'use strict';

    var angular = require('angular');
    var module = angular.module('app.external', []);
    var controller = require('./controllers/external');

    //Đăng kí controller
    module.controller('ExternalController', controller);

    config.$inject = ['$stateProvider'];
    function config($stateProvider){
        $stateProvider.state('base2.external', {
            url: '/action?mode=?&oobCode=?',
            views: {
                'base2': {
                    controller: 'ExternalController'
                }
            }
        });
    }
    module.config(config);

    return module.name;
});