Ember.Router.map( function ()
{
    this.resource( 'organizations', {path : '/empresas'}, function ()
    {
        this.resource( 'organization', { path : '/:organizationId' } );
    } );
} );

EmberApp.IndexRoute = Ember.Route.extend( {
    beforeModel : function ()
    {
        this.transitionTo( 'organizations' );
    }
} );
