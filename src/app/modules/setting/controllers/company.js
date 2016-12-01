define(function(require){
    'use strict';

    var angular = require('angular');
    var _ = require('lodash');
    var currencyListJson = require('text!../../../common/resources/currencyList.json');
    var timezoneListJson = require('text!../../../common/resources/timezoneList.json');
    var countryListJson = require('text!../../../common/resources/countryList.json');
    var regionListJson = require('text!../../../common/resources/regionList.json');
    var nightAuditAutoRuntimeJson = require('text!../../../common/resources/nightAuditAutoRuntimeList.json');
    var roomChargeTypeJson = require('text!../../../common/resources/roomChargeTypeList.json');

    ctrlFn.$inject = ['ajaxLoadingFactory', 'toaster', 'CompanyService', 'UserContext', 'ModelFactory', 'moment', 'RoomService', '$q'];
    function ctrlFn(ajaxLoadingFactory, toaster, CompanyService, UserContext, ModelFactory, moment, RoomService, $q){
        var vm = this;
        var _userInfor = UserContext.getUserInfor();

        function initModelGeneralInformation(){
            vm.generalInformationForm = {
                data: angular.extend(
                    {},
                    ModelFactory.getModelData('generalInformation')
                ),
                ui: {},
                $selector: null
            };

            vm.currencyList = angular.fromJson(currencyListJson);
            vm.timezoneList = angular.fromJson(timezoneListJson);
            vm.countryList = angular.fromJson(countryListJson);
            vm.regionList = angular.fromJson(regionListJson);
        }
        function initModelPolicies(){
            vm.policiesForm = {
                data: ModelFactory.getModelData('policies'),
                ui: {},
                $selector: null
            };
        }
        function initModelNightAuditdate(){
            vm.nightAuditDateForm = {
                data: ModelFactory.getModelData('nightAuditAndDate'),
                ui: {},
                $selector: null
            };
            vm.nightAuditAutoRuntimeList = angular.fromJson(nightAuditAutoRuntimeJson);
            vm.roomChargeTypeList = angular.fromJson(roomChargeTypeJson);
        }
        function onGeneralInformationTab_Click(){
            ajaxLoadingFactory.show();
            initModelGeneralInformation();
            var promise1 = RoomService.getRoom(_userInfor.userId, _userInfor.propertyId);
            var promise2 = CompanyService.getGeneralInformation(_userInfor.userId, _userInfor.propertyId);
            $q.all([promise1, promise2])
                .then(function(resp){
                    vm.generalInformationForm.data = resp[1];
                    var gmt = _.find(vm.timezoneList, { id: vm.generalInformationForm.data.timeZone }).name.match(/([0-9]+)/i)[1];
                    vm.generalInformationForm.data.numberOfRooms = _.values(resp[0]).length;
                    vm.generalInformationForm.data.currentTime = moment().utcOffset(+gmt);
                    ajaxLoadingFactory.hide();
                })
                .catch(function(error){
                    ajaxLoadingFactory.hide();
                });
        }
        function onPoliciesTab_Click(){
            ajaxLoadingFactory.show();
            initModelPolicies();
            CompanyService.getPolicies(_userInfor.userId, _userInfor.propertyId)
                .then(function(resp){
                    vm.policiesForm.data = resp;
                    ajaxLoadingFactory.hide();
                })
                .catch(function(error){
                    ajaxLoadingFactory.hide();
                });
        }
        function onNightAuditDateTab_Click(){
            ajaxLoadingFactory.show();
            initModelNightAuditdate();
            CompanyService.getNightAuditDate(_userInfor.userId, _userInfor.propertyId)
                .then(function(resp){
                    vm.nightAuditDateForm.data = resp;
                    ajaxLoadingFactory.hide();
                })
                .catch(function(error){
                    ajaxLoadingFactory.hide();
                });
        }
        function onGeneralInformationUpdateButton_Click(){
            ajaxLoadingFactory.show();
            var generalInformationData = ModelFactory.createNewModelFromSource(vm.generalInformationForm.data, 'generalInformation');
            CompanyService.setGeneralInformation(_userInfor.userId, _userInfor.propertyId, generalInformationData)
                .then(function(resp){
                    toaster.pop('success', 'Note', 'Update generalinformation success!');
                    ajaxLoadingFactory.hide();
                })
                .catch(function(error){
                    toaster.pop('error', 'Note', 'Update generalinformation fail!');
                    ajaxLoadingFactory.hide();
                });
        }
        function onPoliciesUpdateButton_Click(){
            ajaxLoadingFactory.show();
            var policiesModel = ModelFactory.createNewModelFromSource(vm.policiesForm.data, 'policies');
            CompanyService.setPolicies(_userInfor.userId, _userInfor.propertyId, policiesModel)
                .then(function(resp){
                    toaster.pop('success', 'Note', 'Update policies success!');
                    ajaxLoadingFactory.hide();
                })
                .catch(function(error){
                    toaster.pop('error', 'Note', 'Update policies fail!');
                    ajaxLoadingFactory.hide();
                });
        }
        function onNightAuditDateUpdateButton_Click(){
            ajaxLoadingFactory.show();
            var nightAuditDateDataModel = ModelFactory.createNewModelFromSource(vm.nightAuditDateForm.data, 'nightAuditAndDate');
            CompanyService.setNightAuditDate(_userInfor.userId, _userInfor.propertyId, nightAuditDateDataModel)
                .then(function(resp){
                    toaster.pop('success', 'Note', 'Update nightAuditDateDataModel success!');
                    ajaxLoadingFactory.hide();
                })
                .catch(function(error){
                    toaster.pop('error', 'Note', 'Update nightAuditDateDataModel fail!');
                    ajaxLoadingFactory.hide();
                });
        }

        vm.onGeneralInformationTab_Click = onGeneralInformationTab_Click;
        vm.onPoliciesTab_Click = onPoliciesTab_Click;
        vm.onNightAuditDateTab_Click = onNightAuditDateTab_Click;
        vm.onPoliciesUpdateButton_Click = onPoliciesUpdateButton_Click;
        vm.onGeneralInformationUpdateButton_Click = onGeneralInformationUpdateButton_Click;
        vm.onNightAuditDateUpdateButton_Click = onNightAuditDateUpdateButton_Click;

        onGeneralInformationTab_Click();
    }

    return ctrlFn;
});