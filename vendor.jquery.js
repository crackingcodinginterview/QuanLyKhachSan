'use strict';
require.config({
    preserveLicenseComments: false,
    generateSourceMaps: false,
    waitSeconds: 30, // timeout
    paths: {
        jquery: 'bower_components/jquery/dist/jquery',

        'firebase': 'bower_components/firebase/firebase',
        'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap',
        'moment': 'bower_components/moment/src/moment',
    },
    shim: {
        'firebase': {
            exports: 'firebase'
        },
        'bootstrap': {
            deps: ['jquery']
        },
    },
    exclude:[],
    include: [
        'jquery',
        'firebase',
        'bootstrap',
    ]
});
