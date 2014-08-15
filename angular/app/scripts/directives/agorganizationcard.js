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
        template  : '<div class="ag-card">\n    <div class="row">\n        <div class="col-xs-3">\n            <img class="img-responsive img-thumbnail" src="" data-ng-src="{{ctrl.organization.avatar}}">\n        </div>\n        <div class="col-xs-9">\n            <h3>{{ctrl.organization.nickname}}</h3>\n            <p><strong>Categoria:</strong> {{ctrl.category || \'Não informada\'}}</p>\n            <p><strong>Telefone:</strong> {{ctrl.organization.phoneNumber || \'Não informado\'}}</p>\n        </div>\n    </div>\n    <div class="ag-card-info">\n        <ag-ranking ranking="ctrl.ranking" ng-click="ctrl.updateRanking(ctrl.ranking)"></ag-ranking>\n    </div>\n    <ul class="ag-card-options">\n        <li><a href="./#/edit/{{ctrl.organization.organizationId}}">Editar</a></li>\n    </ul>\n</div>',
        restrict     : 'EAC',
        scope        : {
            organization : '='
        },
        replace      : true,
        controllerAs : 'ctrl',
        controller   : function ( $scope, OrganizationService, CategoryService )
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
    };
} );
