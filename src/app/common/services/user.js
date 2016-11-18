define(function (require) {
    'use strict';
    var angular = require('angular');

    var module = angular.module('common.services.user', []);

    service.$inject = ['$firebaseAuth'];
    function service($firebaseAuth){
        //Nội dung service ở đây
        var service = {};

        function login(email, password){
            return $firebaseAuth().$signInWithEmailAndPassword(email, password);
        }
        function register(email, password){
            return $firebaseAuth().$createUserWithEmailAndPassword(email, password);
        }
        function resetPassword(email){
            return $firebaseAuth().$sendPasswordResetEmail(email);
        }
        function confirmChangePassword(oobCode, confirmNewPasswordViewModel){
            return firebase.auth().confirmPasswordReset(oobCode, confirmNewPasswordViewModel.newPassword);
        }

        service.login = login;
        service.register = register;
        service.resetPassword = resetPassword;
        service.confirmChangePassword = confirmChangePassword;
        return service;
    }
    module.factory('UserService', service);

    return module.name;
});