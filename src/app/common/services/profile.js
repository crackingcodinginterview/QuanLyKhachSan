define(function (require) {
    'use strict';
    var angular = require('angular');

    var module = angular.module('common.context.profile', []);

    service.$inject = ['$firebaseArray', '$firebaseObject'];
    function service($firebaseArray, $firebaseObject){
        //Nội dung service ở đây
        var service = {};
        var _ref = firebase.database().ref('profile');

        function getUserProfile(userId){
            return $firebaseObject(_ref.orderByChild('userId').equalTo(userId));
        }
        function addNewUserProfile(userData){
            return _ref.push(userData);
        }
        service.getUserProfile = getUserProfile;
        service.addNewUserProfile = addNewUserProfile;

        return service;
    }
    module.factory('ProfileService', service);

    return module.name;
});