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

    ctrl.getCategory = function (categoryId) {
        var category = categories.filter(function ( category ) {
            return category.categoryId === +categoryId;
        })[0];

        return !!category && category.name;
    };

    ctrl.saveAction = function ()
    {
        return OrganizationService.save( ctrl.organization ).then(function ()
        {
            toastr.success( 'Empresa salva com sucesso' );
            $location.path( '/' );
        } ).catch( function (response)
        {
            toastr.error( response.data.message, 'Houve um erro ao salvar a empresa' );
        } );
    };

    ctrl.deleteAction = function ()
    {
        if ( confirm( 'Deseja realmente excluir esta empresa?\nTodo o histórico de relacionamento será perdido.' ) )
        {
            return OrganizationService.delete( ctrl.organization.organizationId ).then(function ()
            {
                toastr.success( 'Empresa excluída com sucesso' );
                $location.path( '/' );
            } ).catch( function (response)
            {
                toastr.error( response.data.message, 'Houve um erro ao excluir a empresa' );
            } );
        }

        return false;
    };
} );
