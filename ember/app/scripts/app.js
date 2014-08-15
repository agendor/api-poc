/* global $ */
var EmberApp = window.EmberApp = Ember.Application.create( {
    LOG_TRANSITIONS : true
} );

Ember.RSVP.configure( 'onerror', function ( error )
{
    if ( error instanceof Error )
    {
        Ember.Logger.assert( false, error );
        Ember.Logger.error( error.stack );
    }
} );

EmberApp.Adapter = {
    ajax : function ( path, options )
    {
        options = options || {};
        options.dataType = 'json';
        options.contentType = 'application/json; charset=utf-8';
        options.headers = { 'Authorization' : 'Basic dEB0LmNvbToxMjM='};

        if ( typeof options.data === 'object' )
        {
            options.data = JSON.stringify( options.data );
        }

        return Ember.$.ajax( 'http://localhost:8000' + path, options );
    }
};

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
