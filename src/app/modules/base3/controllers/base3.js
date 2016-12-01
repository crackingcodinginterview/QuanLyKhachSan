define(function(require){
    'use strict';

    var angular = require('angular');

    ctrlFn.$inject = ['$state', 'UserContext', 'toaster'];
    function ctrlFn($state, UserContext, toaster){
        var vm = this;

        function onLogoutButton_Click(){
            UserContext.signOut()
                .then(function(resp){
                    toaster.pop('success', 'Note', 'Signout success!');
                    $state.go('base2.login');
                })
                .catch(function (error) {
                    toaster.pop('error', 'Note', 'Signout fail!');
                })
        }

        vm.onLogoutButton_Click = onLogoutButton_Click;
    }

    return ctrlFn;

});