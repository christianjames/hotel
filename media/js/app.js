(function () {
    'use strict';


    var dependencies = [
            'app.directive.customHeader',
            'app.checking',
            'app.services',
            'ngCookies',
            'ngAria',
            'ngResource',
            'ngSanitize',
            'ngRoute',
            'ui.router',
            'ui.bootstrap',
            'ui.mask'
    ];

    angular
        .module('app', dependencies);

    angular
        .module('app')
        .config(['$resourceProvider', '$httpProvider', function ($resourceProvider, $httpProvider) {
            $resourceProvider.defaults.stripTrailingSlashes = false;
        }]);

    angular.module('app.services', ['pouchdb']);
    angular.module('app.filters', ['ngSanitize']);
}());
