define(function(require){
    'use strict';

    var angular = require('angular');
    var module = angular.module('app.base3', []);
    var template = require('text!./templates/base3.html');
    var controller = require('./controllers/base3');

    module.controller('Base3Controller', controller);

    run.$inject = ['$templateCache'];
    function run($templateCache){
        $templateCache.put('base3/templates/base3.html', template);
    }
    module.run(run);

    config.$inject = ['$stateProvider'];
    function config($stateProvider){
        $stateProvider.state('base3', {
            url: '',
            abstract: true,
            templateUrl: 'base3/templates/base3.html',
            controller: 'Base3Controller',
            controllerAs: 'vm'
        });
    }
    module.config(config);

    return module.name;
});