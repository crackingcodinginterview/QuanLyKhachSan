define(function(require) {
    'use strict';

    var angular = require('angular');

    NewCustomerController.$inject = ['$scope', '$uibModalInstance', 'CustomerService', 'toaster', 'ajaxLoadingFactory'];

    function NewCustomerController($scope, $uibModalInstance, CustomerService, toaster, ajaxLoadingFactory) {

        //ajaxLoadingFactory.show();
        //ajaxLoadingFactory.hide();
        //toaster.pop('error', 'Note', 'Error Happened!');
        //console.log("new Customer");
        $scope.Customer = {
            name: '',
            customerType: 'Traveller',
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
        };


        $scope.ok = function() {
            if ($scope.Customer.name === '' || $scope.Customer.customerType === '' ||
                $scope.Customer.email === '' || $scope.Customer.phone === '' ||
                $scope.Customer.phone2 === '' || $scope.Customer.fax === '' ||
                $scope.Customer.address === '' || $scope.Customer.address2 === '' ||
                $scope.Customer.city === '' || $scope.Customer.region === '' ||
                $scope.Customer.country === '' || $scope.Customer.postalCode === '' ||
                $scope.Customer.creditCardCode === '' || $scope.Customer.creditCardDate === '' ||
                $scope.Customer.cvc === '' || $scope.Customer.note === '') {
                toaster.pop('error', 'Note', 'Input full information');
            } else {
                ajaxLoadingFactory.show();
                CustomerService.addNewCustomer($scope.Customer)
                    .then(function(resp) {
                        $uibModalInstance.close();
                        ajaxLoadingFactory.hide();
                        toaster.pop('success', 'Note', 'Add Customer Success!');
                        //console.log("Add Customer Success", resp);
                    })
                    .catch(function(error) {
                        toaster.pop('error', 'Note', 'Add Customer Error!');
                        //  console.log("Add Customer Error", error);
                    })
            }

        };

        $scope.changeCreditCardDate = function() {
            if ($scope.Customer.creditCardDate.length === 2)
                $scope.Customer.creditCardDate += '/'
        }



        $scope.cancel = function() {
            $uibModalInstance.close();
        }


    };

    return NewCustomerController;
});
