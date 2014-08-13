EmberApp.OrganizationDetailsComponent = Ember.Component.extend( {
    actions : {
        updateRanking : function ( ranking )
        {
            var organization = this.get('organization');

            organization.set('ranking', ranking);
            organization.set('isDirty', false);

            organization.updateRanking();
        }
    }
} );
