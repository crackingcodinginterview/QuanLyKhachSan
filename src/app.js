define(function(require){
    'use strict';

    var angular = require('angular');
    var appConfig = require('./app.config');
    var appCommon = require('./app/common/index');
    var appModule = require('./app/modules/index');
    var uiRouter = require('uiRouter');
    var module = angular.module('app', [
        'ui.router',

        appConfig,
        appCommon,

        'app.base1',
        'app.base2',
        'app.home',
        'app.login',
        'app.forgotpassword',
        'app.register',
    ]);

    return module;
});