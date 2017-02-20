(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('returnDateObject', returnDateObject)
        .filter('formatDate', formatDate)
        .filter('formatDatePrint', formatDatePrint)
        .filter('formatDateTimeGlobal', formatDateTimeGlobal)
        .filter('formatDateDia', formatDateDia)
        .filter('formatDateMes', formatDateMes)
        .filter('formatDateDiaMes', formatDateDiaMes)
        .filter('formatDateTime', formatDateTime)
        .filter('formatDateCustom', formatDateCustom)
        .filter('formatDateFull', formatDateFull)
        .filter('formatDateTimeFull', formatDateTimeFull)
        .filter('formatDateTimeToDate', formatDateTimeToDate)
        .filter('formatTime', formatTime)
        .filter('formatTutorClassTime', formatTutorClassTime)
        .filter('formatDateTimeBrToGlobal', formatDateTimeBrToGlobal);

    returnDateObject.$inject = ['$filter'];

    function returnDateObject($filter) {
        return function (date) {
            if (date) {
                date = date.replace(" ", "T");

                var dateFull = $filter('date')(date, "yyyy-MM-dd'T'HH:mm:ss", '-3');

                return new Date(dateFull);
            }
        };
    }

    formatDateTimeToDate.$inject = ['$filter'];
    function formatDateTimeToDate($filter) {
        return function (date) {
            if (date) {
                date = date.replace(" ", "T");
                return $filter('date')(date, 'dd/MM/yyyy', '-3');
            }
        };
    }

    formatDate.$inject = ['$filter'];
    function formatDate($filter) {
        return function (date) {
            if (date) {
                date = date.replace(" ", "T");
                return $filter('date')(date, 'dd/MMM/yyyy', '-3');
            }
        };
    }

    formatDateTimeGlobal.$inject = ['$filter'];
    function formatDateTimeGlobal($filter) {
        return function (date, format) {

            var formatFilter = format || 'dd/MMM/yyyy HH:mm';

            if (date) {
                //date = date.replace(" ", "T");
                return $filter('date')(date, formatFilter, '-3');
            }
        };
    }

    formatDatePrint.$inject = ['$filter'];
    function formatDatePrint($filter) {
        return function (date) {
            if (date) {
                date = date.replace(" ", "T");
                return $filter('date')(date, 'dd/MM/yyyy', '-3');
            }
        };
    }

    formatDateDia.$inject = ['$filter'];
    function formatDateDia($filter) {
        return function (date) {
            if (date) {
                date = date.replace(" ", "T");
                return $filter('date')(date, 'dd', '-3');
            }
        };
    }

    formatDateMes.$inject = ['$filter'];
    function formatDateMes($filter) {
        return function (date) {
            if (date) {
                date = date.replace(" ", "T");
                return $filter('date')(date, 'MMM', '-3');
            }
        };
    }

    formatDateDiaMes.$inject = ['$filter'];
    function formatDateDiaMes($filter) {
        return function (date) {
            if (date) {
                date = date.replace(" ", "T");
                return $filter('date')(date, 'dd/MMM', '-3');
            }
        };
    }

    formatDateTime.$inject = ['$filter'];
    function formatDateTime($filter) {
        return function (date) {
            if (date) {
                date = date.replace(" ", "T");
                return $filter('date')(date, 'dd/MMM/yyyy HH:mm', '-3');
            }
        };
    }

    formatDateCustom.$inject = ['$filter'];
    function formatDateCustom($filter) {
        return function (date, format) {
            if (date) {
                date = date.replace(" ", "T");
                return $filter('date')(date, format);
            }
        };
    }

    formatDateFull.$inject = ['$filter'];
    function formatDateFull($filter) {
        return function (date) {
            if (date) {
                date = date.replace(" ", "T");

                return $filter('date')(date, "dd 'de' MMMM 'de' yyyy", '-3');
            }
        };
    }

    formatDateTimeFull.$inject = ['$filter'];
    function formatDateTimeFull($filter) {
        return function (date) {
            if (date) {
                date = date.replace(" ", "T");
                return $filter('date')(date, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", '-3');
            }
        };
    }

    formatTime.$inject = ['$filter'];
    function formatTime($filter) {
        return function (date) {
            if (date) {
                date = date.replace(" ", "T");
                return $filter('date')(date, 'HH:mm', '-3');
            }
        };
    }

    formatTutorClassTime.$inject = ['$filter'];
    function formatTutorClassTime($filter) {
        return function (date) {
            if (date) {
                date = date.replace(" ", "T");
                return $filter('date')(date, 'HH:mm');
            }
        };
    }

    formatDateTimeBrToGlobal.$inject = ['$filter'];
    function formatDateTimeBrToGlobal($filter) {
        return function (datetime) {

            if (datetime && datetime.length == 19) {
                datetime = datetime.split(" ");

                var data = datetime[0].split('/');
                var hora = datetime[1];

                return data[2] + '-' + data[1] + '-' + data[0] + ' ' + hora;
            }
        };
    }
})();
