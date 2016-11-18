define(function (require) {
    'use strict';
    var angular = require('angular');

    var module = angular.module('common.context.user', []);

    service.$inject = ['$firebaseObject', '$firebaseAuth', '$rootScope', 'localStorageService'];
    function service($firebaseObject, $firebaseAuth, $rootScope, localStorageService){
        //Nội dung service ở đây
        var service = {};
        var _currentUser;

        function loadFirebase(){
            $firebaseAuth().$onAuthStateChanged(function(resp){
                console.log(resp);
            });
        }
        function getUserId(){
            return $firebaseAuth().$getAuth().uid;
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
            return $firebaseAuth().$signOut();
        }
        function changePassword(newPassword){
            return $firebaseAuth().$updatePassword(newPassword);
        }

        service.fillContext = fillContext;
        service.getUserId = getUserId;
        service.signOut = signOut;
        service.changePassword = changePassword;
        service.isAuth = isAuth;
        service.loadFromLocal = loadFromLocal;
        service.loadFirebase = loadFirebase;

        return service;
    }
    module.factory('UserContext', service);

    return module.name;
});