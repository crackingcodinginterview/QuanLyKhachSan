define(function(require) {
    'use strict';

    var angular = require('angular');

    NewCustomerController.$inject = ['$scope', '$uibModalInstance', 'CustomerService'];

    function NewCustomerController($scope, $uibModalInstance, CustomerService) {
        console.log("new Customer");
        $scope.Customer = {
            name: '',
            customerType: '',
            email: '',
            phone: '',
            phone2: '',
            fax: '',
            address: '',
            address2: '',
            city: '',
            region: '',
            country: '',
            postalCode: '',
            creditCardCode: '',
            creditCardDate: '',
            cvc: '',
            note: ''
        }


        $scope.ok = function() {
            CustomerService.addNewCustomer($scope.Customer)
                .then(function(resp) {
                    console.log("Add Customer Success", resp);
                })
                .catch(function(error) {
                    console.log("Add Customer Error", error);
                });
        }

        $scope.cancel = function() {
            this.close;
        }


    };

    return NewCustomerController;
});
