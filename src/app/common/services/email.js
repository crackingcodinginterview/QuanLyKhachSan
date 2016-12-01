define(function (require) {
    'use strict';
    var angular = require('angular');

    var module = angular.module('common.context.email', []);

    service.$inject = ['$q'];
    function service($q){
        //Nội dung service ở đây
        var service = {};
        var _ref = firebase.database().ref('khachhang');

        function setInvoiceEmail(userId, propertyId, policiesData){
            _ref = firebase.database().ref('members').child(userId).child(propertyId).child('email').child('invoiceEmail');
            return _ref.set(policiesData);
        }
        function getInvoiceEmail(userId, propertyId){
            _ref = firebase.database().ref('members').child(userId).child(propertyId).child('email').child('invoiceEmail');
            return _ref.once('value')
                .then(function(snapshot){
                    return snapshot.val();
                });
        }
        function setBookingConfirmationEmail(userId, propertyId, nightAuditDate){
            _ref = firebase.database().ref('members').child(userId).child(propertyId).child('email').child('bookingConfirmationEmail');
            return _ref.set(nightAuditDate);
        }
        function getbookingConfirmationEmail(userId, propertyId){
            _ref = firebase.database().ref('members').child(userId).child(propertyId).child('email').child('bookingConfirmationEmail');
            return _ref.once('value')
                .then(function(snapshot){
                    return snapshot.val();
                });
        }

        service.setInvoiceEmail = setInvoiceEmail;
        service.getInvoiceEmail = getInvoiceEmail;
        service.setBookingConfirmationEmail = setBookingConfirmationEmail;
        service.getbookingConfirmationEmail = getbookingConfirmationEmail;

        return service;
    }
    module.factory('EmailService', service);

    return module.name;
});
