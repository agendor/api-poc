'use strict';

describe( 'Service: CategoryService', function ()
{
    // load the service's module
    beforeEach( function ()
    {
        module( 'angular-data.DSCacheFactory' );
        module( 'angularApp' );
    } );

    // instantiate service
    var CategoryService, $$rootScope;

    beforeEach( inject( function ( $rootScope, _CategoryService_ )
    {
        $$rootScope = $rootScope;
        CategoryService = _CategoryService_;
    } ) );

    it( 'should instantiate the service', function ()
    {
        expect( CategoryService ).toBeDefined();
    } );

    it( 'should return a list of categories', function ( done )
    {
        CategoryService.get().then(function ( categories )
        {
            expect( categories ).toBeDefined();
            expect( categories.length ).toBeGreaterThan( 0 );
            done();
        } ).catch( function ()
        {
            expect( 'catch' ).toBe( 'error' );
            done();
        } );

        $$rootScope.$digest(); // forces an angular digest cycle
    } );

    it( 'should return a category', function ( done )
    {
        CategoryService.get( 31 ).then(function ( category )
        {
            expect( category ).toBeDefined();
            expect( category.categoryId ).toEqual( 31 );
            expect( category.name ).toEqual( 'Cliente efetivo' );

            done();
        } ).catch( function ()
        {
            expect( 'catch' ).toBe( 'error' );
            done();
        } );

        $$rootScope.$digest();
    } );
} );
