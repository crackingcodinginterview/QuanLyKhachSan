define(function (require){
    'use strict';
    var angular = require('angular');

    var module = angular.module('common.index', [
        require('./services/index'),
    ]);

    return module.name;
});