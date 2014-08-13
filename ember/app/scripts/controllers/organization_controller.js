/* global toastr, confirm */
EmberApp.OrganizationController = Ember.ObjectController.extend( {

    categories: function () {
        return EmberApp.Category.FIXTURES;
    }.property(),

    name : function ()
    {
        var nickname = this.get( 'nickname' );

        return nickname ? nickname : (this.get( 'isNew' ) ? 'Adicionar nova' : 'Informe o nome');
    }.property( 'nickname' ),

    showNewLabel : function ()
    {
        window.rubens = this.get('model');
        return this.get( 'isNew' ) && this.get( 'isDirty' );
    }.property( 'nickname', 'isNew', 'isDirty' ),

    validate : function ()
    {
        var nickname = this.get( 'nickname' );
        return !!(nickname && nickname.trim());
    },

    actions : {
        updateRanking : function ( ranking )
        {
            console.log( 'detail-ctrl', ranking );
        },
        save          : function ()
        {
            var ctrl = this;
            var isValid = this.validate();

            if ( isValid )
            {
                this.get( 'model' ).save().then(function ()
                {
                    toastr.success( 'Empresa salva com sucesso!' );
                    ctrl.transitionToRoute( 'organizations' );
                } ).catch( function ()
                {
                    toastr.error( 'Erro ao salvar a empresa!' );
                } );
            }
            else
            {
                toastr.warning( 'Por favor verifique o preenchimento dos campos' );
            }

        },
        deleteRecord  : function ()
        {
            if ( confirm( 'certeza?' ) )
            {
                var ctrl = this;

                this.get( 'model' ).destroyRecord().then(function ()
                {
                    toastr.success( 'Empresa excluída com sucesso!' );
                    ctrl.transitionToRoute( 'organizations' );
                } ).catch( function ()
                {
                    toastr.error( 'Erro ao excluir a empresa!' );
                } );
            }
        }
    }
} );
