define(function (require) {
    'use strict';
    var angular = require('angular');

    var module = angular.module('common.context.profile', []);

    service.$inject = ['$q'];
    function service($q){
        //Nội dung service ở đây
        var service = {};
        var _ref;
        function getUserProfile(userId){
            _ref = firebase.database().ref('members').child(userId).child('info');
            return _ref.once('value')
                .then(function(snapshot){
                    return snapshot.val();
                });
        }
        function addNewUserProfile(userId, profileData){
            _ref = firebase.database().ref('members').child(userId).child('info');
            return _ref.set(profileData);
        }
        service.addNewUserProfile = addNewUserProfile;
        service.getUserProfile = getUserProfile;

        return service;
    }
    module.factory('ProfileService', service);

    return module.name;
});