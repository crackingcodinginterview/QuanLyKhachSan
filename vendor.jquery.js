'use strict';
require.config({
    preserveLicenseComments: false,
    generateSourceMaps: false,
    waitSeconds: 30, // timeout
    paths: {
        jquery: 'bower_components/jquery/dist/jquery'
    },
    shim: {},
    exclude:[],
    include: [
        'jquery'
    ]
});
