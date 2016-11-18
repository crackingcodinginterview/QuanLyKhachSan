define(function(require){
    'use strict';

    var angular = require('angular');
    var module = angular.module('app.booking', []);
    var template = require('text!./templates/booking.html');
    var controller = require('./controllers/booking');

    //Đăng kí controller
    module.controller('BookingController', controller);

    run.$inject = ['$templateCache'];
    function run($templateCache){
        $templateCache.put('booking/templates/booking.html', template);
    }
    module.run(run);

    config.$inject = ['$stateProvider'];
    function config($stateProvider){
        $stateProvider.state('base3.booking', {
            url: '/booking',
            authorization: true,
            views: {
                'base3': {
                    templateUrl: 'booking/templates/booking.html',
                    controller: 'BookingController',
                    controllerAs: 'vm'
                }
            }
        });
    }
    module.config(config);

    return module.name;
});