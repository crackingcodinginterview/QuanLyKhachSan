define(function(require){
    'use strict';

    var angular = require('angular');
    var module = angular.module('app.test', []);
    var template = require('text!./templates/test.html');

    run.$inject = ['$templateCache'];
    function run($templateCache){
        $templateCache.put('test/templates/test.html', template);
    }
    module.run(run);

    config.$inject = ['$stateProvider'];
    function config($stateProvider){
        $stateProvider.state('base.test', {
            url: '/test',
            views: {
                'main': {
                    templateUrl: 'test/templates/test.html'
                }
            }
        });
    }
    module.config(config);

    return module.name;
});