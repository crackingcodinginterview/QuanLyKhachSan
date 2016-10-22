define(function (require) {
    'use strict';
    var angular = require('angular');

    var module = angular.module('common.services', [
        require('./user')
    ]);
    return module.name;
});
