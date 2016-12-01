define(function (require) {
    'use strict';
    var angular = require('angular');

    var module = angular.module('common.context.property', []);

    service.$inject = ['$firebaseObject', '$firebaseArray'];
    function service($firebaseObject, $firebaseArray){
        //Nội dung service ở đây
        var service = {};
        var _ref = firebase.database().ref('Property');

        function getPropertyById(userId, propertyId){
            _ref = firebase.database().ref('members').child(userId).child('properties').child(propertyId);
            return _ref.once('value')
                .then(function(snapshot){
                    return snapshot.val();
                });
        }
        function getAllProperty(userId){
            _ref = firebase.database().ref('members').child(userId).child('properties');
            return _ref.once('value')
                .then(function(snapshot){
                    return snapshot.val();
                });
        }
        function addNewProperty(userId, propertyData){
            _ref = firebase.database().ref('members').child(userId).child('properties');
            return _ref.push(propertyData);
        }
        function updateProperty(userId, propertyId, propertyData) {
            _ref = firebase.database().ref('members').child(userId).child('properties').child(propertyId);
            return _ref.update(propertyData);
        }

        service.addNewProperty = addNewProperty;
        service.getPropertyById = getPropertyById;
        service.getAllProperty = getAllProperty;
        service.updateProperty = updateProperty;

        return service;
    }
    module.factory('PropertyService', service);

    return module.name;
});
