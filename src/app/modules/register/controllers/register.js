define(function(require){
    'use strict';

    var angular = require('angular');

    ctrlFn.$inject = ['UserService', 'UserContext', 'ProfileService', 'toaster', '$state', 'ajaxLoadingFactory', 'PropertyService', '$q', 'RoomService', 'CompanyService', 'ModelFactory'];
    function ctrlFn(UserService, UserContext, ProfileService, toaster, $state, ajaxLoadingFactory, PropertyService, $q, RoomService, CompanyService, ModelFactory){
        var vm = this;

        function initModel(){
            vm.registerForm = {
                data: angular.extend(
                    { numerRoom: '' },
                    ModelFactory.getModelData('property'),
                    ModelFactory.getModelData('user'),
                    ModelFactory.getModelData('profile')),
                $selector: null
            };
        }
        function register(registerUserViewModel){
            return UserService.register(registerUserViewModel.email, registerUserViewModel.password)
                .then(function(resp){
                    var contextData = {
                        userId: resp.uid,
                        firstName: registerUserViewModel.firstName,
                        lastName: registerUserViewModel.lastName,
                        email: registerUserViewModel.email
                    };
                    var profileData = ModelFactory.createNewModelFromSource(vm.registerForm.data, 'profile');
                    var propertyData = ModelFactory.createNewModelFromSource(vm.registerForm.data, 'property');

                    var policiesData = ModelFactory.getSampleModelData('policies');
                    var generalInformationData = ModelFactory.getSampleModelData('generalInformation');
                    var nightAuditDateData = ModelFactory.getSampleModelData('nightAuditAndDate');

                    var roomTypeData = ModelFactory.getSampleModelData('roomType');
                    var roomData = ModelFactory.getSampleModelData('room');
                    var houseKeepingData = ModelFactory.getSampleModelData('houseKeeping');

                    var promise1 = ProfileService.addNewUserProfile(resp.uid, profileData);
                    var promise2 = PropertyService.addNewProperty(resp.uid, propertyData)
                        .then(function(resp1){
                            var propertyId = resp1.getKey();
                            contextData.propertyId = propertyId;

                            var promise1 = RoomService.addRoomType(resp.uid, propertyId, roomTypeData);
                            var promise2 = RoomService.setConfig(resp.uid, propertyId, houseKeepingData);

                            var promise3 = CompanyService.setPolicies(resp.uid, propertyId, policiesData);
                            var promise4 = CompanyService.setGeneralInformation(resp.uid, propertyId, generalInformationData);
                            var promise5 = CompanyService.setNightAuditDate(resp.uid, propertyId, nightAuditDateData);

                            return $q.all([promise1, promise2, promise3, promise4, promise5])
                                .then(function(resp2){
                                    var roomTypeId = resp2[0].getKey();
                                    roomData.roomTypeId = roomTypeId;
                                    return RoomService.addRoom(resp.uid, propertyId, +registerUserViewModel.numerRoom, roomData);
                                });
                        });
                    return $q.all([promise1, promise2])
                        .then(function(){
                            return contextData;
                        });
                });
        }
        function onButtonRegister_click(){
            ajaxLoadingFactory.show();
            register(vm.registerForm.data)
                .then(function(resp){
                    UserContext.fillContext(resp);
                    toaster.pop('success', 'Note', 'Register success!');
                    ajaxLoadingFactory.hide();
                    $state.go('base3.booking');
                })
                .catch(function(error){
                    toaster.pop('error', 'Note', 'Register failed!');
                    ajaxLoadingFactory.hide();
                });
        }
        vm.onButtonRegister_click = onButtonRegister_click;

        initModel();
    }
    return ctrlFn;
});