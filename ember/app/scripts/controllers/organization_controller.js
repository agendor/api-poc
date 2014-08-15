/* global confirm */
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
    }.property( 'isNew', 'isDirty' ),

    actions : {
        'delete' : function ()
        {
            return confirm( 'Deseja realmente excluir esta empresa?\nTodo o histórico de relacionamento será perdido.' );
        },
        'updateRanking' : function ( index ) {

            if (arguments.length === 1) {
                this.send('updateRanking', this.get('model'), index);
                return false; // stop bubbling
            }
            return true; // bubbles to route
        }
    }
} );
