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
        {'categoryId' : 31, 'name' : 'Cliente efetivo'},
        {'categoryId' : 32, 'name' : 'Cliente em potencial'},
        {'categoryId' : 33, 'name' : 'Concorrente'},
        {'categoryId' : 34, 'name' : 'Fornecedor'},
        {'categoryId' : 35, 'name' : 'Cliente Efetivo'}
    ];

    return {
        get : function ( id )
        {
            var deferred = $q.defer();

            if ( id )
            {
                var category = data.filter( function ( item )
                {
                    return item.categoryId === +id;
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
