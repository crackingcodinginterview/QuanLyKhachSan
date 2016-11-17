'use strict';
require.config({
    preserveLicenseComments: false,
    generateSourceMaps: false,
    waitSeconds: 30, // timeout
    paths: {
        jquery: 'bower_components/jquery/dist/jquery',
        lodash: 'bower_components/lodash/dist/lodash',

        'firebase': 'bower_components/firebase/firebase',
        'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap',
        'moment': 'bower_components/moment/src/moment',
    },
    shim: {
        'firebase': {
            exports: 'firebase'
        },
        'bootstrap': {
            deps: ['jquery'],
        },
        'lodash': {
            exports: '_'
        },
    },
    exclude:[],
    include: [
        'jquery',
        'firebase',
        'bootstrap',
        'lodash'
    ]
});
