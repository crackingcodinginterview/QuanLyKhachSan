define(function(require) {
  'use strict';
  var angular = require('angular'),
      tpl = require('text!./templates/ajaxLoading.html');

  var module = angular.module('common.directives.ajaxLoading', []);

  module.run([
    '$templateCache',
    function($templateCache) {
      $templateCache.put('ajaxLoadingTemplate', tpl);
    }]);

  module.factory('ajaxLoadingFactory', [
    '$rootScope',
    function($rootScope) {
      var services = {};

      /**
       * Show ajax loader
       */
      function show() {
        $rootScope.$broadcast('ajaxLoading.show');
      }

      /**
       * Hide ajax loader
       */
      function hide() {
        $rootScope.$broadcast('ajaxLoading.hide');
      }

      /**
       * Clear counter and hide ajax loader
       */
      function clear() {
        $rootScope.$broadcast('ajaxLoading.clear');
      }

      /**
       * Don't show ajax loader on the next request
       */
      function hideNextRequestLoader() {
        services.nextRequestLoader = false;
      }

      /**
       * Set next request options
       * @param options
       */
      function nextRequestLoaderOptions(options) {
        services.nextRequestLoader = options.nextRequestLoader;
      }

      services.nextRequestLoader = true;

      services.show = show;

      services.hide = hide;

      services.clear = clear;

      services.hideNextRequestLoader = hideNextRequestLoader;

      services.nextRequestLoaderOptions = nextRequestLoaderOptions;

      return services;
    }]);

  module.directive('ajaxLoading', [
    '$timeout',
    'ajaxLoadingFactory',
    function($timeout,
             ajaxLoadingFactory) {
      var downloadPatternStrReq = ['download', 'exportreport'];

      /**
       * Ajax loading link function
       * @param scope
       * @param elem
       * @param attrs
       */
      function ajaxLoadingLinkFn(scope, elem, attrs) {
        var $element = elem.children('.overlay-layer'), timer, count = 0;

        // Fix z-index
        $element.css('z-index', 1060);
        $element.find('.loader').css('z-index', 1061);

        /**
         * Show loader
         * @param url
         */
        function showLoading(url) {
          if(url) {
            scope.isDownloading = downloadPatternStrReq.filter(function (pattern) {
              return url.toLowerCase().includes(pattern);
            }).length;
          }
          if($element[0]) {
            if(timer) {
              $timeout.cancel(timer);
            }

            // Show element
            $element.addClass('active');

            // Animation
            $element.addClass('in');
            $element.removeClass('out');
          }
        }

        /**
         * Hide loader
         */
        function hideLoading() {
          if($element[0]) {
            // Animation
            $element.addClass('out');
            $element.removeClass('in');

            timer = $timeout(function() {
              $element.removeClass('active');
            }, 500);
          }
        }


        scope.$on('ajaxLoading.show', function() {
          showLoading();
        });

        scope.$on('ajaxLoading.hide', function() {
          hideLoading();
        });

        scope.$on('ajaxLoading.clear', function() {
          count = 0;
          hideLoading();
        });

        scope.$on('cfpLoadingBar:loading', function(event, param) {
          if(ajaxLoadingFactory.nextRequestLoader) {
            count++;
            showLoading(param.url);
          }
          ajaxLoadingFactory.nextRequestLoaderOptions({
            nextRequestLoader: true
          });
        });

        scope.$on('cfpLoadingBar:loaded', function() {
          count--;
          if(count <= 0) {
            count = 0;
            hideLoading();
          }
        });
      }

      return {
        restrict: 'E',
        templateUrl: 'ajaxLoadingTemplate',
        link: ajaxLoadingLinkFn
      };
    }]);
  return module.name;
});
