define(function (require){
    'use strict';
    var angular = require('angular');
    var angularFire = require('angularFire');

    var module = angular.module('common.index', [
        'firebase',
        require('./services/index'),
        require('./directives/index'),
        require('./context/index'),
        require('./factories/index'),
    ]);

    return module.name;
});