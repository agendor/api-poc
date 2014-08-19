'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:agOrganizationCard
 * @description
 * # agOrganizationCard
 */
angular.module( 'angularApp' ).directive( 'agOrganizationCard', function ()
{
    return {
        'templateUrl'     : 'templates/agOrganizationCard.html',
        'restrict'     : 'EAC',
        'scope'        : {
            'organization' : '='
        },
        'replace'      : true,
        'controllerAs' : 'ctrl',
        'controller'   : [
            '$scope', 'OrganizationService', 'CategoryService',
            function ( $scope, OrganizationService, CategoryService )
            {
                var ctrl = this;

                ctrl.organization = $scope.organization;

                ctrl.ranking = ctrl.organization.ranking;

                ctrl.category = undefined;

                CategoryService.get( ctrl.organization.category ).then( function ( response )
                {
                    ctrl.category = response.name;
                } );

                ctrl.updateRanking = function ( newRanking )
                {
                    if ( newRanking !== ctrl.organization.ranking )
                    {
                        ctrl.ranking = newRanking;
                        ctrl.organization.ranking = ctrl.ranking;
                        OrganizationService.updateRanking( ctrl.organization.organizationId, newRanking );
                        return true;
                    }

                    return false;
                };
            }
        ]
    };
} );
