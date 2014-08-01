/* global alert */

'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
angular
    .module('angularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    companies : function (CompanyService) {
                        return CompanyService.get();
                    }
                }
            })
            .when('/edit', {
                redirectTo: '/edit/nova'
            })
            .when('/edit/:id', {
                templateUrl: 'views/edit.html',
                controller: 'EditCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    company: function ( $route, CompanyService) {
                        return CompanyService.get( $route.current.params.id );
                    }
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function ($rootScope) {
        $rootScope.$on('$routeChangeError', function () {alert('erro na troca da rota');});
    });