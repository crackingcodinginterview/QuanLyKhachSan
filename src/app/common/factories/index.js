define(function (require) {
    'use strict';
    var angular = require('angular');

    var module = angular.module('common.factories', [
        require('./model'),
    ]);
    return module.name;
});
