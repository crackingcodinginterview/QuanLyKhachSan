define(function(require){
    'use strict';

    var angular = require('angular');

    ctrlFn.$inject = ['$scope'];
    function ctrlFn($scope){
        //Nội dung của controller ghi ở đây
        console.log('đang ở booking');

        var vm = this;

        function init(){
            vm.uiConfig = {
                calendar:{
                    height: 450,
                    editable: true,
                    header:{
                        left: 'month basicWeek basicDay agendaWeek agendaDay',
                        center: 'title',
                        right: 'today prev,next'
                    },
                }
            };
        }

        init();
    }

    return ctrlFn;
});