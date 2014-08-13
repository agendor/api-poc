/* global $ */
var EmberApp = window.EmberApp = Ember.Application.create( {
    LOG_TRANSITIONS : true,
    BASE_URL: 'http://localhost:8000'
} );

$.ajaxSetup( {
    headers     : { 'Authorization' : 'Basic dEB0LmNvbToxMjM='},
    contentType : 'application/json; charset=utf-8',
    dataType    : 'json'
} );

/**
 * @ref http://stackoverflow.com/a/10260347
 */
EmberApp.Serializable = Ember.Mixin.create( {
    serialize : function ()
    {
        var propertyNames = this.get( 'propertyNames' ) || [];
        return JSON.stringify( this.getProperties( propertyNames ) );
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
