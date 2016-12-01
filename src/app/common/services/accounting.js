define(function (require) {
    'use strict';
    var angular = require('angular');

    var module = angular.module('common.context.accounting', []);

    service.$inject = ['$q', '$firebaseArray'];
    function service($q, $firebaseArray){
        var service = {};
        var _ref = firebase.database().ref('khachhang');

        function setInvoice(userId, propertyId, policiesData){
            _ref = firebase.database().ref('members').child(userId).child(propertyId).child('accounting').child('invoice');
            return _ref.set(policiesData);
        }
        function getInvoice(userId, propertyId){
            _ref = firebase.database().ref('members').child(userId).child(propertyId).child('accounting').child('invoice');
            return _ref.once('value')
                .then(function(snapshot){
                    return snapshot.val();
                });
        }
        function setCustomerType(userId, propertyId, policiesData){
            _ref = firebase.database().ref('members').child(userId).child(propertyId).child('accounting').child('customerType');
            return _ref.set(policiesData);
        }
        function getCustomerType(userId, propertyId){
            _ref = firebase.database().ref('members').child(userId).child(propertyId).child('accounting').child('customerType');
            return $firebaseArray(_ref).$loaded();
        }

        service.setInvoice = setInvoice;
        service.getInvoice = getInvoice;
        service.setCustomerType = setCustomerType;
        service.getCustomerType = getCustomerType;

        return service;
    }
    module.factory('AccountingService', service);

    return module.name;
});
