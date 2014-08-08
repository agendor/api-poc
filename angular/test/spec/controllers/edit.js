'use strict';

describe( 'Controller: EditCtrl', function ()
{
    var ctrl, $$rootScope, OrganizationServiceMock, categoriesMock, organizationMock, deferredMock, toastr, $$location;

    organizationMock = {'organizationId' : 1, 'nickname' : 'Org A', createTime : '2014-08-07T14:40:00', ranking : 4};

    categoriesMock = [
        {'categoryId' : 31, 'name' : 'Cliente efetivo'},
        {'categoryId' : 32, 'name' : 'Cliente em potencial'},
        {'categoryId' : 33, 'name' : 'Concorrente'},
        {'categoryId' : 34, 'name' : 'Fornecedor'},
        {'categoryId' : 35, 'name' : 'Cliente Efetivo'}
    ];

    // load the controller's module
    beforeEach( module( 'angularApp' ) );

    // mocks
    beforeEach( module( function ( $provide )
    {
        OrganizationServiceMock = {
            save     : function ()
            {
                return deferredMock.promise;
            },
            'delete' : function ()
            {
                return deferredMock.promise;
            }
        };

        $provide.value( 'OrganizationService', OrganizationServiceMock );

        toastr = {};

        toastr.success = jasmine.createSpy();
        toastr.error = jasmine.createSpy();

        window.toastr = toastr;
    } ) );

    // Initialize the controller and a mock scope
    beforeEach( inject( function ( $controller, $rootScope, $location, $q )
    {
        var scope = $rootScope.$new();

        $$rootScope = $rootScope;
        $$location = $location;

        spyOn( $$location, 'path' );

        deferredMock = $q.defer();
        deferredMock.resolve();

        ctrl = $controller( 'EditCtrl', {
            $scope              : scope,
            $location           : $location,
            OrganizationService : OrganizationServiceMock,
            categories          : categoriesMock,
            organization        : organizationMock
        } );
    } ) );

    it( 'should create the expected controller bindings to the view', function ()
    {
        expect( ctrl.organization ).toEqual( organizationMock );
        expect( ctrl.categories ).toEqual( categoriesMock );
        expect( ctrl.showAddress ).toBe( false );
        expect( ctrl.showContactInfo ).toBe( false );
        expect( ctrl.showProducts ).toBe( false );
        expect( ctrl.showSocialNetworks ).toBe( false );
        expect( ctrl.showOtherInfo ).toBe( false );
        expect( ctrl.showPeople ).toBe( false );
        expect( ctrl.newOrganization ).toBe( false );
    } );

    it( 'should return a category', function ()
    {
        var _category = ctrl.getCategory( 31 );

        expect( _category ).toEqual( categoriesMock[0].name );
    } );

    it( 'should not return a category', function ()
    {
        var _category = ctrl.getCategory( 0 );

        expect( _category ).toBe( false );
    } );

    it( 'should save a organization', function ( done )
    {
        ctrl.saveAction().then(function ()
        {
            expect( toastr.success ).toHaveBeenCalledWith( 'Empresa salva com sucesso' );
            expect( $$location.path ).toHaveBeenCalledWith( '/' );
            done();
        } ).catch( function ()
        {
            expect( 'catch' ).toBe( 'error' );
            done();
        } );

        $$rootScope.$digest(); // force a digest
    } );

    it( 'should delete a organization', function ( done )
    {
        window.confirm = function ()
        {
            return true;
        };

        ctrl.deleteAction().then(function ()
        {
            expect( toastr.success ).toHaveBeenCalledWith( 'Empresa excluída com sucesso' );
            expect( $$location.path ).toHaveBeenCalledWith( '/' );
            done();
        } ).catch( function ()
        {
            expect( 'catch' ).toBe( 'error' );
            done();
        } );

        $$rootScope.$digest(); // force a digest
    } );

    it( 'should not delete a organization', function ()
    {
        window.confirm = function ()
        {
            return false;
        };

        var _return = ctrl.deleteAction();

        expect( _return ).toBe( false );
    } );
} );
