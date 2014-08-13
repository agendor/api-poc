EmberApp.OrganizationsRoute = Ember.Route.extend( {
    model : function ( params )
    {
        return EmberApp.Organization.all();
    }
} );

