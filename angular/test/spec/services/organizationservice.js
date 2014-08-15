'use strict';

describe( 'Service: OrganizationService', function ()
{
    // instantiate service
    var $$rootScope, $httpBackend, OrganizationService;

    // constants from service
    var BASE_URL = 'http://localhost:8000/organizations';
    //    var AUTH_TOKEN = 'Basic dEB0LmNvbToxMjM=';

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

    beforeEach( inject( function ( $rootScope, _OrganizationService_ )
    {
        $$rootScope = $rootScope;
        OrganizationService = _OrganizationService_;
    } ) );

    // mock back-end
    beforeEach( inject( function ( $injector )
    {
        // Set up the mock http service responses
        $httpBackend = $injector.get( '$httpBackend' );
    } ) );

    it( 'should instantiate the service', function ()
    {
        expect( OrganizationService ).toBeDefined();
    } );

    it( 'should return a stub', function ()
    {
        var stub = OrganizationService.stub();

        expect( stub ).toBeDefined();

        expect( stub ).toEqual( {
            'organizationId' : 0,
            'customer'       : {
                'customerId' : 0,
                'name'       : ''
            },
            'user'           : {
                'userId' : 0
            },
            'phones'         : [
                //{'number': '(11) 3045-2200','type': 'work'}
            ],
            'emails'         : [

            ],
            'social'         : {
                'facebook' : null,
                'twitter'  : null,
                'skype'    : null,
                'linkedIn' : null
            },
            'address'        : {
                'postalCode'     : null,
                'country'        : '',
                'state'          : null,
                'city'           : null,
                'district'       : null,
                'streetName'     : '',
                'streetNumber'   : null,
                'additionalInfo' : ''
            },
            'userOwner'      : {
                'userId' : 0,
                'name'   : ''
            },
            'nickname'       : '',
            'legalName'      : null,
            'cnpj'           : '',
            'description'    : null,
            'website'        : null,
            'createTime'     : '',
            'ranking'        : 0,
            'category'       : 0
        } );
    } );

    it( 'should list all organizations', function ( done )
    {
        $httpBackend.whenGET( BASE_URL + '?per_page=25' ).respond( [
            {
                organizationId : 1,
                nickname       : 'test',
                ranking        : 5,
                createTime     : '2014-08-07T11:39:00',
                category       : { categoryId : 31, name : 'Cliente efetivo' },
                phones         : [
                    {type : 'work', number : '(11) 1234-0000'}
                ],
                avatar         : 'http://lorempixel.com/150/150/people/2'
            }
        ] );

        OrganizationService.get().then(function ( organizations )
        {
            var organization;

            expect( organizations ).toBeDefined();
            expect( organizations.length ).toEqual( 1 );

            organization = organizations[0];

            expect( organization ).toEqual( {
                organizationId : 1,
                nickname       : 'test',
                ranking        : 5,
                createTime     : '2014-08-07T11:39:00',
                category       : 31,
                phoneNumber    : '(11) 1234-0000',
                avatar         : 'http://lorempixel.com/150/150/people/2'
            } );

            done();
        } ).catch( function ()
        {
            expect( 'catch' ).toBe( 'error' );
            done();
        } );

        $httpBackend.flush(); // forces httpBackend to respond
    } );

    it( 'should return a organization', function ( done )
    {
        $httpBackend.whenGET( BASE_URL + '/' + 1 ).respond( {
            organizationId : 1,
            nickname       : 'test',
            ranking        : 5,
            createTime     : '2014-08-07T11:39:00',
            category       : { categoryId : 31, name : 'Cliente efetivo' },
            phones         : [
                {type : 'work', number : '(11) 1234-0000'}
            ],
            avatar         : 'http://lorempixel.com/150/150/people/2'
        } );

        OrganizationService.get( 1 ).then(function ( organization )
        {
            expect( organization ).toBeDefined();

            expect( organization ).toEqual( {
                organizationId : 1,
                nickname       : 'test',
                ranking        : 5,
                createTime     : '2014-08-07T11:39:00',
                category       : 31,
                phoneNumber    : '(11) 1234-0000',
                phones         : [
                    {type : 'work', number : '(11) 1234-0000'}
                ],
                avatar         : 'http://lorempixel.com/150/150/people/2'
            } );

            done();
        } ).catch( function ()
        {
            expect( 'catch' ).toBe( 'error' );
            done();
        } );

        $httpBackend.flush(); // forces httpBackend to respond
    } );

    it( 'should update a organization ranking', function ( done )
    {
        $httpBackend.whenPUT( BASE_URL + '/' + 1 ).respond( {
            organizationId : 1,
            nickname       : 'test',
            ranking        : 5,
            createTime     : '2014-08-07T11:39:00',
            category       : { categoryId : 31, name : 'Cliente efetivo' },
            phones         : [
                {type : 'work', number : '(11) 1234-0000'}
            ],
            avatar         : 'http://lorempixel.com/150/150/people/2'
        } );

        OrganizationService.updateRanking( 1, 5 ).then(function ( organization )
        {
            expect( organization ).toBeDefined();
            expect( organization.ranking ).toBe( 5 );

            done();
        } ).catch( function ()
        {
            expect( 'catch' ).toBe( 'error' );
            done();
        } );

        $httpBackend.flush(); // forces httpBackend to respond
    } );

    it( 'should delete a organization', function ( done )
    {
        $httpBackend.whenDELETE( BASE_URL + '/' + 1 ).respond( {} );

        OrganizationService.delete( 1 ).then(function ()
        {
            done();
        } ).catch( function ()
        {
            expect( 'catch' ).toBe( 'error' );
            done();
        } );

        $httpBackend.flush(); // forces httpBackend to respond
    } );

    it( 'should insert a new organization', function ( done )
    {
        $httpBackend.whenPOST( BASE_URL + '?per_page=25' ).respond( function ( method, url, data )
        {
            data = JSON.parse( data );

            data.organizationId = 2;
            data.createTime = '2014-08-07T14:25:00';
            data.category = { categoryId : 31, name : 'Cliente efetivo' };
            data.phones = [
                {type : 'work', number : '(11) 1234-0000'}
            ];

            return [200, data, {}];
        } );

        var _organization = {
            organizationId : 0, // new organization flag
            nickname       : 'test',
            ranking        : 5
        };

        OrganizationService.save( _organization ).then(function ( organization )
        {
            expect( organization ).toBeDefined();
            expect( organization.organizationId ).toBe( 2 );
            expect( organization.createTime ).toBe( '2014-08-07T14:25:00' );

            done();
        } ).catch( function ()
        {
            expect( 'catch' ).toBe( 'error' );
            done();
        } );

        $httpBackend.flush(); // forces httpBackend to respond
    } );

    it( 'should update a organization data', function ( done )
    {
        $httpBackend.whenPUT( BASE_URL + '/' + 1 ).respond( function ( method, url, data )
        {
            return [200, JSON.parse( data ), {}];
        } );

        var _organization = {
            organizationId : 1,
            nickname       : 'test',
            ranking        : 5
        };

        OrganizationService.save( _organization ).then(function ( organization )
        {
            // serializer adds this field
            _organization.avatar = 'http://lorempixel.com/150/150/people/2';

            expect( organization ).toEqual( _organization );

            done();
        } ).catch( function ()
        {
            expect( 'catch' ).toBe( 'error' );
            done();
        } );

        $httpBackend.flush(); // forces httpBackend to respond
    } );

} );
