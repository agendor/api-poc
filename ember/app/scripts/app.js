/* global $ */
var EmberApp = window.EmberApp = Ember.Application.create( {
    LOG_TRANSITIONS : true,
    BASE_URL        : 'http://localhost:8000'
} );

$.ajaxSetup( {
    headers     : { 'Authorization' : 'Basic dEB0LmNvbToxMjM='},
    contentType : 'application/json; charset=utf-8',
    dataType    : 'json'
} );

/**
 * checks if an object has no properties
 * @param {object} obj
 * @returns {boolean}
 * @private
 */
var _isEmptyObject = function _isEmptyObject ( obj )
{
    for ( var attribute in obj )
    {
        if ( obj.hasOwnProperty( attribute ) )
        {
            return false;
        }
    }
    return true;
};

/**
 * removes empty attributes
 * @param {object} obj
 * @param {number} [level]
 * @returns {object}
 * @private
 */
var _stripEmptyAttributes = function _stripEmptyAttributes ( obj, level )
{
    level = level || 0;

    if ( level > 3 )
    {
        return obj;
    }

    for ( var attribute in obj )
    {
        if ( obj.hasOwnProperty( attribute ) )
        {
            if ( obj[attribute] != null && typeof obj[attribute] === 'object' )
            {
                obj[attribute] = _stripEmptyAttributes( obj[attribute], level + 1 );

                if ( _isEmptyObject( obj[attribute] ) )
                {
                    delete obj[attribute];
                }

                continue;
            }

            if ( Ember.isArray( obj[attribute] ) && !obj[attribute].length )
            {
                delete obj[attribute];
                continue;
            }

            if ( !obj[attribute] )
            {
                delete obj[attribute];
            }
        }
    }

    return obj;
};

/**
 * @ref http://stackoverflow.com/a/10260347
 */
EmberApp.Serializable = Ember.Mixin.create( {
    serialize : function ()
    {
        var propertyNames = this.get( 'propertyNames' ) || [];
        var pojo = _stripEmptyAttributes( this.getProperties( propertyNames ) );

        return JSON.stringify( pojo );
    },

    deserialize : function ( hash )
    {
        this.setProperties( hash );
    }
} );

/* Order and include as you please. */
require( 'scripts/controllers/*' );
require( 'scripts/store' );
require( 'scripts/models/*' );
require( 'scripts/routes/*' );
require( 'scripts/components/*' );
require( 'scripts/views/*' );
require( 'scripts/router' );
