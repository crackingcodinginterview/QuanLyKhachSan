define(function(require) {
    'use strict';
    var angular = require('angular');
    var module = angular.module('common.context.customer', []);
    service.$inject = ['$firebaseObject', '$firebaseArray'];

    function service($firebaseObject, $firebaseArray) {
        //Nội dung service ở đây
        var service = {};
        var _ref = firebase.database().ref('khachhang');
        /**
         * Lấy thông tin của một customer cụ thể. Truyền vào customerId (Id là cái firebase nó tạo ra ấy)
         * @param customerId
         * @returns {*}
         */
        function getCustomerById(customerId) {
            return $firebaseObject(_ref.child(customerId));
        }
        /**
         * Lấy toàn bộ thông tin của customer về dưới dạng mảng
         * @returns {*}
         */
        function getAllCustomer() {
            return $firebaseArray(_ref).$loaded();
        }
        /**
         * Truyền vào 1 object chứa dữ liệu thông tin của customer. Vd như { name: 'AAA', phone: 'aaaa' }
         * Nó sẽ thực hiện add customer đó vào bảng customer
         * Chú ý: Ko cần generate ra id, firebase nó sẽ tự generate cho mình. Sau khi add xong nó sẽ trả về thông tin của
         * cái customer vừa add.
         * @param customerData
         * @returns {firebase.database.ThenableReference|!firebase.database.ThenableReference}
         */
        function addNewCustomer(customerData) {
            return _ref.push(customerData);
        }

        function deleteCustomer(customerId) {
            return _ref.child(customerId.$id).remove();
        }

        function saveData(data) {
          return data.$save();
        }
        service.addNewCustomer = addNewCustomer;
        service.getCustomerById = getCustomerById;
        service.getAllCustomer = getAllCustomer;
        service.deleteCustomer = deleteCustomer;
        service.saveData = saveData;
        return service;
    }
    module.factory('CustomerService', service);
    return module.name;
});
