define(function(require){
    'use strict';

    var angular = require('angular');
    var module = angular.module('app.run', []);

    appRun.$inject = ['appConstant'];
    function appRun(appConstant){
        firebase.initializeApp(appConstant.firebaseConfig);
    }
    module.run(appRun);
    
    return module.name;
});