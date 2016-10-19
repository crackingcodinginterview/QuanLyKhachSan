define(function(require){
    var angular = require('angular');
    var appConfig = require('./app.config');
    var appModule = require('./app/modules/index');
    var uiRouter = require('uiRouter');
    var module = angular.module('app', [
        'ui.router',

        appConfig,

        'app.base',
        'app.home',
        'app.test'
    ]);

    return module;
});