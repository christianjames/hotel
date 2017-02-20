(function() {
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise("/checking");

            $stateProvider
                .state('home', {
                    url: '/checking'
                });
        }]);
}());
