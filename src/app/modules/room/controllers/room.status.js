define(function(require){
    'use strict';

    var angular = require('angular');
    var _ = require('lodash');
    var roomStatusListJson = require('text!../../../common/resources/roomStatusList.json');

    ctrlFn.$inject = ['NgTableParams', 'RoomService', 'UserContext', '$timeout', '$state', '$uibModal'];
    function ctrlFn(NgTableParams, RoomService, UserContext, $timeout, $state, $uibModal){
        //Nội dung của controller ghi ở đây
        var vm = this;
        var _userInfor = UserContext.getUserInfor();

        function initModel() {
            vm.roomStatusList = angular.fromJson(roomStatusListJson);
        }
        function onPageLoading() {
            RoomService.getRoom(_userInfor.userId, _userInfor.propertyId)
                .then(function (roomList) {
                    $timeout(function () {
                        vm.roomList = roomList;
                        vm.tableParams = new NgTableParams({}, {
                            dataset: vm.roomList || []
                        });
                    });
                });
        }
        function updateRoom(room) {
            vm.roomList.$save(room);
            $state.reload();
        }
        function onEditNoteButton_Click(room){
            $uibModal.open({
                animation: true,
                templateUrl: 'room/templates/roomnote.html',
                controller: 'RoomNoteController',
                controllerAs: 'vm',
                resolve: {
                    room: function () {
                        return room;
                    }
                }
            })
                .result
                .then(function (resp) {
                    vm.roomList.$save(room);
                    $state.reload();
                })
                .catch(function (error) {

                })
        }
        vm.updateRoom = updateRoom;
        vm.onEditNoteButton_Click = onEditNoteButton_Click;

        initModel();
        onPageLoading();
    }
    return ctrlFn;
});