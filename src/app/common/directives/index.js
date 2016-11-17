define(function (require) {
  'use strict';
  var angular = require('angular');

  var module = angular.module('common.directives',
    [
      require('./ajaxLoading/ajaxLoading'),
    ]);

  return module.name;
});
