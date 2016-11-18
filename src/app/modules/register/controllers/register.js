define(function(require){
    'use strict';

    var angular = require('angular');

    ctrlFn.$inject = ['$scope', 'UserService', 'UserContext', 'ProfileService', 'toaster', '$state', 'ajaxLoadingFactory'];
    function ctrlFn($scope, UserService, UserContext, ProfileService, toaster, $state, ajaxLoadingFactory){
        //Nội dung của controller ghi ở đây
        var vm = this;

        /**
         * function for assign default value for scope
         */
        function initModel(){
            vm.registerForm = {
                data: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    propertyName: '',
                    numerRoom: '',
                    phoneNumber: '',
                    country: '0'
                },
                $selector: null
            }
        }
        function register(registerUserViewModel){
            return UserService.register(registerUserViewModel.email, registerUserViewModel.password)
                .then(function(resp){
                    return ProfileService.addNewUserProfile(resp.uid, {
                        propertyName: registerUserViewModel.propertyName,
                        numerRoom: registerUserViewModel.numerRoom,
                        phoneNumber: registerUserViewModel.phoneNumber,
                        firstName: registerUserViewModel.firstName,
                        lastName: registerUserViewModel.lastName,
                        country: registerUserViewModel.country,
                        email: registerUserViewModel.email
                    })
                        .then(function(resp1){
                            return {
                                propertyName: registerUserViewModel.propertyName,
                                numerRoom: registerUserViewModel.numerRoom,
                                phoneNumber: registerUserViewModel.phoneNumber,
                                firstName: registerUserViewModel.firstName,
                                lastName: registerUserViewModel.lastName,
                                country: registerUserViewModel.country,
                                email: registerUserViewModel.email
                            };
                        });
                });
        }
        function onButtonRegister_click(){
            ajaxLoadingFactory.show();
            register(vm.registerForm.data)
                .then(function(resp){
                    UserContext.fillContext(resp);
                    toaster.pop('success', 'Note', 'Register success!');
                    $state.go('base3.booking');
                })
                .catch(function(error){
                    toaster.pop('error', 'Note', 'Register failed!');
                })
                .finally(function(resp){
                    ajaxLoadingFactory.hide();
                });
        }

        /*
         assign public function to scope
         */
        vm.onButtonRegister_click = onButtonRegister_click;

        /*
         call function
         */
        initModel();
    }
    return ctrlFn;
});