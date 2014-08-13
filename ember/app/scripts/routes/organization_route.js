EmberApp.OrganizationRoute = Ember.Route.extend( {
    model      : function ( params )
    {
        return EmberApp.Organization.get( params.organizationId );
    }
} );

