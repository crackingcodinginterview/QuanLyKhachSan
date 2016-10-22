define(function(require){
    'use strict';

    var angular = require('angular');
    var module = angular.module('app.base2', []);
    var template = require('text!./templates/base2.html');

    run.$inject = ['$templateCache'];
    function run($templateCache){
        $templateCache.put('base2/templates/base2.html', template);
    }
    module.run(run);

    config.$inject = ['$stateProvider'];
    function config($stateProvider){
        $stateProvider.state('base2', {
            url: '',
            abstract: true,
            templateUrl: 'base2/templates/base2.html'
        });
    }
    module.config(config);

    return module.name;
});