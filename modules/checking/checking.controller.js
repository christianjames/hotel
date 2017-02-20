(function () {
    'use strict';

    function CheckingCtrl($scope, $uibModal, CheckingService) {
        $scope.checkings = [];

        $scope.sortType = 'doc.dataEntrada';

        $scope.sortReverse = false;

        $scope.filters = {
            filterDataEntrada: null,
            filterDataSaida: null,
            filtersList: null
        };

        $scope.openModalAddPerson = function (size, options) {
            options = options || {};

            var modalInstance = $uibModal.open({
                templateUrl: 'modules/checking/views/modal-person.html',
                scope: $scope,
                controller: modalAddPersonCtrl,
                size: size,
                backdrop: true,
                keyboard: false,
                resolve: {
                    ModalOptions: function () {
                        return options;
                    }
                }
            });

            modalInstance.result.then(function (objChecking) {
                CheckingService.addChecking(objChecking).then(function () {
                    $scope.init();
                });
            });
        };

        $scope.limparBanco = function () {
            console.log('Limpar banco');
            CheckingService.limparBanco();
        };

        $scope.pagination = {
            totalItems: 0,
            perPage: 10,
            countPerPage: 10,
            page: 1,
            searchValue: '',
            searchField: 'person.name',
            active: ''
        };

        $scope.init = function () {
            CheckingService.getCheckings().then(function (checkings) {
                $scope.checkings = checkings;
                $scope.pagination.totalItems = checkings.length;
            });
        };
        
        $scope.init();
    }

    function modalAddPersonCtrl($scope, ModalOptions, $modalInstance) {
        $scope.checking = {
            pessoa: {
                nome: '',
                documento: '',
                telefone: ''
            },
            dataEntrada: new Date(),
            dataSaida: null,
            valorGasto: 0
        };

        if (ModalOptions._id) {
            $scope.checking = angular.copy(ModalOptions);

            if ($scope.checking.dataEntrada) {
                $scope.checking.dataEntrada = new Date($scope.checking.dataEntrada);
            }

            if ($scope.checking.dataSaida) {
                $scope.checking.dataSaida = new Date($scope.checking.dataSaida);
            }
        }
        
        $scope.save = function () {
            $modalInstance.close($scope.checking);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }

    angular.module('app.checking.controllers', ['ui.bootstrap'])
        .controller('modalAddPersonCtrl', modalAddPersonCtrl)
        .controller('CheckingCtrl', CheckingCtrl);

    modalAddPersonCtrl.$inject = ['$scope', 'ModalOptions', '$modalInstance'];
    CheckingCtrl.$inject = ['$scope', '$uibModal', 'CheckingService'];

}());
