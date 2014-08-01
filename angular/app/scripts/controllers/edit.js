/* global confirm */
'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:EditCtrl
 * @description
 * # EditCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
    .controller('EditCtrl', function ($scope, $location, company) {
        var ctrl = this;
        
        ctrl.action = company.id ? 'Editar' : 'Adicionar nova';
        
        ctrl.showAddress = false;
        ctrl.showContactInfo = false;
        ctrl.showProducts = false;
        ctrl.showSocialNetworks = false;
        ctrl.showOtherInfo = false;
        ctrl.showPeople = false;
        
        ctrl.company = company;
        
        ctrl.deleteCompany = function () {
            if (confirm('Deseja realmente excluir esta empresa?\nTodo o histórico de relacionamento será perdido.')) {
                $location.path('/');
            }
        };
    });