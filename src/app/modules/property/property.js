define(function(require){
    'use strict';

    var angular = require('angular');
    var module = angular.module('app.property', []);
    var template = require('text!./templates/property.html');
    var newPropertyTemplate = require('text!./templates/newProperty.html');
    var controller = require('./controllers/property');
    var newPropertyController = require('./controllers/newProperty');

    //Đăng kí controller
    module.controller('PropertyController', controller);
    module.controller('NewPropertyController', newPropertyController);

    run.$inject = ['$templateCache'];
    function run($templateCache){
        $templateCache.put('property/templates/property.html', template);
        $templateCache.put('property/templates/newProperty.html', newPropertyTemplate);
    }
    module.run(run);

    config.$inject = ['$stateProvider'];
    function config($stateProvider){
        $stateProvider.state('base3.property', {
            url: '/properties/my_properties',
            views: {
                'base3': {
                    templateUrl: 'property/templates/property.html',
                    controller: 'PropertyController',
                    controllerAs: 'vm'
                }
            }
        });
    }
    module.config(config);

    return module.name;
});