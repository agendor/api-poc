'use strict';

describe( 'Controller: MainCtrl', function ()
{
    // load the controller's module
    beforeEach( module( 'angularApp' ) );

    var ctrl, $$rootScope, organizationsMock, $$filter;

    organizationsMock = [
        {'organizationId' : 1, 'nickname' : 'Org A', createTime : '2014-08-07T14:40:00', ranking : 4},
        {'organizationId' : 2, 'nickname' : 'Org B', createTime : '2014-08-07T14:45:00', ranking : 3},
        {'organizationId' : 3, 'nickname' : 'Org C', createTime : '2014-08-07T14:43:00', ranking : 1},
        {'organizationId' : 4, 'nickname' : 'Org D', createTime : '2014-08-07T14:44:00', ranking : 2},
        {'organizationId' : 5, 'nickname' : 'Org E', createTime : '2014-08-07T14:42:00', ranking : 5}
    ];

    // Initialize the controller and a mock scope
    beforeEach( inject( function ( $controller, $rootScope, $interval, $filter )
    {
        var scope = $rootScope.$new();
        $$filter = $filter;
        $$rootScope = $rootScope;
        ctrl = $controller( 'MainCtrl', {
            $scope        : scope,
            $interval     : $interval,
            $filter       : $filter,
            organizations : organizationsMock
        } );
    } ) );

    it( 'should create the expected controller bindings to the view', function ()
    {
        expect( ctrl.searchTerm ).toBe( '' );
        expect( ctrl.orderIndex ).toBe( 2 );
        expect( ctrl.filtered ).toEqual( organizationsMock );
        expect( ctrl.isFiltered ).toBe( false );
        expect( ctrl.qtyFiltered ).toBe( 5 );
        expect( ctrl.qtyTotal ).toBe( 5 );
    } );

    it( 'should filter the organization', function ()
    {
        var _organizations = $$filter( 'filter' )( organizationsMock, 'B' );

        ctrl.updateFilter( 'B' );

        expect( ctrl.filtered ).toEqual( _organizations );
        expect( ctrl.qtyFiltered ).toBe( 1 );
        expect( ctrl.isFiltered ).toBe( true );
    } );

    it( 'should order the organizations by ranking (descending)', function ()
    {
        var _organizations = $$filter( 'orderBy' )( organizationsMock, 'ranking', true );

        ctrl.orderIndex = 0;
        ctrl.updateFilter( '' );

        expect( ctrl.filtered ).toEqual( _organizations );
        expect( ctrl.qtyFiltered ).toBe( 5 );
        expect( ctrl.isFiltered ).toBe( false );
    } );

    it( 'should order the organizations by ranking (ascending)', function ()
    {
        var _organizations = $$filter( 'orderBy' )( organizationsMock, 'ranking', false );

        ctrl.orderIndex = 1;
        ctrl.updateFilter( '' );

        expect( ctrl.filtered ).toEqual( _organizations );
        expect( ctrl.qtyFiltered ).toBe( 5 );
        expect( ctrl.isFiltered ).toBe( false );
    } );

    it( 'should order the organizations by ranking (descending)', function ()
    {
        var _organizations = $$filter( 'orderBy' )( organizationsMock, 'nickname', false );

        ctrl.orderIndex = 2;
        ctrl.updateFilter( '' );

        expect( ctrl.filtered ).toEqual( _organizations );
        expect( ctrl.qtyFiltered ).toBe( 5 );
        expect( ctrl.isFiltered ).toBe( false );
    } );

    it( 'should order the organizations by createTime (ascending)', function ()
    {
        var _organizations = $$filter( 'orderBy' )( organizationsMock, 'createTime', false );

        ctrl.orderIndex = 3;
        ctrl.updateFilter( '' );

        expect( ctrl.filtered ).toEqual( _organizations );
        expect( ctrl.qtyFiltered ).toBe( 5 );
        expect( ctrl.isFiltered ).toBe( false );
    } );

    it( 'should order the organizations by ranking (descending)', function ()
    {
        var _organizations = $$filter( 'orderBy' )( organizationsMock, 'createTime', true );

        ctrl.orderIndex = 4;
        ctrl.updateFilter( '' );

        expect( ctrl.filtered ).toEqual( _organizations );
        expect( ctrl.qtyFiltered ).toBe( 5 );
        expect( ctrl.isFiltered ).toBe( false );
    } );
} );
