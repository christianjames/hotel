(function () {
    'use strict';

    angular.module('app.checking', ['ui.router', 'app.checking.controllers', 'app.filters'])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('checking', {
                    url: "/checking",
                    views: {
                        '@': {
                            templateUrl: 'modules/checking/views/list.html',
                            controller: 'CheckingCtrl'
                        }
                    }
                });
        }]);

}());