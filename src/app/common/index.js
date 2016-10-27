define(function (require){
    'use strict';
    var angular = require('angular');
    var angularFire = require('angularFire');

    var module = angular.module('common.index', [
        'firebase',
        require('./services/index'),
        require('./context/index'),
    ]);

    return module.name;
});