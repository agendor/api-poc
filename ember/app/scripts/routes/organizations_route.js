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
    },

    actions: {
        'updateRanking' : function ( organization, ranking )
        {
            var id = organization.get( 'organizationId' );
            var organizations = this.context;

            if ( organization.get( 'isNew' ) )
            {
                return Ember.RSVP.reject( 'Can\'t update new record' );
            }

            return new Ember.RSVP.Promise( function ( resolve, reject )
            {
                EmberApp.Adapter.ajax( '/organizations/' + id, {
                    type : 'PUT',
                    data : { ranking : ranking }
                } ).done(function ()
                {
                    organization.set( 'ranking', ranking );
                    organizations.findBy( 'organizationId', id ).set( 'ranking', ranking );

                    resolve( true );
                } ).fail( function ()
                {
                    reject( 'unexpected server error PUT ranking' );
                } );
            } );
        }
    }
} );
