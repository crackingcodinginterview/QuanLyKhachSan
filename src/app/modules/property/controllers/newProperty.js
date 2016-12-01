define(function(require){
    'use strict';

    var angular = require('angular');
    var regionListJson = require('text!../../../common/resources/regionList.json');
    var pricingListJson = require('text!../../../common/resources/pricingList.json');

    NewPropertyController.$inject = ['$scope', '$uibModalInstance', 'PropertyService', 'userId'];
    function NewPropertyController($scope, $uibModalInstance, PropertyService, userId){
        var _userId = userId;
        var vm = this;
        function initModel() {
            vm.newPropertyForm = {
                data: {},
                ui: {},
                $selector: null
            };
            vm.regionList = angular.fromJson(regionListJson);
            vm.pricingList = angular.fromJson(pricingListJson);
        }
        function ok(newPropertyForm) {
            PropertyService.addNewProperty(_userId, newPropertyForm.data.property)
                .then(function(resp) {
                    var newProperty = {};
                    newProperty[resp.getKey()] = newPropertyForm.data.property;
                    $uibModalInstance.close(newProperty);
                })
        }
        function cancel() {
            $uibModalInstance.dismiss();
        }
        vm.ok = ok;
        vm.cancel = cancel;

        initModel();
    }

    return NewPropertyController;
});
