'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module( 'angularApp' ).controller( 'MainCtrl',
function ( $scope, $interval, $filter, organizations )
{
    var ctrl = this;

    ctrl.orderIndex = 2;
    ctrl.orderPredicate = 'nickname';
    ctrl.orderReverse = false;

    ctrl.searchTerm = '';

    var updateFilter = function () {
        ctrl.filtered = $filter( 'filter' )( organizations, ctrl.searchTerm );
        ctrl.filtered = $filter( 'orderBy' )( ctrl.filtered, ctrl.orderPredicate, ctrl.orderReverse );
        ctrl.qtyFiltered = ctrl.filtered.length;
    };

    ctrl.filtered = [];

    ctrl.isFiltered = false;

    ctrl.qtyFiltered = 0;

    ctrl.qtyTotal = organizations.length;

    $scope.$watch( 'ctrl.searchTerm', function ( newValue )
    {
        ctrl.isFiltered = newValue.length !== 0;

        updateFilter();
    } );

    $scope.$watch( 'ctrl.orderIndex', function ( newValue )
    {

        switch ( +newValue )
        {
            case 0:
                ctrl.orderPredicate = 'ranking';
                ctrl.orderReverse = true;
                break;
            case 1:
                ctrl.orderPredicate = 'ranking';
                ctrl.orderReverse = false;
                break;
            case 2:
                ctrl.orderPredicate = 'nickname';
                ctrl.orderReverse = false;
                break;
            case 3:
                ctrl.orderPredicate = 'createTime';
                ctrl.orderReverse = false;
                break;
            case 4:
                ctrl.orderPredicate = 'createTime';
                ctrl.orderReverse = true;
                break;
        }

        updateFilter();
    } );
} );
