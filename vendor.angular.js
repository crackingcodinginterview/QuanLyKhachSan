'use strict';
require.config({
    preserveLicenseComments: false,
    generateSourceMaps: false,
    waitSeconds: 30,
    paths: {
        jquery: 'bower_components/jquery/dist/jquery',
        angular: 'bower_components/angular/angular',

        moment: 'bower_components/moment/src/moment',
        fullCalendar: 'bower_components/fullcalendar/dist/fullcalendar',

        uiRouter: 'bower_components/angular-ui-router/release/angular-ui-router',
        ngTable: 'bower_components/ng-table/dist/ng-table',
        angularBoostrap: 'bower_components/angular-bootstrap/ui-bootstrap-tpls',
        angularFullcalendar: 'bower_components/angular-ui-calendar/src/calendar',
        gcal: 'bower_components/fullcalendar/dist/gcal',
    },
    shim: {
        'gcal': {
            deps: ['jquery', 'angularFullcalendar'],
        },
        'fullCalendar': {
            deps: ['jquery', 'moment'],
        },
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'uiRouter': {
            deps: ['angular']
        },
        'ngTable': {
            deps: ['angular']
        },
        'angularBoostrap': {
            deps: ['angular']
        },
        'angularFullcalendar': {
            deps: ['jquery', 'angular', 'fullCalendar']
        }
    },
    exclude:[
        'jquery',
    ],
    include: [
        'angular',
        'uiRouter',
        'ngTable',
        'angularBoostrap',
        'angularFullcalendar'
    ]
});
