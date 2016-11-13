'use strict';
require.config({
    preserveLicenseComments: false,
    generateSourceMaps: false,
    waitSeconds: 30,
    paths: {
        jquery: 'bower_components/jquery/dist/jquery',
        angular: 'bower_components/angular/angular',
        moment: 'bower_components/moment/moment',

        firebase: 'bower_components/firebase/firebase',

        uiRouter: 'bower_components/angular-ui-router/release/angular-ui-router',
        ngTable: 'bower_components/ng-table/dist/ng-table',
        angularBoostrap: 'bower_components/angular-bootstrap/ui-bootstrap-tpls',
        angularFire: 'bower_components/angularfire/dist/angularfire',
        angularMoment: 'bower_components/angular-moment/angular-moment',
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
        'angularMoment'
    ]
});
