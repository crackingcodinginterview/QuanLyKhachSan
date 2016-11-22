define(function(require){
    'use strict';

    var angular = require('angular');

    ctrlFn.$inject = ['$scope', 'NgTableParams', '$uibModal', 'PropertyService', 'toaster', 'ajaxLoadingFactory'];
    function ctrlFn($scope, NgTableParams, $uibModal, PropertyService, toaster, ajaxLoadingFactory) {
        var vm = this;
        //Nội dung của controller ghi ở đây
        console.log('đang ở property');

        function getNewProperty(){
            return $uibModal.open({
                animation: true,
                templateUrl: 'property/templates/newProperty.html',
                controller: 'NewPropertyController',
                controllerAs: 'vm',
                size: 'lg'
            });
        }
        function onCreateNewProperty(){
            getNewProperty().result.then(function(success){
                toaster.pop('success', 'Note', 'Login success!');
                debugger;
            }, function (err) {
              toaster.pop('error', 'Note', 'Error Happened!');
              console.log(err);
            });
        }

        vm.onCreateNewProperty = onCreateNewProperty;

        var vm = this;
        $scope.dataRoot = [];
        function init() {
            PropertyService.getAllProperty()
                .then(function(resp){
                    $scope.dataRoot = resp;
                    console.log("Get all customer success", resp);
                })
                .catch(function(error) {
                    console.log("Get all customer error", error);
                });;
        }

        function getNewCustomerModal() {
            return $uibModal.open({
                animation: true,
                templateUrl: 'accounting/templates/newCustomer.html',
                controller: 'NewCustomerController',
                controllerAs: 'vm',
            });
        }
        function onCreateNewCustomer() {
            getNewCustomerModal().result.then(function() {
              ajaxLoadingFactory.show();
            });
        }
        vm.onCreateNewCustomer = onCreateNewCustomer;

        init();
    }

    return ctrlFn;
});
