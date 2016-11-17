define(function(require){
    'use strict';

    var angular = require('angular');
    var module = angular.module('app.register', []);
    var template = require('text!./templates/register.html');
    var controller = require('./controllers/register');

    //Đăng kí controller
    module.controller('RegisterController', controller);

    run.$inject = ['$templateCache'];
    function run($templateCache){
        $templateCache.put('register/templates/register.html', template);
    }
    module.run(run);

    config.$inject = ['$stateProvider'];
    function config($stateProvider){
        $stateProvider.state('base2.register', {
            url: '/auth/register',
            views: {
                'base2': {
                    templateUrl: 'register/templates/register.html',
                    controller: 'RegisterController',
                    controllerAs: 'vm',
                }
            }
        });
    }
    module.config(config);

    return module.name;
});