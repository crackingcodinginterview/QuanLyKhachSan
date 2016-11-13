define(function(require){
    'use strict';

    var angular = require('angular');
    var module = angular.module('app.room', []);
    var template = require('text!./templates/room.html');
    var statusTemplate = require('text!./templates/room.status.html');
    var inventoryTemplate = require('text!./templates/room.inventory.html');
    var updateAvailableTemplate = require('text!./templates/updateavailable.html');
    var tabTemplate = require('text!./templates/inventory.tab.html');
    var controller = require('./controllers/room');
    var statusController = require('./controllers/room.status');
    var inventoryController = require('./controllers/room.inventory');
    var updateAvailableController = require('./controllers/updateavailable');

    //Đăng kí controller
    module.controller('RoomController', controller);
    module.controller('StatusController', statusController);
    module.controller('InventoryController', inventoryController);
    module.controller('UpdateAvailableController', updateAvailableController);

    run.$inject = ['$templateCache'];
    function run($templateCache){
        $templateCache.put('room/templates/room.html', template);
        $templateCache.put('room/templates/room.status.html', statusTemplate);
        $templateCache.put('room/templates/room.inventory.html', inventoryTemplate);
        $templateCache.put('room/templates/inventory.tab.html', tabTemplate);
        $templateCache.put('room/templates/updateavailable.html', updateAvailableTemplate);
    }
    module.run(run);

    config.$inject = ['$stateProvider'];
    function config($stateProvider){
        $stateProvider.
            state('base3.room', {
                url: '',
                abstract: true,
                views: {
                    'base3': {
                        templateUrl: 'room/templates/room.html',
                        controller: 'RoomController'
                    }
                }
            })
            .state('base3.room.status', {
                url: '/room',
                views: {
                    'room': {
                        templateUrl: 'room/templates/room.status.html',
                        controller: 'StatusController'
                    }
                }
            })
            .state('base3.room.inventory', {
                url: '/room/inventory',
                views: {
                    'room': {
                        templateUrl: 'room/templates/room.inventory.html',
                        controller: 'InventoryController'
                    }
                }
            });
    }
    module.config(config);

    return module.name;
});