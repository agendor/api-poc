EmberApp.OrganizationRoute = Ember.Route.extend( {

    model : function ( params )
    {
        var organization;

        if ( params.organizationId === 'nova' )
        {
            this.set( '_index', -1 );
            return Ember.RSVP.resolve( EmberApp.Organization.createRecord( { organizationId : 0 } ) );
        }

        organization = this.modelFor( 'organizations' ).findBy( 'organizationId', +params.organizationId ).copy();

        organization.set( 'organizationId', +params.organizationId );

        return Ember.RSVP.resolve( organization );
    },

    actions : {
        save     : function ( organization )
        {

        },
        'delete' : function ( organization )
        {
            var self = this;
            var organizations;

            if ( organization.get( 'isNew' ) )
            {
                return Ember.RSVP.reject( 'Can\'t update new record' );
            }

            organizations = this.modelFor( 'organizations' );

            return new Ember.RSVP.Promise( function ( resolve, reject )
            {
                EmberApp.Adapter.ajax( '/organizations/' + organization.get( 'organizationId' ), {
                    type : 'DELETE'
                } ).done(function ()
                {
                    var current = organizations.findBy( 'organizationId', organization.get( 'organizationId' ) );

                    organizations.removeObject( current );

                    toastr.success( 'Empresa excluída com sucesso' );
                    self.transitionTo( 'organizations.index' );

                    resolve( true );
                } ).fail( function ()
                {
                    toastr.error( 'Houve um erro ao excluir a empresa' );
                    reject( 'unexpected server error PUT ranking' );
                } );
            } );
        },

        'updateRanking' : function ( value )
        {
            var organization = this.context;
            var id = organization.get( 'organizationId' );
            var organizations = this.modelFor( 'organizations' );

            if ( organization.get( 'isNew' ) )
            {
                return Ember.RSVP.reject( 'Can\'t update new record' );
            }

            return new Ember.RSVP.Promise( function ( resolve, reject )
            {
                EmberApp.Adapter.ajax( '/organizations/' + id, {
                    type : 'PUT',
                    data : { ranking : value }
                } ).done(function ()
                {
                    organization.set( 'ranking', value );
                    organizations.findBy( 'organizationId', id ).set( 'ranking', value );

                    resolve( true );
                } ).fail( function ()
                {
                    reject( 'unexpected server error PUT ranking' );
                } );
            } );
        }
    }
} );
