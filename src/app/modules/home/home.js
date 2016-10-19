define(function(require){
    'use strict';

    var angular = require('angular');
    var module = angular.module('app.home', []);
    var template = require('text!./templates/home.html');

    run.$inject = ['$templateCache'];
    function run($templateCache){
        $templateCache.put('home/templates/home.html', template);
    }
    module.run(run);

    config.$inject = ['$stateProvider'];
    function config($stateProvider){
        $stateProvider.state('base.home', {
            url: '/',
            views: {
                'main': {
                    templateUrl: 'home/templates/home.html'
                }
            }
        });
    }
    module.config(config);

    return module.name;
});