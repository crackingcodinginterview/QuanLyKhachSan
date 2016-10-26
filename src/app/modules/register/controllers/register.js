define(function(require){
    'use strict';

    var angular = require('angular');

    ctrlFn.$inject = ['$scope', '$firebaseArray', '$firebaseObject'];
    function ctrlFn($scope, $firebaseArray, $firebaseObject){
        //Nội dung của controller ghi ở đây
        console.log('đang ở register');

        var ref = firebase.database().ref();
        $scope.data = $firebaseObject(ref);
        $scope.data.$loaded()
            .then(function() {
                console.log($scope.data);
            })
            .catch(function(err) {
                console.error(err);
            });
    }
    return ctrlFn;
});