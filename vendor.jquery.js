'use strict';
require.config({
    preserveLicenseComments: false,
    generateSourceMaps: false,
    waitSeconds: 30, // timeout
    paths: {
        jquery: 'bower_components/jquery/dist/jquery',

        'firebase': 'bower_components/firebase/firebase'
    },
    shim: {
        'firebase': {
            exports: 'firebase'
        }
    },
    exclude:[],
    include: [
        'jquery',
        'firebase'
    ]
});
