(function() {
    'use strict';

    function ConfigService (urlAPI) {

        var $public = {};
        var $private = {};

        $private.urlApi = urlAPI;
        $private.sizePagination = 20;

        $public.getUrlApi = function () {
            return $private.urlApi;
        };

        $public.setUrlApi = function (value) {
            $private.urlApi = value;
        };

        $public.defaultOptionsResource = function () {
            return {
                'get':    {method: 'GET', headers:{'Accept': 'application/json'}},
                'save':   {method: 'POST', headers:{'Content-Type': 'application/json'}},
                'post':   {method: 'POST', headers:{'Content-Type': 'application/json'}},
                'auth':   {method: 'POST', headers:{'Content-Type': 'application/json'}},
                'query':  {method: 'GET', headers:{'Accept': 'application/json'}},
                'update':  {method: 'PUT', headers:{'Content-Type': 'application/json'}},
                'delete': {method: 'DELETE', headers:{'Accept': 'application/json'}}
            };
        };

        return $public;
    }

    angular
        .module('app.services')
        .factory('ConfigService', ConfigService);

    ConfigService.$inject = ['urlAPI'];
}());
