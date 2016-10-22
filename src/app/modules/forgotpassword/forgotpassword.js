define(function(require){
    'use strict';

    var angular = require('angular');
    var module = angular.module('app.forgotpassword', []);
    var template = require('text!./templates/forgotpassword.html');
    var controller = require('./controllers/forgotpassword');

    //Đăng kí controller
    module.controller('ForgotpasswordController', controller);

    run.$inject = ['$templateCache'];
    function run($templateCache){
        $templateCache.put('forgotpassword/templates/forgotpassword.html', template);
    }
    module.run(run);

    config.$inject = ['$stateProvider'];
    function config($stateProvider){
        $stateProvider.state('base2.forgotpassword', {
            url: '/auth/forgot_password',
            views: {
                'base2': {
                    templateUrl: 'forgotpassword/templates/forgotpassword.html',
                    controller: 'ForgotpasswordController'
                }
            }
        });
    }
    module.config(config);

    return module.name;
});