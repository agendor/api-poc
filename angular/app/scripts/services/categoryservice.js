'use strict';

/**
 * @ngdoc service
 * @name angularApp.CategoryService
 * @description
 * # CategoryService
 * Service in the angularApp.
 */
angular.module( 'angularApp' ).service( 'CategoryService', function CategoriaService ( $q )
{
    var data = [
        {'id' : 31, 'category' : 'Cliente efetivo'},
        {'id' : 32, 'category' : 'Cliente em potencial'},
        {'id' : 33, 'category' : 'Concorrente'},
        {'id' : 34, 'category' : 'Fornecedor'},
        {'id' : 35, 'category' : 'Cliente Efetivo'}
    ];

    return {
        get : function ( id )
        {
            var deferred = $q.defer();

            if ( id )
            {

                var category = data.filter( function ( item )
                {
                    return item.id === +id;
                } )[0];

                if ( category )
                {
                    deferred.resolve( category );
                }
                else
                {
                    deferred.reject();
                }
            }
            else
            {
                deferred.resolve( data );
            }

            return deferred.promise;
        }
    };
} );
