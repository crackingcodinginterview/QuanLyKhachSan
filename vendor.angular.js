'use strict';
require.config({
    preserveLicenseComments: false,
    generateSourceMaps: false,
    waitSeconds: 30,
    paths: {
        jquery: 'bower_components/jquery/dist/jquery',
        angular: 'bower_components/angular/angular',

        uiRouter: 'bower_components/angular-ui-router/release/angular-ui-router'
    },
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'uiRouter': {
            deps: ['angular']
        }
    },
    exclude:[
        'jquery'
    ],
    include: [
        'angular',
        'uiRouter'
    ]
});
