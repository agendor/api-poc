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
] ).config(function ( $routeProvider )
{
    $routeProvider.when( '/', {
        templateUrl  : 'views/main.html',
        controller   : 'MainCtrl',
        controllerAs : 'ctrl',
        resolve      : {
            'categories'    : function ( CategoryService )
            {
                return CategoryService.get();
            },
            'organizations' : function ( OrganizationService )
            {
                return OrganizationService.get();
            }
        }
    } ).when( '/edit', {
        redirectTo : '/edit/nova'
    } ).when( '/edit/:id', {
        templateUrl  : 'views/edit.html',
        controller   : 'EditCtrl',
        controllerAs : 'ctrl',
        resolve      : {
            'organization' : function ( $route, OrganizationService )
            {
                if ( $route.current.params.id === 'nova' )
                {
                    return OrganizationService.stub();
                }

                return OrganizationService.get( +$route.current.params.id );
            }
        }
    } ).otherwise( {
        redirectTo : '/'
    } );
} ).run( function ( $rootScope, $location, $anchorScroll )
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
} );