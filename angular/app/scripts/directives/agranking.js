'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:agRating
 * @description
 * # agRating
 */
angular.module( 'angularApp' ).directive( 'agRanking', function ()
{
    return {
        'templateUrl'     : 'templates/agRanking.html',
        'replace'      : true,
        'restrict'     : 'EAC',
        'scope'        : {
            'ranking' : '='
        },
        'controllerAs' : 'ctrl',
        'controller'   : [
            '$scope', '$element', function ( $scope, $element )
            {
                var ctrl = this;

                ctrl.stars = [];
                ctrl.current = -1;

                var _mouseEnter = function ()
                {
                    $scope.$apply( function ()
                    {
                        ctrl.current = 0;
                    } );
                };

                var _mouseLeave = function ()
                {
                    $scope.$apply( function ()
                    {
                        ctrl.current = $scope.ranking;
                    } );
                };

                var _build = function ()
                {
                    var i;

                    // done like this so the hard-coded 5 value could easily be changed to an attribute
                    for ( i = 5; i > 0; i-- )
                    {
                        ctrl.stars.push( i );
                    }

                    ctrl.current = $scope.ranking;
                };

                ctrl.action = function ( index )
                {
                    index = +index;
                    $scope.ranking = index === $scope.ranking ? 0 : index;
                };

                $element.on( 'mouseenter', _mouseEnter );
                $element.on( 'mouseleave', _mouseLeave );

                _build();

                $scope.$on('$destroy', function () {
                    $element.off();
                });
            }
        ]
    };
} );
