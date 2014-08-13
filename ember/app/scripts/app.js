/* global $ */
var EmberApp = window.EmberApp = Ember.Application.create( {
    LOG_TRANSITIONS : true
} );

$.ajaxSetup( {
    headers     : { 'Authorization' : 'Basic dEB0LmNvbToxMjM='},
    contentType : 'application/json; charset=utf-8',
    dataType    : 'json'
} );

/* Order and include as you please. */
require( 'scripts/controllers/*' );
require( 'scripts/store' );
require( 'scripts/models/*' );
require( 'scripts/routes/*' );
require( 'scripts/components/*' );
require( 'scripts/views/*' );
require( 'scripts/router' );
