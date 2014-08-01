'use strict';

/**
 * @ngdoc service
 * @name angularApp.CompanyService
 * @description
 * # CompanyService
 * Service in the angularApp.
 */
angular.module('angularApp')
    .service('CompanyService', function CompanyService($q) {
        // AngularJS will instantiate a singleton by calling "new" on this function

        var srvc = this;

        var data = [
            {
                id: 1,
                nome: 'Empresa mau',
                categoria: 'Clientes',
                telefone: '(11) 5555-0000',
                avatar: 'http://lorempixel.com/150/150/people/1'
            },
            {
                id: 2,
                nome: 'Empresa julio',
                categoria: 'Clientes',
                telefone: '(11) 6666-0000',
                avatar: 'http://lorempixel.com/150/150/people/2'
            },
            {
                id: 3,
                nome: 'Túlio Monte Azul',
                categoria: 'Clientes',
                telefone: '(11) 7777-0000',
                avatar: 'http://lorempixel.com/150/150/nature/9'
            }
        ];

        var empty = function () {
            return {
                id: 0,
                nome: '',
                categoria: '',
                telefone: '',
                avatar: ''
            };
        };

        srvc.get = function (id) {

            var deferred = $q.defer();

            if (id) {
                deferred.resolve(
                    data.filter(function (item) {
                        return item.id === +id;
                    })[0] || empty()
                );
            } else {
                deferred.resolve(data);
            }

            return deferred.promise;
        };

        return this;
    });