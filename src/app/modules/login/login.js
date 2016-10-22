define(function(require){
    'use strict';

    var angular = require('angular');
    var module = angular.module('app.login', []);
    var template = require('text!./templates/login.html');
    var controller = require('./controllers/login');

    //Đăng kí controller
    module.controller('LoginController', controller);

    run.$inject = ['$templateCache'];
    function run($templateCache){
        $templateCache.put('login/templates/login.html', template);
    }
    module.run(run);

    config.$inject = ['$stateProvider'];
    function config($stateProvider){
        $stateProvider.state('base2.login', {
            url: '/auth/login',
            views: {
                'base2': {
                    templateUrl: 'login/templates/login.html',
                    controller: 'LoginController'
                }
            }
        });
    }
    module.config(config);

    return module.name;
});