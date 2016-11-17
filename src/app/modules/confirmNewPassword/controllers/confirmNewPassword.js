define(function(require){
    'use strict';

    var angular = require('angular');

    ctrlFn.$inject = ['$scope','UserService','$state','ajaxLoadingFactory','toaster'];
    function ctrlFn($scope, UserService, $state, ajaxLoadingFactory, toaster){
        var vm = this;
        var oobCode;

        function initModel(){
            vm.confirmNewPasswordForm = {
                data: {
                    newPassword: '',
                    rePassword: ''
                },
                $selector: null
            };

            oobCode = $state.params.oobCode;
        }
        function confirmChangePassword(confirmNewPasswordViewModel){
            return firebase.auth().confirmPasswordReset(oobCode, confirmNewPasswordViewModel.newPassword);
        }
        function onAcceptButton_Click(){
            ajaxLoadingFactory.show();
            confirmChangePassword(vm.confirmNewPasswordForm.data)
                .then(function(resp){
                    toaster.pop('success', 'Note', 'Change password success!');
                })
                .catch(function(error){
                    toaster.pop('error', 'Note', 'Something Went Wrong!');
                })
                .finally(function(resp){
                    ajaxLoadingFactory.hide();
                });
        }

        vm.onAcceptButton_Click = onAcceptButton_Click;

        initModel();
    }

    return ctrlFn;

});