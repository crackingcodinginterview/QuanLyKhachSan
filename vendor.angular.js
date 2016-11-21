'use strict';
require.config({
    preserveLicenseComments: false,
    generateSourceMaps: false,
    waitSeconds: 30,
    paths: {
        jquery: 'bower_components/jquery/dist/jquery',
        angular: 'bower_components/angular/angular',
        moment: 'bower_components/moment/moment',
        fullCalendar: 'bower_components/fullcalendar/dist/fullcalendar',
        gCal: 'bower_components/fullcalendar/dist/gcal',

        firebase: 'bower_components/firebase/firebase',

        uiRouter: 'bower_components/angular-ui-router/release/angular-ui-router',
        ngTable: 'bower_components/ng-table/dist/ng-table',
        angularBoostrap: 'bower_components/angular-bootstrap/ui-bootstrap-tpls',
        angularFire: 'bower_components/angularfire/dist/angularfire',
        angularMoment: 'bower_components/angular-moment/angular-moment',
        angularAnimate: 'bower_components/angular-animate/angular-animate',
        angularToaster: 'bower_components/AngularJS-Toaster/toaster',
        angularLocalStorage: 'bower_components/angular-local-storage/dist/angular-local-storage',
        angularLoadingBar: 'bower_components/angular-loading-bar/build/loading-bar',
        angularFullcalendar: 'bower_components/angular-ui-calendar/src/calendar',
    },
    shim: {
        'angularFire': {
            deps: ['angular', 'firebase'],
        },
        'moment': {
            deps: ['jquery'],
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
        'angularMoment': {
            deps: ['moment', 'angular']
        },
        'angularAnimate': {
            deps: ['angular']
        },
        'angularToaster': {
            deps: ['angularAnimate']
        },
        'angularLocalStorage': {
            deps: ['angular']
        },
        'angularLoadingBar': {
            deps: ['angularAnimate']
        },
        'gCal': {
            deps: ['jquery', 'fullCalendar'],
        },
        'fullCalendar': {
            deps: ['moment']
        }        ,
        'angularFullcalendar': {
            deps: ['angular', 'fullCalendar']
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
        'angularFire',
        'angularMoment',
        'angularAnimate',
        'angularToaster',
        'angularLocalStorage',
        'angularLoadingBar'
    ]
});
