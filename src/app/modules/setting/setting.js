define(function(require){
    'use strict';

    var angular = require('angular');
    var module = angular.module('app.setting', []);
    var template = require('text!./templates/setting.html');

    var companyTemplate = require('text!./templates/company.html');
    var generalInfomationTemplate = require('text!./templates/company/generalinfomation.html');
    var employeesTemplate = require('text!./templates/company/employees.html');
    var nightAuditDateTemplate = require('text!./templates/company/nightauditdate.html');
    var policiesTemplate = require('text!./templates/company/policies.html');

    var roomsTemplate = require('text!./templates/rooms.html');
    var roomTemplate = require('text!./templates/rooms/room.html');
    var houseKeepingTemplate = require('text!./templates/rooms/housekeeping.html');
    var houseTypeTemplate = require('text!./templates/rooms/roomtype.html');

    var controller = require('./controllers/setting');
    var companyController = require('./controllers/company');

    //Đăng kí controller
    module.controller('SettingController', controller);
    module.controller('CompanyController', companyController);

    run.$inject = ['$templateCache'];
    function run($templateCache){
        $templateCache.put('setting/templates/setting.html', template);

        $templateCache.put('setting/templates/company.html', companyTemplate);
        $templateCache.put('setting/templates/company/generalinfomation.html', generalInfomationTemplate);
        $templateCache.put('setting/templates/company/employees.html', employeesTemplate);
        $templateCache.put('setting/templates/company/nightauditdate.html', nightAuditDateTemplate);
        $templateCache.put('setting/templates/company/policies.html', policiesTemplate);

        $templateCache.put('setting/templates/rooms.html', roomsTemplate);
        $templateCache.put('setting/templates/rooms/room.html', roomTemplate);
        $templateCache.put('setting/templates/rooms/housekeeping.html', houseKeepingTemplate);
        $templateCache.put('setting/templates/rooms/roomtype.html', houseTypeTemplate);
    }
    module.run(run);

    config.$inject = ['$stateProvider'];
    function config($stateProvider){
        $stateProvider
            .state('base3.setting', {
                url: '',
                abstract: true,
                views: {
                    'base3': {
                        templateUrl: 'setting/templates/setting.html',
                    }
                }
            })
            .state('base3.setting.company', {
                url: '/settings/company',
                authorization: true,
                views: {
                    'setting': {
                        templateUrl: 'setting/templates/company.html',
                        controller: 'CompanyController'
                    }
                }
            })
            .state('base3.setting.rooms', {
                url: '/settings/room_inventory',
                authorization: true,
                views: {
                    'setting': {
                        templateUrl: 'setting/templates/rooms.html',
                        controller: 'CompanyController'
                    }
                }
            });
    }
    module.config(config);

    return module.name;
});