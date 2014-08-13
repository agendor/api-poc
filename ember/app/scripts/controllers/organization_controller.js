/* global toastr, confirm */
EmberApp.OrganizationController = Ember.ObjectController.extend( {

    categories : function ()
    {
        return EmberApp.Category.FIXTURES;
    }.property(),

    cities : ['Caxias do Sul', 'Fortaleza', 'São Paulo'],

    states : [
        { acronym : 'CE', name : 'Ceará' },
        { acronym : 'RS', name : 'Rio Grande do Sul' },
        { acronym : 'SP', name : 'São Paulo' }
    ],

    name : function ()
    {
        var nickname = this.get( 'nickname' );

        return nickname ? nickname : (this.get( 'isNew' ) ? 'Adicionar nova' : 'Informe o nome');
    }.property( 'nickname' ),

    showNewLabel : function ()
    {
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
            var isDirty = this.get('isDirty');

            this.set('ranking', ranking);
            this.set('isDirty', isDirty);

            this.get('model').updateRanking();
        },
        save          : function ()
        {
            var ctrl = this;
            var isValid = this.validate();

            if ( isValid )
            {
                this.get( 'model' ).save().then(function ()
                {
                    toastr.success( 'Empresa salva com sucesso' );
                    ctrl.transitionToRoute( 'organizations' );
                } ).catch( function ()
                {
                    toastr.error( 'Houve um erro ao salvar a empresa' );
                } );
            }
            else
            {
                toastr.warning( 'Por favor verifique o preenchimento dos campos' );
            }

        },
        deleteRecord  : function ()
        {
            if ( confirm( 'Deseja realmente excluir esta empresa?\nTodo o histórico de relacionamento será perdido.' ) )
            {
                var ctrl = this;

                this.get( 'model' ).destroyRecord().then(function ()
                {
                    toastr.success( 'Empresa excluída com sucesso' );
                    ctrl.transitionToRoute( 'organizations' );
                } ).catch( function ()
                {
                    toastr.error( 'Houve um erro ao excluir a empresa' );
                } );
            }
        }
    }
} );
