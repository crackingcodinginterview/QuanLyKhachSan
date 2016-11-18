define(function(require){
    'use strict';

    var angular = require('angular');

    ctrlFn.$inject = ['$scope', 'NgTableParams', 'moment', '$uibModal'];
    function ctrlFn($scope, NgTableParams, moment, $uibModal){
        //Nội dung của controller ghi ở đây
        var vm = this;
        var _currentOffset;
        function initModel(){
            _currentOffset = 0;
            $scope.days = getDaysOfWeekOffset(_currentOffset);
        }
        function getDaysOfWeekOffset(offset){
            var res = [];
            var monday = moment().add(offset, 'weeks').startOf('isoWeek');
            var sunday = moment().add(offset, 'weeks').endOf('isoWeek');
            var diff = sunday.diff(monday, 'days');
            res.push(monday.format('YYYY-MM-DD'));
            for(var i=0; i<diff; ++i){
                res.push(monday.add(1, 'days').format('YYYY-MM-DD'));
            }
            return res;
        }
        function onPreviousWeek_Click(){
            --_currentOffset;
            $scope.days = getDaysOfWeekOffset(_currentOffset);
        }
        function onNextWeek_Click(){
            ++_currentOffset;
            $scope.days = getDaysOfWeekOffset(_currentOffset);
        }
        function onUpdateAvailable_Click(){
            $uibModal.open({
                animation: true,
                templateUrl: 'room/templates/updateavailable.html',
                controller: 'UpdateAvailableController',
                controllerAs: 'vm',
                size: 'lg'
            });
        }

        $scope.onPreviousWeek_Click = onPreviousWeek_Click;
        $scope.onNextWeek_Click = onNextWeek_Click;
        $scope.onUpdateAvailable_Click = onUpdateAvailable_Click;

        initModel();
    }
    return ctrlFn;
});