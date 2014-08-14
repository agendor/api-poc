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

    actions : {
        save : function ()
        {
            var ctrl = this;

            this.get( 'model' ).save().done(function ()
            {
                toastr.success( 'Empresa salva com sucesso' );
                ctrl.transitionToRoute( 'organizations' );
            } ).fail( function ( message )
            {
                toastr.error( message );
            } );
        },

        'delete' : function ()
        {
            return confirm( 'Deseja realmente excluir esta empresa?\nTodo o histórico de relacionamento será perdido.' );
        }
    }
} );
