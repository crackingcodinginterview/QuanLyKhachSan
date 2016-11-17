define(function (require) {
    'use strict';
    var angular = require('angular');

    var module = angular.module('common.context.property', []);

    service.$inject = ['$firebaseObject', '$firebaseArray'];
    function service($firebaseObject, $firebaseArray){
        //Nội dung service ở đây
        var service = {};
        var _ref = firebase.database().ref('Property');

        /**
         * Lấy thông tin của một property cụ thể. Truyền vào propertyId (Id là cái firebase nó tạo ra ấy)
         * @param propertyId
         * @returns {*}
         */
        function getPropertyById(propertyId){
            return $firebaseObject(_ref.child(propertyId));
        }

        /**
         * Lấy toàn bộ thông tin của property về dưới dạng mảng
         * @returns {*}
         */
        function getAllProperty(){
            return $firebaseArray(_ref).$loaded();
        }


        /**
         * Truyền vào 1 object chứa dữ liệu thông tin của property. Vd như { name: 'AAA', phone: 'aaaa' }
         * Nó sẽ thực hiện add property đó vào bảng property
         * Chú ý: Ko cần generate ra id, firebase nó sẽ tự generate cho mình. Sau khi add xong nó sẽ trả về thông tin của
         * cái property vừa add.
         * @param propertyData
         * @returns {firebase.database.ThenableReference|!firebase.database.ThenableReference}
         */
        function addNewProperty(propertyData){
            return _ref.push(propertyData);
        }
        service.addNewProperty = addNewProperty;
        service.getPropertyById = getPropertyById;
        service.getAllProperty = getAllProperty;

        return service;
    }
    module.factory('PropertyService', service);

    return module.name;
});
