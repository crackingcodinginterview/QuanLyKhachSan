define(function (require) {
    'use strict';
    var angular = require('angular');

    var module = angular.module('common.context.company', []);

    service.$inject = ['$q'];
    function service($q){
        //Nội dung service ở đây
        var service = {};
        var _ref = firebase.database().ref('khachhang');
        
        function setPolicies(userId, propertyId, policiesData){
            _ref = firebase.database().ref('members').child(userId).child(propertyId).child('company').child('policies');
            return _ref.set(policiesData);
        }
        function getPolicies(userId, propertyId){
            _ref = firebase.database().ref('members').child(userId).child(propertyId).child('company').child('policies');
            return _ref.once('value')
                .then(function(snapshot){
                    return snapshot.val();
                });
        }
        function setNightAuditDate(userId, propertyId, nightAuditDate){
            _ref = firebase.database().ref('members').child(userId).child(propertyId).child('company').child('nightAuditDate');
            return _ref.set(nightAuditDate);
        }
        function getNightAuditDate(userId, propertyId){
            _ref = firebase.database().ref('members').child(userId).child(propertyId).child('company').child('nightAuditDate');
            return _ref.once('value')
                .then(function(snapshot){
                    return snapshot.val();
                });
        }
        function setGeneralInformation(userId, propertyId, generalInformationData){
            _ref = firebase.database().ref('members').child(userId).child(propertyId).child('company').child('generalInformation');
            return _ref.set(generalInformationData);
        }
        function getGeneralInformation(userId, propertyId){
            _ref = firebase.database().ref('members').child(userId).child(propertyId).child('company').child('generalInformation');
            return _ref.once('value')
                .then(function(snapshot){
                    return snapshot.val();
                });
        }

        service.setPolicies = setPolicies;
        service.getPolicies = getPolicies;
        service.setGeneralInformation = setGeneralInformation;
        service.getGeneralInformation = getGeneralInformation;
        service.setNightAuditDate = setNightAuditDate;
        service.getNightAuditDate = getNightAuditDate;

        return service;
    }
    module.factory('CompanyService', service);

    return module.name;
});
