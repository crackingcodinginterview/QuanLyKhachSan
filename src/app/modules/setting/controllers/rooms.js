define(function(require){
    'use strict';

    var angular = require('angular');

    ctrlFn.$inject = ['$scope','UserContext','$state','ajaxLoadingFactory','toaster', 'RoomService', '$timeout', '$q'];
    function ctrlFn($scope,UserContext,$state,ajaxLoadingFactory,toaster, RoomService, $timeout, $q){
        var vm = this;
        var _userInfor = UserContext.getUserInfor();

        function initModelRooms(){
            vm.houseKeepingGroup = [1, 2, 3, 4];
            vm.newRoomForm = {
                data: {},
                ui: { isShow: false },
                $selector: null
            }
        }
        function onRoomsTab_Click() {
            var promise1 = RoomService.getRoomType(_userInfor.userId, _userInfor.propertyId);
            var promise2 = RoomService.getRoom(_userInfor.userId, _userInfor.propertyId);
            return $q.all([promise1, promise2])
                .then(function(resp){
                    vm.roomType = resp[0];
                    vm.room = resp[1];
                });
        }
        
        function onSaveRoomButton_Click(newRoomForm) {
            vm.newRoomForm.ui.isShow = false;
            vm.room.$add(newRoomForm.data);
            vm.newRoomForm.data = {};
        }
        function onAddRoomButton_Click() {
            vm.newRoomForm.ui.isShow = true;
        }

        vm.onSaveRoomButton_Click = onSaveRoomButton_Click;
        vm.onAddRoomButton_Click = onAddRoomButton_Click;

        initModelRooms();
        onRoomsTab_Click();
    }

    return ctrlFn;

});