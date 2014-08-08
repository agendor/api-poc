'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:agRating
 * @description
 * # agRating
 */
angular.module( 'angularApp' ).directive( 'agRating', function ()
{
    return {
        template : '<ul class="ag-stars"><li class="ag-star"></li><li class="ag-star"></li><li class="ag-star"></li><li class="ag-star"></li><li class="ag-star"></li></ul>',
        replace  : true,
        restrict : 'EAC',
        scope    : {
            value : '='
        },
        link     : function postLink ( scope, element )
        {
            element.on( 'click', 'li', function ()
            {
                var $this = angular.element( this );
                var index = 5 - $this.index();

                element.find( 'li' ).removeClass( 'ag-star-selected' );

                if ( index === scope.value )
                {
                    index = 0;
                }
                else
                {
                    $this.addClass( 'ag-star-selected' );
                }

                scope.$apply( function ()
                {
                    scope.value = index;
                } );
            } );

            element.on( 'mouseenter', function ()
            {
                element.find( 'li' ).removeClass( 'ag-star-active' );
            } );

            element.on( 'mouseleave', function ()
            {
                element.find( 'li' ).eq( 5 -
                scope.value ).addClass( 'ag-star-active' ).nextAll().addClass( 'ag-star-active' );

            } );

            element.trigger( 'mouseleave' );
        }
    };
} );
