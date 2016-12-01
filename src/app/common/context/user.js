define(function (require) {
    'use strict';
    var angular = require('angular');

    var module = angular.module('common.context.user', []);

    service.$inject = ['$rootScope', 'localStorageService'];
    function service($rootScope, localStorageService){
        //Nội dung service ở đây
        var service = {};
        var _currentUser;

        function getUserInfor(){
            return _currentUser;
        }
        function isAuth(){
            return !!_currentUser;
        }
        function loadFromLocal(){
            var data = localStorageService.get('userInfor');
            if(data){
                _currentUser = data;
                $rootScope.currentUser = data;
            }
        }
        function fillContext(userData){
            _currentUser = userData;
            $rootScope.currentUser = userData;
            localStorageService.set('userInfor', userData);
        }
        function clearContext(){
            _currentUser = null;
            $rootScope.currentUser = null;
            localStorageService.remove('userInfor');
        }
        function signOut(){
            clearContext();
            return firebase.auth().signOut();
        }
        function changePassword(newPassword){
            return firebase.auth().currentUser.updatePassword(newPassword);
        }

        service.fillContext = fillContext;
        service.getUserInfor = getUserInfor;
        service.signOut = signOut;
        service.changePassword = changePassword;
        service.isAuth = isAuth;
        service.loadFromLocal = loadFromLocal;

        return service;
    }
    module.factory('UserContext', service);

    return module.name;
});