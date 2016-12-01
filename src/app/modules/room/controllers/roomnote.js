define(function(require){
    'use strict';

    var angular = require('angular');
    var _ = require('lodash');

    ctrlFn.$inject = ['NgTableParams', 'RoomService', 'UserContext', '$timeout', '$state', '$uibModalInstance', 'room'];
    function ctrlFn(NgTableParams, RoomService, UserContext, $timeout, $state, $uibModalInstance, room){
        //Nội dung của controller ghi ở đây
        var vm = this;

        function initModel() {
            vm.roomNoteForm = {
                data: {},
                ui: {},
                $selector: null
            }
        }
        function ok(roomNoteForm) {
            room.note = roomNoteForm.data.note;
            $uibModalInstance.close(room);
        }
        function cancel() {
            $uibModalInstance.dismiss();
        }
        vm.ok = ok;
        vm.cancel = cancel;

        initModel();
    }
    return ctrlFn;
});