define(function(require){
    'use strict';

    var angular = require('angular');
    var _ = require('lodash');

    ctrlFn.$inject = ['$timeout', '$uibModal', 'PropertyService', 'UserContext', 'toaster', 'ajaxLoadingFactory'];
    function ctrlFn($timeout, $uibModal, PropertyService, UserContext, toaster, ajaxLoadingFactory) {
        var vm = this;
        var _userInfor = UserContext.getUserInfor();

        function initModel() {

        }
        function onPageLoading(){
            ajaxLoadingFactory.show();
            initModel();
            PropertyService.getAllProperty(_userInfor.userId)
                .then(function(resp){
                    $timeout(function () {
                        vm.dataRoot = resp;
                        ajaxLoadingFactory.hide();
                    });
                })
        }
        function getNewProperty(){
            return $uibModal.open({
                animation: true,
                templateUrl: 'property/templates/newProperty.html',
                controller: 'NewPropertyController',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    userId: function () {
                        return _userInfor.userId;
                    }
                }
            });
        }
        function onCreateNewProperty(){
            getNewProperty().result
                .then(function(newProperty){
                    vm.dataRoot[_.keys(newProperty)[0]] = _.values(newProperty)[0];
                    toaster.pop('success', 'Note', 'Add property success!');
                })
                .catch(function (error) {
                    toaster.pop('error', 'Note', 'Add property fail!');
                });
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
            getNewCustomerModal().result.then(function() {});
        }
        vm.onCreateNewProperty = onCreateNewProperty;
        vm.onCreateNewCustomer = onCreateNewCustomer;

        onPageLoading();
    }

    return ctrlFn;
});
