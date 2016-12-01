define(function (require) {
    'use strict';
    var angular = require('angular');

    var module = angular.module('common.factories.model', []);
    var modelListJson = require('text!../resources/modelList.json');

    factory.$inject = [];
    function factory(){
        //Nội dung service ở đây
        var factory = {};
        var _modelList = angular.fromJson(modelListJson);

        function getModelData(modelName){
            if(angular.isDefined(_modelList[modelName]))
                return angular.copy(_modelList[modelName]).data;
            return null;
        }
        function getModelValidation(modelName){
            if(angular.isDefined(_modelList[modelName]))
                return angular.copy(_modelList[modelName]).validations;
            return null;
        }
        function getSampleModelData(modelName){
            if(angular.isDefined(_modelList[modelName]))
                return angular.copy(_modelList[modelName]).sample;
            return null;
        }
        function createNewModelFromSource(srcModel, destModelName){
            var resModel = getModelData(destModelName);
            for(var prop in resModel){
                if(angular.isDefined(srcModel[prop])){
                    resModel[prop] = angular.copy(srcModel[prop]);
                }
            }
            return resModel;
        }
        factory.getModelData = getModelData;
        factory.getModelValidation = getModelValidation;
        factory.createNewModelFromSource = createNewModelFromSource;
        factory.getSampleModelData = getSampleModelData;

        return factory;
    }
    module.factory('ModelFactory', factory);

    return module.name;
});
