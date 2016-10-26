define(function(require){
    'use strict';

    var angular = require('angular');
    var appConfig = require('./app.config');
    var appCommon = require('./app/common/index');
    var appModule = require('./app/modules/index');
    var uiRouter = require('uiRouter');
    var ngTable = require('ngTable');
    var angularBoostrap = require('angularBoostrap');
    // var angularFullcalendar = require('angularFullcalendar');

    var bootstrap = require('bootstrap');
    var moment = require('moment');

    var module = angular.module('app', [
        'ui.router',
        'ngTable',
        'ui.bootstrap',
        // 'ui.calendar',

        appConfig,
        appCommon,

        'app.base1',
        'app.base2',
        'app.base3',
        'app.home',
        'app.login',
        'app.forgotpassword',
        'app.register',
        'app.booking',
        'app.accounting',
    ]);

    return module;
});