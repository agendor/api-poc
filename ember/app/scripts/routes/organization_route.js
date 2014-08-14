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
    },

    actions : {
        save     : function ( organization )
        {
            var self = this;
            var organizations = this.modelFor( 'organizations' );
            var id;

            if ( organization.get( 'isNew' ) )
            {
                return new Ember.RSVP.Promise( function ( resolve, reject )
                {
                    EmberApp.Adapter.ajax( '/organizations', {
                        type : 'POST',
                        data : organization.serialize()
                    } ).done(function ( response )
                    {
                        organization.deserialize( response );
                        organization.set( 'isDirty', false );
                        organization.set( 'isNew', false );

                        organizations.pushObject( organization );

                        toastr.success( 'Empresa criada com sucesso' );
                        self.transitionTo( 'organizations' );

                        resolve( organization );
                    } ).fail( function ()
                    {
                        toastr.error( 'Erro ao criar a empresa' );
                        reject( 'unexpected server error on POST' );
                    } );
                } );
            }
            else
            {
                id = +organization.get( 'organizationId' );

                return new Ember.RSVP.Promise( function ( resolve, reject )
                {
                    EmberApp.Adapter.ajax( '/organizations/' + id, {
                        type : 'PUT',
                        data : organization.serialize()
                    } ).done(function ( response )
                    {
                        var current = organizations.findBy( 'organizationId', id );

                        current.deserialize( response );
                        current.set( 'isDirty', false );

                        organization.destroy();

                        toastr.success( 'Empresa salva com sucesso' );
                        self.transitionTo( 'organizations' );

                        resolve( current );
                    } ).fail( function ()
                    {
                        toastr.error( 'Erro ao salvar a empresa' );
                        reject( 'unexpected server error on PUT' );
                    } );
                } );
            }
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
                    current.destroy();//

                    toastr.success( 'Empresa excluída com sucesso' );
                    self.transitionTo( 'organizations' );

                    resolve( true );
                } ).fail( function ()
                {
                    toastr.error( 'Houve um erro ao excluir a empresa' );
                    reject( 'unexpected server error PUT ranking' );
                } );
            } );
        }
    }
} );
