'use strict';

require.config({
    preserveLicenseComments: false,
    generateSourceMaps: false,
    paths: {
        text: 'bower_components/requirejs-plugins/lib/text',
        async: 'bower_components/requirejs-plugins/src/async',

        bootstrap: 'empty:',

        angular: 'empty:',
        uiRouter: 'empty:',
        ngTable: 'empty:',
        angularBoostrap: 'empty:',
        angularFullcalendar: 'empty:',

        firebase: 'empty:'
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
        'vendor.angular',
    ], function() {
        require([
            'angular',
            'firebase',
            'jquery',
            'src/app'
        ], function(angular, firebase, $, app) {
            var config = {
                apiKey: "AIzaSyCgyDNyMtaTH9S_H0ri4pk5y6stGFfLzno",
                authDomain: "quanlikhachsan-5e6a3.firebaseapp.com",
                databaseURL: "https://quanlikhachsan-5e6a3.firebaseio.com",
                storageBucket: "quanlikhachsan-5e6a3.appspot.com",
                messagingSenderId: "254261538487"
            };
            firebase.initializeApp(config);
            firebase.auth().signInWithEmailAndPassword('aaaa@gmail.com', '123456').then(
                function(result){
                    result.getToken().then(function(token){
                        $rootScope.userLoginToken = token;
                    });
                }
            );


            var $html = angular.element(document.getElementsByTagName('html')[0]);
            angular.element().ready(function() {
                angular.bootstrap($html, [app.name]);
            });
        });
    });
});

