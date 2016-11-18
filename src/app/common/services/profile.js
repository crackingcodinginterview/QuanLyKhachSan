define(function (require) {
    'use strict';
    var angular = require('angular');

    var module = angular.module('common.context.profile', []);

    service.$inject = ['$firebaseObject', '$q'];
    function service($firebaseObject, $q){
        //Nội dung service ở đây
        var service = {};
        var _ref;
        var _publicProfileModel = {
            firstName: '',
            lastName: '',
            country: '',
            email: ''
        };
        var _privateProfileModel = {
            propertyName: '',
            numerRoom: 0,
            phoneNumber: ''
        };
        var _fullProfileModel = {
            propertyName: '',
            numerRoom: 0,
            phoneNumber: '',
            firstName: '',
            lastName: '',
            country: '',
            email: ''
        };

        function addPublicProfile(userId, userData){
            var newPublicProfile = {
                firstName: userData.firstName,
                lastName: userData.lastName,
                country: userData.country,
                email: userData.email
            };
            _ref = firebase.database().ref('profile/public/' + userId);
            return _ref.set(newPublicProfile);
        }
        function addPrivateProfile(userId, userData){
            var newPrivateProfile = {
                propertyName: userData.propertyName,
                numerRoom: userData.numerRoom,
                phoneNumber: userData.phoneNumber
            };
            _ref = firebase.database().ref('profile/private/' + userId);
            return _ref.set(newPrivateProfile);
        }
        function getPublicProfile(userId){
            _ref = firebase.database().ref('profile/public');
            return $firebaseObject(_ref.child(userId)).$loaded();
        }
        function getFullUserProfile(userId){
            var promise1 = $firebaseObject(firebase.database().ref('profile/public').child(userId)).$loaded();
            var promise2 = $firebaseObject(firebase.database().ref('profile/private').child(userId)).$loaded();
            return $q.all([promise1, promise2])
                .then(function(resp){
                    return {
                        propertyName: resp[1].propertyName,
                        numerRoom: resp[1].numerRoom,
                        phoneNumber: resp[1].phoneNumber,
                        firstName: resp[0].firstName,
                        lastName: resp[0].lastName,
                        country: resp[0].country,
                        email: resp[0].email
                    }
                });
        }
        function addNewUserProfile(userId, userData){
            var promise1 = addPublicProfile(userId, userData);
            var promise2 = addPrivateProfile(userId, userData);
            return $q.all([promise1, promise2]);
        }
        service.addNewUserProfile = addNewUserProfile;
        service.getPublicProfile = getPublicProfile;
        service.getFullUserProfile = getFullUserProfile;

        return service;
    }
    module.factory('ProfileService', service);

    return module.name;
});