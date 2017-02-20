/**
 * @ngdoc function
 * @name app.directive.menu
 * @description
 * # menu
 * Directive of the app
 */

(function () {
    'use strict';

    angular.module('app.directive.customHeader', [])
        .directive('customHeader', customHeader);

    function customHeader() {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {},
            templateUrl: 'directives/custom-header/custom-header.html'
        };
    }
}());
