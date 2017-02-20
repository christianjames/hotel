(function () {
    'use strict';

    function CheckingService($resource, $q, ConfigService, pouchDB) {

        var $public = {},
            $private = {};

        $private.db =  pouchDB('checking');

        $private.setUrlAPIDefault = function (afterURL) {
            afterURL = afterURL || '';
            $private.API = $resource(ConfigService.getUrlApi() + '/checking' + afterURL, {}, ConfigService.defaultOptionsResource());
        };

        $public.limparBanco = function () {
            $private.db.destroy();
        };

        $public.addChecking = function (checking) {
            var deferred = $q.defer();

            var dataInicial = angular.copy(checking.dataEntrada);
            var dataFinal = angular.copy(checking.dataSaida);

            // Regra de validação de preço de finais de semana
            if (dataFinal) {

                if (checking.dataSaida.getHours() > 16 ||
                    checking.dataSaida.getHours() == 16 && checking.dataSaida.getMinutes() > 30) {
                    dataFinal.setDate(dataFinal.getDate() + 1);
                }
                else {
                    dataFinal.setDate(dataFinal.getDate());
                }


                var dataInicialWhile = parseInt(dataInicial.getFullYear()+dataInicial.getMonthFormatted()+dataInicial.getDayFormatted());
                var dataFinalWhile = parseInt(dataFinal.getFullYear()+dataFinal.getMonthFormatted()+dataFinal.getDayFormatted());

                checking.valorGasto = 0;

                while(dataInicialWhile <= dataFinalWhile){

                    if (dataInicial.getDay() <= 4) {
                        checking.valorGasto += 120;

                        if (checking.possuiVeiculo) {
                            checking.valorGasto += 15;
                        }
                    }
                    else if (dataInicial.getDay() == 5 || dataInicial.getDay() == 6) {
                        checking.valorGasto += 150;

                        if (checking.possuiVeiculo) {
                            checking.valorGasto += 20;
                        }
                    }
                    dataInicial.setDate(dataInicial.getDate() + 1);
                    dataInicialWhile = parseInt(dataInicial.getFullYear()+dataInicial.getMonthFormatted()+dataInicial.getDayFormatted());
                }
            }
            
            $private.db.post(checking).then(function (result) {
                deferred.resolve(result);
            })
            .catch(function () {
                alert('Erro ao salvar no banco de dados');
            });

            return deferred.promise;
        };

        $public.getCheckings = function (options) {
            var deferred = $q.defer();

            $private.db.allDocs({
                include_docs: true,
                attachments: true
            }).then(function (res) {
                deferred.resolve(res.rows);
            })
            .catch(function (res) {
                alert('Erro ao buscar registro');
            });

            return deferred.promise;
        };

        return $public;
    }

    angular.module('app.services').factory('CheckingService', CheckingService);

    CheckingService.$inject = ['$resource', '$q', 'ConfigService', 'pouchDB'];
}());