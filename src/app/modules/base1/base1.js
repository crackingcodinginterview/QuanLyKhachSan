define(function(require){
    'use strict';

    var angular = require('angular');
    var module = angular.module('app.base1', []);
    var template = require('text!./templates/base1.html');

    run.$inject = ['$templateCache'];
    function run($templateCache){
        $templateCache.put('base1/templates/base1.html', template);
    }
    module.run(run);

    config.$inject = ['$stateProvider'];
    function config($stateProvider){
        $stateProvider.state('base1', {
            url: '',
            abstract: true,
            templateUrl: 'base1/templates/base1.html'
        });
    }
    module.config(config);

    return module.name;
});