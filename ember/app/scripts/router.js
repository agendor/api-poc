Ember.Router.map( function ()
{
    this.resource( 'organizations', {path : '/empresas'}, function ()
    {
        this.resource( 'organization', { path : '/:organizationId' } );
    } );
} );

