EmberApp.OrganizationDetailsComponent = Ember.Component.extend( {
    actions : {
        updateRanking : function ( ranking )
        {
            this.sendAction( 'action', this.get('organization'), ranking );
        }
    }
} );
