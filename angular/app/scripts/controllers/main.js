'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module( 'angularApp' ).controller( 'MainCtrl', [
    '$scope', '$interval', '$filter', 'organizations', function ( $scope, $interval, $filter, organizations )
    {
        var ctrl = this;

        ctrl.searchTerm = '';
        ctrl.orderIndex = 2;
        ctrl.filtered = [];
        ctrl.isFiltered = false;
        ctrl.qtyFiltered = 0;
        ctrl.qtyTotal = organizations.length;

        ctrl.updateFilter = function ( term )
        {
            var _orderPredicate = 'nickname';
            var _orderReverse = false;

            switch ( +ctrl.orderIndex )
            {
                case 0:
                    _orderPredicate = 'ranking';
                    _orderReverse = true;
                    break;
                case 1:
                    _orderPredicate = 'ranking';
                    _orderReverse = false;
                    break;
                case 2:
                    _orderPredicate = 'nickname';
                    _orderReverse = false;
                    break;
                case 3:
                    _orderPredicate = 'createTime';
                    _orderReverse = false;
                    break;
                case 4:
                    _orderPredicate = 'createTime';
                    _orderReverse = true;
                    break;
            }

            ctrl.filtered = $filter( 'filter' )( organizations, term );
            ctrl.filtered = $filter( 'orderBy' )( ctrl.filtered, _orderPredicate, _orderReverse );

            ctrl.qtyFiltered = ctrl.filtered.length;
            ctrl.isFiltered = !!term.length;
        };

        ctrl.updateFilter( '' );
    }
] );
