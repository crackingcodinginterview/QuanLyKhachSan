define(function(require){
    'use strict';

    var angular = require('angular');
       
    ctrlFn.$inject = ['$scope', '$state', 'UserContext', 'toaster'];
    function ctrlFn($scope, $state, UserContext, toaster){
        var vm = this;

        function onLogoutButton_Click(){
            UserContext.signOut();
            toaster.pop('success', 'Note', 'Signout success!');
            $state.go('base2.login');
        }

        vm.onLogoutButton_Click = onLogoutButton_Click;
    }

    return ctrlFn;

});