'use strict';

// http://www.benlesh.com/2013/06/angular-js-unit-testing-directives.html

describe( 'Directive: agRating', function ()
{
    var $elem, scope, html;

    html = '<ag-ranking ranking="ranking"></ag-ranking>';

    // load the directive's module
    beforeEach( module( 'angularApp' ) );

    beforeEach( inject( function ( $compile, $rootScope )
    {
        scope = $rootScope.$new();

        scope.ranking = 3; // intial value

        $elem = $compile( html )( scope );

        scope.$digest();
    } ) );

    it( 'should have 3 stars selected', function ()
    {
        var _selected = $elem.find( '.ag-star-active' ).length;

        expect( _selected ).toBe( 3 );
    } );

    it( 'should have no stars selected', function ()
    {
        $elem.trigger( 'mouseenter' );

        var _selected = $elem.find( '.ag-star-active' ).length;

        expect( _selected ).toBe( 0 );
    } );

    it( 'should have 3 stars selected after leave', function ()
    {
        $elem.trigger( 'mouseenter' );
        $elem.trigger( 'mouseleave' );

        var _selected = $elem.find( '.ag-star-active' ).length;

        expect( _selected ).toBe( 3 );
    } );

    it( 'should have 4 stars selected after click and leave', function ()
    {
        $elem.find( '.ag-star' ).eq( 1 ).trigger('click');

        scope.$digest();

        $elem.trigger( 'mouseleave' );

        var _selected = $elem.find( '.ag-star-active' ).length;

        expect( _selected ).toBe( 4 );
    } );
} );
