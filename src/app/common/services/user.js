define(function (require) {
    'use strict';
    var angular = require('angular');

    var module = angular.module('common.services.user', []);

    service.$inject = [];
    function service(){
        //Nội dung service ở đây
        var service = {};
        service.test = function(){
            console.log('test');
        }
        return service;
    }
    module.factory('UserService', service);

    return module.name;
});