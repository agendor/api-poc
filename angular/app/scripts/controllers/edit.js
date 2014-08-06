/* global toastr, confirm */
'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:EditCtrl
 * @description
 * # EditCtrl
 * Controller of the angularApp
 */
angular.module( 'angularApp' ).controller( 'EditCtrl',
function ( $scope, $location, OrganizationService, categories, organization )
{
    var ctrl = this;

    ctrl.organization = organization;
    ctrl.categories = categories;

    ctrl.showAddress = false;
    ctrl.showContactInfo = false;
    ctrl.showProducts = false;
    ctrl.showSocialNetworks = false;
    ctrl.showOtherInfo = false;
    ctrl.showPeople = false;

    ctrl.newOrganization = ctrl.organization.organizationId === 0;

    var _saveOrganization = function ()
    {
        OrganizationService.save( ctrl.organization ).then(function ()
        {
            toastr.success( 'Empresa salva com sucesso' );
            $location.path( '/' );
        } ).catch( function ()
        {
            toastr.error( 'Houve um erro ao salvar a empresa' );
        } );
    };

    ctrl.getCategory = function (categoryId) {
        var category = categories.filter(function ( category ) {
            return category.categoryId === +categoryId;
        })[0];

        return category && category.name;
    };

    ctrl.saveAction = function ()
    {
        _saveOrganization();
    };

    ctrl.deleteAction = function ()
    {
        if ( confirm( 'Deseja realmente excluir esta empresa?\nTodo o histórico de relacionamento será perdido.' ) )
        {
            OrganizationService.delete( ctrl.organization.organizationId ).then(function ()
            {
                toastr.success( 'Empresa excluída com sucesso' );
                $location.path( '/' );
            } ).catch( function ()
            {
                toastr.error( 'Houve um erro ao excluir a empresa' );
            } );
        }
    };
} );