/* global toastr */

'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
angular.module( 'angularApp', [
    'ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'angular-data.DSCacheFactory'
] )
.constant('BASE_URL', 'https://api.agendor.com.br/v1')
.constant('AUTH_TOKEN', 'Basic dGVzdGVAYWdlbmRvci5jb20uYnI6YWdlbmRvcl8yMDE0')
.config( [
    '$routeProvider', '$httpProvider', 'AUTH_TOKEN', function ( $routeProvider, $httpProvider, AUTH_TOKEN )
    {
        $routeProvider.when( '/', {
            templateUrl  : 'views/main.html',
            controller   : 'MainCtrl',
            controllerAs : 'ctrl',
            resolve      : {
                'organizations' : [
                    'OrganizationService', function ( OrganizationService )
                    {
                        return OrganizationService.get();
                    }
                ]
            }
        } ).when( '/edit', {
            redirectTo : '/edit/nova'
        } ).when( '/edit/:id', {
            templateUrl  : 'views/edit.html',
            controller   : 'EditCtrl',
            controllerAs : 'ctrl',
            resolve      : {
                'categories'   : [
                    'CategoryService', function ( CategoryService )
                    {
                        return CategoryService.get();
                    }
                ],
                'organization' : [
                    '$route', 'OrganizationService', function ( $route, OrganizationService )
                    {
                        if ( $route.current.params.id === 'nova' )
                        {
                            return OrganizationService.stub();
                        }

                        return OrganizationService.get( +$route.current.params.id );
                    }
                ]
            }
        } ).otherwise( {
            redirectTo : '/'
        } );

        angular.extend( $httpProvider.defaults, {
            'headers' : {
                'common' : { 'Authorization' : AUTH_TOKEN },
                'post'   : { 'Content-Type' : 'application/json; charset=utf-8' },
                'put'    : { 'Content-Type' : 'application/json; charset=utf-8' },
                'delete' : { 'Content-Type' : 'application/json; charset=utf-8' }
            }
        } );
    }
] ).run( [
    '$rootScope', '$location', '$anchorScroll', function ( $rootScope, $location, $anchorScroll )
    {
        $rootScope.$on( '$routeChangeSuccess', function ()
        {
            $location.hash( '' );
            $anchorScroll();
        } );

        $rootScope.$on( '$routeChangeError', function ()
        {
            toastr.error( 'Erro ao trocar de rota' );
            $location.path( '/' );
        } );
    }
] );