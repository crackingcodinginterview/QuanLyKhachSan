define(function (require) {
    'use strict';
    var angular = require('angular');

    var module = angular.module('common.context.user', []);

    service.$inject = ['$firebaseArray', '$firebaseObject', '$firebaseAuth'];
    function service($firebaseArray, $firebaseObject, $firebaseAuth){
        //Nội dung service ở đây
        var service = {};

        function getUserId(){
            return $firebaseAuth().$getAuth().uid;
        }
        function isAuth(){
            return $firebaseAuth().$getAuth();
        }
        function signOut(){
            return $firebaseAuth().$signOut();
        }
        function changePassword(newPassword){
            return $firebaseAuth().$updatePassword(newPassword);
        }

        service.getUserId = getUserId;
        service.signOut = signOut;
        service.changePassword = changePassword;
        return service;
    }
    module.factory('UserContext', service);

    return module.name;
});