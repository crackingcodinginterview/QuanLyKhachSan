define(function(require) {
    'use strict';

    var angular = require('angular');
    var _ = require('lodash');
    var regionListJson = require('text!../../../common/resources/regionList.json');
    var pricingListJson = require('text!../../../common/resources/pricingList.json');

    ctrlFn.$inject = ['toaster', 'ajaxLoadingFactory', 'UserContext', 'PropertyService', 'ModelFactory', 'RoomService', '$q'];
    function ctrlFn(toaster, ajaxLoadingFactory, UserContext, PropertyService, ModelFactory, RoomService, $q) {
        //Nội dung của controller ghi ở đây
        var vm = this;
        var _userInfor = UserContext.getUserInfor();

        function initModel() {
            vm.subscriptionForm = {
                data: angular.extend(
                    { other: {} },
                    { property: ModelFactory.getModelData('property')}
                ),
                ui: {},
                $selector: null
            };
            vm.regionList = angular.fromJson(regionListJson);
            vm.pricingList = angular.fromJson(pricingListJson);
        }
        function onPageLoading() {
            ajaxLoadingFactory.show();
            var promise1 = PropertyService.getPropertyById(_userInfor.userId, _userInfor.propertyId);
            var promise2 = RoomService.getRoom(_userInfor.userId, _userInfor.propertyId);
            $q.all([promise1, promise2])
                .then(function (resp) {
                    vm.subscriptionForm.data.property = resp[0];
                    vm.subscriptionForm.data.other.numberOfRooms = resp[1].length;
                    ajaxLoadingFactory.hide();
                })
                .catch(function (error) {
                    ajaxLoadingFactory.hide();
                })
        }
        function ok(subscriptionForm) {
            ajaxLoadingFactory.show();
            PropertyService.updateProperty(_userInfor.userId, _userInfor.propertyId, subscriptionForm.data.property)
                .then(function (resp) {
                    toaster.pop('success', 'Note', 'Update subscription success!');
                    ajaxLoadingFactory.hide();
                })
                .catch(function (error) {
                    toaster.pop('error', 'Note', 'Update subscription fail!');
                    ajaxLoadingFactory.hide();
                })
        }
        vm.ok = ok;

        initModel();
        onPageLoading();
    }
    return ctrlFn;
});
