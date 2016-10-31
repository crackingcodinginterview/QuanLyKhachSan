define(function (require) {
    'use strict';
    var angular = require('angular');

    var module = angular.module('common.services', [
        require('./user'),
        require('./profile'),
        require('./customer'),
        require('./subscription')
    ]);
    return module.name;
});
