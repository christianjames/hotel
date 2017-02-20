(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('startFrom', startFrom)
        .filter('filterHasValue', ['$filter', filterHasValue])
        .filter('filterMultiple', ['$filter', filterMultiple]);


    /**
     * Filtro para retornar somente os registros que tem valor com base nos campos passados de parâmetro.
     * @param $filter
     * @returns {Function}
     */
    function filterHasValue($filter) {
        return function (items, oFilter) {
            var filtered = [];
            
            angular.forEach(items, function (valueItem, keyItem) {
                var addItem = true;
                angular.forEach(oFilter, function (valueFilter, keyFilter) {
                    if (valueFilter === false && valueItem.doc[keyFilter]) {
                        addItem = false;
                    }
                    else if (valueFilter === true && !valueItem.doc[keyFilter]) {
                        addItem = false;
                    }
                });

                if (addItem) {
                    filtered.push(valueItem);
                }
            });
            
            return filtered;
        };
    }

    function startFrom() {
        return function (input, start) {

            if (input) {
                start = +start; //parse to int
                return input.slice(start);
            }

        };
    }

    function filterMultiple($filter) {
        return function (items, oFilter) {
            return $filter('filter')(items, oFilter, function (filterValue, aValue) {
                return aValue.indexOf(filterValue) > -1;
            });
        };
    }

})();
