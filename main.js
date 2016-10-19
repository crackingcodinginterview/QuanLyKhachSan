'use strict';

require.config({
    preserveLicenseComments: false,
    generateSourceMaps: false,
    paths: {
        text: 'bower_components/requirejs-plugins/lib/text',
        async: 'bower_components/requirejs-plugins/src/async',

        angular: 'empty:',
        uiRouter: 'empty:'
    },

    shim: {},
    exclude: [
        'text',
        'async',
        './vendor.jquery',
        './vendor.angular'
    ],
    include: []
});

require([
    'vendor.jquery'
], function() {
    require([
        'vendor.angular'
    ], function() {
        require([
            'angular',
            'src/app'
        ], function(angular, app) {
            var $html = angular.element(document.getElementsByTagName('html')[0]);
            angular.element().ready(function() {
                angular.bootstrap($html, [app.name]);
            });
        });
    });
});

