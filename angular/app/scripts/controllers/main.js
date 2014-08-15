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
        ctrl.orderPredicate = 'nickname';
        ctrl.orderReverse = false;

        ctrl.organizations = organizations;
        $scope.filtered = ctrl.organizations;

        ctrl.updateFilter = function ()
        {
            switch ( +ctrl.orderIndex )
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
                    ctrl.orderReverse = true;
                    break;
                case 4:
                    ctrl.orderPredicate = 'createTime';
                    ctrl.orderReverse = false;
                    break;
            }
        };
    }
] );
