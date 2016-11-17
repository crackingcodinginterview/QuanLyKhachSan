define(function(require){
    'use strict';

    var angular = require('angular');
    var module = angular.module('app.confirmnewpassword', []);
    var template = require('text!./templates/confirmnewpassword.html');
    var controller = require('./controllers/confirmnewpassword');

    //Đăng kí controller
    module.controller('ConfirmNewPasswordController', controller);

    run.$inject = ['$templateCache'];
    function run($templateCache){
        $templateCache.put('confirmnewpassword/templates/confirmnewpassword.html', template);
    }
    module.run(run);

    config.$inject = ['$stateProvider'];
    function config($stateProvider){
        $stateProvider.state('base2.confirmnewpassword', {
            url: '/auth/reset_password/:oobCode',
            views: {
                'base2': {
                    templateUrl: 'confirmnewpassword/templates/confirmnewpassword.html',
                    controller: 'ConfirmNewPasswordController',
                    controllerAs: 'vm'
                }
            }
        });
    }
    module.config(config);

    return module.name;
});