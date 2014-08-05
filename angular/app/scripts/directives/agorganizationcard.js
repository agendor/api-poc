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
        templateUrl  : 'scripts/directives/partials/agorganizationcard.html',
        restrict     : 'EAC',
        scope        : {
            organization : '='
        },
        replace      : true,
        controllerAs : 'ctrl',
        controller   : function ( $scope, OrganizationService )
        {
            var ctrl = this;

            ctrl.organization = $scope.organization;

            $scope.$watch( 'ctrl.organization.ranking', function ( newValue, oldValue )
            {
                if ( newValue !== oldValue )
                {
                    OrganizationService.updateRanking( ctrl.organization.organizationId, newValue );
                }
            } );
        }
    };
} );
