define(function (require) {
    'use strict';
    var angular = require('angular');

    var module = angular.module('common.context.room', []);
    var _ = require('lodash');
    service.$inject = ['$q', '$firebaseArray'];
    function service($q, $firebaseArray){
        //Nội dung service ở đây
        var service = {};
        var _ref = firebase.database().ref('Property');

        function getRoomStatus(){
            _ref = firebase.database().ref('roomStatus');
            return _ref.once('value')
                .then(function(snapshot){
                    return snapshot.val();
                });
        }
        function getConfig(userId, propertyId){
            _ref = firebase.database().ref('members').child(userId).child(propertyId).child('room').child('config');
            return _ref.once('value')
                .then(function(snapshot){
                    return snapshot.val();
                });
        }
        function setConfig(userId, propertyId, configData){
            _ref = firebase.database().ref('members').child(userId).child(propertyId).child('room').child('config');
            return _ref.set(configData);
        }
        function addRoomType(userId, propertyId, roomTypeData){
            _ref = firebase.database().ref('members').child(userId).child(propertyId).child('room').child('type');
            return _ref.push(roomTypeData);
        }
        function getRoomType(userId, propertyId){
            _ref = firebase.database().ref('members').child(userId).child(propertyId).child('room').child('type');
            return _ref.once('value')
                .then(function(snapshot){
                    return snapshot.val();
                });
        }
        function addRoom(userId, propertyId, numberRoom, roomData){
            _ref = firebase.database().ref('members').child(userId).child(propertyId).child('room').child('myRoom');
            var rooms = {};
            for(var i=0; i<numberRoom; ++i){
                var newKey = _ref.push().getKey();
                rooms[newKey] = roomData;
            }
            return _ref.update(rooms);
        }
        function getRoom(userId, propertyId){
            _ref = firebase.database().ref('members').child(userId).child(propertyId).child('room').child('myRoom');
            return $firebaseArray(_ref).$loaded();
            // return _ref.once('value')
            //     .then(function(snapshot){
            //         return snapshot.val();
            //     });
        }
        function updateRoom(userId, propertyId, roomId, roomData){
            _ref = firebase.database().ref('members').child(userId).child(propertyId).child('room').child('myRoom').child(roomId);
            return _ref.update(roomData);
        }

        service.getConfig = getConfig;
        service.setConfig = setConfig;
        service.addRoomType = addRoomType;
        service.getRoomType = getRoomType;
        service.addRoom = addRoom;
        service.getRoom = getRoom;
        service.getRoomStatus = getRoomStatus;
        service.updateRoom = updateRoom;

        return service;
    }
    module.factory('RoomService', service);

    return module.name;
});
