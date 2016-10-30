define(function (require) {
    'use strict';
    var angular = require('angular');

    var module = angular.module('common.context.user', []);

    service.$inject = ['$firebaseArray', '$firebaseObject'];
    function service($firebaseArray, $firebaseObject){
        //Nội dung service ở đây
        var service = {};
        var _currentUser;

        function getUserId(){
            return _currentUser.uid;
        }
        function isAuth(){
            return angular.isString(_currentUser.uid);
        }
        function fillContext(currentUser){
            _currentUser = currentUser;
        }
        function signOut(){
            return _currentUser.$signOut();
        }
        function changePassword(newPassword){
            return _currentUser.$updatePassword(newPassword);
        }

        service.fillContext = fillContext;
        service.getUserId = getUserId;
        service.signOut = signOut;
        service.changePassword = changePassword;
        return service;
    }
    module.factory('UserContext', service);

    return module.name;
});