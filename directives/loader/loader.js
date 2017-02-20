(function () {
    'use strict';

    function loader() {
        return {
            restrict: 'E',
            templateUrl: 'directives/loader/loader.html'
        };
    }

    angular.module('app.directive.loader', [])
        .directive('loader', loader);
}());
