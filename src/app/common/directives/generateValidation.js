define(function(require) {
    'use strict';
    var angular = require('angular');

    var module = angular.module('common.directives.generateValidation', []);
    module.directive('generateValidation', [
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
