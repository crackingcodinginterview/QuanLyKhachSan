define(function(require){
    'use strict';

    var angular = require('angular');
    var module = angular.module('app.base', []);
    var template = require('text!./templates/base.html');

    run.$inject = ['$templateCache'];
    function run($templateCache){
        $templateCache.put('base/templates/base.html', template);
    }
    module.run(run);

    config.$inject = ['$stateProvider'];
    function config($stateProvider){
        $stateProvider.state('base', {
            url: '',
            abstract: true,
            templateUrl: 'base/templates/base.html'
        });
    }
    module.config(config);

    return module.name;
});