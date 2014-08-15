EmberApp.OrganizationRoute = Ember.Route.extend( {

    model : function ( params )
    {
        var organization;

        if ( params.organizationId === 'nova' )
        {
            return Ember.RSVP.resolve( EmberApp.Organization.createRecord( { organizationId : 0 } ) );
        }

        organization = this.modelFor( 'organizations' ).findBy( 'organizationId', +params.organizationId ).copy();

        return Ember.RSVP.resolve( organization );
    }
} );
