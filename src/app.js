define(function(require){
    'use strict';

    var angular = require('angular');
    var appConfig = require('./app.config');
    var appRun = require('./app.run');
    var appCommon = require('./app/common/index');
    var appModule = require('./app/modules/index');
    var uiRouter = require('uiRouter');
    var ngTable = require('ngTable');
    var angularBoostrap = require('angularBoostrap');
    var angularMoment = require('angularMoment');
    var angularAnimate = require('angularAnimate');
    var angularToaster = require('angularToaster');
    var angularLocalStorage = require('angularLocalStorage');
    var angularLoadingBar = require('angularLoadingBar');

    var bootstrap = require('bootstrap');

    var module = angular.module('app', [
        'ui.router',
        'ngTable',
        'ui.bootstrap',
        'angularMoment',
        'ngAnimate',
        'toaster',
        'LocalStorageModule',

        appConfig,
        appCommon,
        appRun,

        'app.base1',
        'app.base2',
        'app.base3',
        'app.home',
        'app.login',
        'app.forgotpassword',
        'app.register',
        'app.booking',
        'app.accounting',
        'app.accountsetting',
        'app.property',
        'app.room',
        'app.external',
    ]);

    return module;
});