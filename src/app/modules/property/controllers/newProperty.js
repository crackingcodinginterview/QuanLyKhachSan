define(function(require){
    'use strict';

    var angular = require('angular');

    NewPropertyController.$inject = ['$scope', '$uibModalInstance', 'PropertyService'];
    function NewPropertyController($scope, $uibModalInstance, PropertyService){
      $scope.property;
        $scope.ok = function (propert) {
          PropertyService.addNewProperty($scope.property)
              .then(function(resp) {
                  console.log("Add property Success", resp);
                  this.close;
              })
              .catch(function(error) {
                  console.log("Add property Error", error);
              });
        }

                $scope.cancel = function() {
                    this.close;
                }
    }

    return NewPropertyController;
});
