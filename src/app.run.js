define(function(require){
    'use strict';

    var angular = require('angular');
    var module = angular.module('app.run', []);

    appRun.$inject = ['appConstant', '$rootScope', '$state', 'toaster', 'UserContext', 'ajaxLoadingFactory', '$timeout'];
    function appRun(appConstant, $rootScope, $state, toaster, UserContext, ajaxLoadingFactory, $timeout){
        function stateChangeStartFn(event, toState, toParams, fromState, fromParams) {
            ajaxLoadingFactory.show();
            var isAuth = UserContext.isAuth();
            if(toState.authorization && !isAuth){
                $timeout(function(){
                    ajaxLoadingFactory.hide();
                    $state.go('base2.login');
                });
                toaster.pop('error', 'Note', 'You need to signin!');
            }
            else if(!toState.authorization && isAuth){
                $timeout(function(){
                    ajaxLoadingFactory.hide();
                    $state.go('base3.booking');
                });
                toaster.pop('success', 'Note', 'You already signin!');
            }
        }
        function stateChangeSuccessFn(event, toState, toParams, fromState, fromParams) {
            $timeout(function(){
                ajaxLoadingFactory.hide();
            }, 1000);
        }
        $rootScope.$on('$stateChangeStart', stateChangeStartFn);
        $rootScope.$on('$stateChangeSuccess', stateChangeSuccessFn);

        firebase.initializeApp(appConstant.firebaseConfig);
        UserContext.loadFromLocal();
        UserContext.loadFirebase();
    }
    module.run(appRun);
    
    return module.name;
});