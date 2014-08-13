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

    contentArrayDidChange : function ( array, start, removeAmt, addAmt )
    {
        return this;
    },

    actions : {
        updateRanking : function ( ranking )
        {
            var isDirty = this.get( 'isDirty' );

            this.set( 'ranking', ranking );
            this.set( 'isDirty', isDirty );

            this.get( 'model' ).updateRanking();
        },
        save          : function ()
        {
            var ctrl = this;
            var _aCtrl = this.controllerFor('organizations');
            var isValid = this.validate();

            if ( isValid )
            {
                this.get( 'model' ).save().done(function ( updated )
                {
                    toastr.success( 'Empresa salva com sucesso' );

                    ctrl.set( 'model', updated );
                    // _aCtrl.get('model' ).reset();
                    _aCtrl.reset();

                    ctrl.transitionToRoute( 'organizations' );
                } ).fail( function ()
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
                var _aCtrl = this.controllerFor('organizations');

                this.get( 'model' ).delete().done(function ()
                {
                    toastr.success( 'Empresa excluída com sucesso' );

                    ctrl.get( 'model' ).destroy();
                    _aCtrl.removeObject(ctrl.get( 'model' ));

                    ctrl.transitionToRoute( 'organizations' );
                } ).fail( function ()
                {
                    toastr.error( 'Houve um erro ao excluir a empresa' );
                } );
            }
        }
    }
} );
