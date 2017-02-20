/* jshint ignore:start */
var AbstractService = function ($public, $private, $resource, $q) {
    'use strict';

    $public.getAll = function (options) {
        var deferred = $q.defer();

        $private.setUrlAPIDefault();

        $private.API.query(options).$promise.then(function (result) {
            if (result.data) {
                deferred.resolve(result);
            } else {
                deferred.reject(result);
            }
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    $public.getByReferenceCode = function (options) {
        var deferred = $q.defer();

        $private.setUrlAPIDefault('/' + options.referenceCode);

        $private.API.query({}).$promise.then(function (result) {
            if (result.data) {
                deferred.resolve(result);
            } else {
                deferred.reject(result);
            }
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    $public.deleteByReferenceCode = function (options) {

        var deferred = $q.defer();

        $private.setUrlAPIDefault('/' + options.referenceCode);

        $private.API.delete({}).$promise.then(function (result) {
            if (result.status == 'success') {
                deferred.resolve(result);
            } else {
                deferred.reject(result);
            }
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    $public.updateModel = function (options) {
        var deferred = $q.defer();

        $private.setUrlAPIDefault();

        $private.API.update(options).$promise.then(function (result) {
            if (result.data) {
                deferred.resolve(result);
            } else {
                deferred.reject(result);
            }
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };
};
/* jshint ignore:end */