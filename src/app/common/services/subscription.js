define(function (require) {
    'use strict';
    var angular = require('angular');

    var module = angular.module('common.context.member', []);

    service.$inject = ['$firebaseObject'];
    function service($firebaseObject){
        //Nội dung service ở đây
        var service = {};
        var _ref = firebase.database().ref('thanhvien');

        /**
         * Lấy thông tin của một customer cụ thể. Truyền vào customerId (Id là cái firebase nó tạo ra ấy)
         * @param customerId
         * @returns {*}
         */

        /**
         * Lấy toàn bộ thông tin của customer về dưới dạng mảng
         * @returns {*}
         */
        function getMember(){
            return $firebaseObject(_ref).$loaded();
        }

        function saveData(data) {
          return data.$save();
        }
        /**
         * Truyền vào 1 object chứa dữ liệu thông tin của customer. Vd như { name: 'AAA', phone: 'aaaa' }
         * Nó sẽ thực hiện add customer đó vào bảng customer
         * Chú ý: Ko cần generate ra id, firebase nó sẽ tự generate cho mình. Sau khi add xong nó sẽ trả về thông tin của
         * cái customer vừa add.
         * @param customerData
         * @returns {firebase.database.ThenableReference|!firebase.database.ThenableReference}
         */

        service.getMember = getMember;
        service.saveData = saveData;

        return service;
    }
    module.factory('MemberService', service);

    return module.name;
});
