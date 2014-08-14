EmberApp.OrganizationsRoute = Ember.Route.extend( {
    model : function ()
    {
        var organizations = [];

        return new Ember.RSVP.Promise( function ( resolve, reject )
        {
            EmberApp.Adapter.ajax( '/organizations' ).done(function ( data )
            {
                data.forEach( function ( item )
                {
                    organizations.pushObject( EmberApp.Organization.createRecord( item ) );
                } );

                resolve( organizations );
            } ).fail( function ( error )
            {
                /** @namespace error.statusText */
                reject( error.statusText || 'unexpected server error' );
            } );
        } );
    }
} );
