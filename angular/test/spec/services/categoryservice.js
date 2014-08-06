'use strict';

describe( 'Service: CategoryService', function ()
{
    // load the service's module
    beforeEach( module( 'angularApp' ) );

    // instantiate service
    var CategoryService;

    beforeEach( inject( function ( _CategoryService_ )
    {
        CategoryService = _CategoryService_;
    } ) );

    it( 'should instantiate the service', function ()
    {
        expect( !!CategoryService ).toBe( true );
    } );

    it( 'should return a list of categories', function ()
    {
        expect( !!CategoryService ).toBe( true );

        var categories = CategoryService.get();

        expect( categories ).toBeDefined( );
        expect( categories.length ).toBeGreaterThan( 0 );
    } );

    it( 'should return a category', function ()
    {
        expect( !!CategoryService ).toBe( true );

        var category = CategoryService.get( 31 ); // default category

        expect( category ).toBeDefined( );
        expect( category.categoryId ).toEqual( 31 );
        expect( category.name ).toEqual( 'Cliente efetivo' );
    } );
} );
