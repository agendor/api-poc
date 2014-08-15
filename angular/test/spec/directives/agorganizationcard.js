'use strict';

describe( 'Directive: agOrganizationCard', function ()
{
    var $elem, scope, html, organization, $httpBackend, ctrl;

    var BASE_URL;

    html = '<ag-organization-card organization="organization"></ag-organization-card>';

    organization = {
        'organizationId' : 1,
        'nickname'       : 'Org A',
        'createTime'     : '2014-08-07T14:40:00',
        'ranking'        : 4,
        'phoneNumber'    : '(11) 5555-0000',
        'category'       : 31, // 'Cliente efetivo'
        'avatar'         : 'http://lorempixel.com/150/150/nature/9'
    };

    // load the directive's module
    beforeEach( module( 'angularApp' ) );

    // cache mock
    beforeEach( module( function ( $provide )
    {
        $provide.value( 'DSCacheFactory', function ()
        {
            return {
                get    : function ()
                {
                },
                put    : function ()
                {
                },
                remove : function ()
                {
                }
            };
        } );
    } ) );

    // mock back-end
    beforeEach( inject( function ( $injector, _BASE_URL_ )
    {
        BASE_URL = _BASE_URL_ + '/organizations';

        // Set up the mock http service responses
        $httpBackend = $injector.get( '$httpBackend' );

        $httpBackend.whenPUT( BASE_URL + '/' + organization.organizationId ).respond( function (method, url, data)
        {
            data = JSON.parse( data );

            var response = angular.copy(organization);

            response.ranking = data.ranking;

            return [200, response, {}];
        } );

    } ) );

    beforeEach( inject( function ( $compile, $rootScope )
    {
        scope = $rootScope.$new();

        scope.organization = organization;

        scope.ranking = 3; // intial value

        $elem = angular.element( html );

        $compile( $elem )( scope );

        scope.$digest();

        ctrl = $elem.controller( 'agOrganizationCard' );
        spyOn( ctrl, 'updateRanking' ).and.callThrough();
    } ) );

    it( 'should build the card correctly', function ()
    {
        var _avatar = $elem.find( 'img' ).attr( 'src' );
        var _nickname = $elem.find( 'h3' ).text();
        var _category = $elem.find( '.col-xs-9 p' ).eq( 0 ).text().slice( 11 ); // rips off "Categoria: "
        var _phoneNumber = $elem.find( '.col-xs-9 p' ).eq( 1 ).text().slice( 10 ); // rips off "Telefone: "
        var _ranking = $elem.find( '.ag-star-active' ).length;
        var _id = +$elem.find( 'a' ).attr( 'href' ).slice( -1 ); // gets the last character

        expect( _avatar ).toBe( organization.avatar );
        expect( _nickname ).toBe( organization.nickname );
        expect( _category ).toBe( 'Cliente efetivo' );
        expect( _phoneNumber ).toBe( organization.phoneNumber );
        expect( _ranking ).toBe( organization.ranking );
        expect( _id ).toBe( organization.organizationId );
    } );

    it( 'should call the controller function to  update the organization\'s ranking', function ()
    {
        $elem.find( '.ag-star' ).eq( 0 ).trigger( 'click' );

        scope.$digest();

        expect( ctrl.updateRanking ).toHaveBeenCalledWith( 5 );
    } );

    it( 'should return true when changing the organization\'s ranking', function ()
    {
        var result = ctrl.updateRanking( 3 );
        scope.$digest();

        expect( result ).toBe( true );
    } );

    it( 'should return false when not changing the organization\'s ranking', function ()
    {
        var result = ctrl.updateRanking( 3 );

        scope.$digest();

        expect( result ).toBe( false );
    } );
} );
