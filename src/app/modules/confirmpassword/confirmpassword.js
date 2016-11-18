define(function(require){
    'use strict';

    var angular = require('angular');
    var module = angular.module('app.confirmpassword', []);
    var template = require('text!./templates/confirmpassword.html');
    var controller = require('./controllers/confirmpassword');

    //Đăng kí controller
    module.controller('ConfirmPasswordController', controller);

    run.$inject = ['$templateCache'];
    function run($templateCache){
        $templateCache.put('confirmpassword/templates/confirmpassword.html', template);
    }
    module.run(run);

    config.$inject = ['$stateProvider'];
    function config($stateProvider){
        $stateProvider.state('base2.confirmpassword', {
            url: '/auth/reset_password/:oobCode',
            views: {
                'base2': {
                    templateUrl: 'confirmpassword/templates/confirmpassword.html',
                    controller: 'ConfirmPasswordController',
                    controllerAs: 'vm'
                }
            }
        });
    }
    module.config(config);

    return module.name;
});