define(function (require) {
    'use strict';
    var angular = require('angular');

    var module = angular.module('common.services', [
        require('./user'),
        require('./profile'),
        require('./customer'),
        require('./subscription'),
        require('./property'),
        require('./room'),
        require('./company'),
        require('./email'),
        require('./accounting')
    ]);
    return module.name;
});
