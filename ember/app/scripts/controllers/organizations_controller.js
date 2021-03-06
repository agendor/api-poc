EmberApp.OrganizationsIndexController = Ember.ArrayController.extend( {
    totalCount : Ember.computed.alias( 'length' ),

    isFiltered : false,

    filter : '',

    filteredContent : function ()
    {
        var filter = this.get( 'filter' ).trim();
        var re = new RegExp( filter, 'gi' );

        this.set( 'isFiltered', filter.length > 0 );

        return this.get( 'arrangedContent' ).filter( function ( organization )
        {
            return organization.get( 'nickname' ).match( re ) &&
            !(organization.get( 'isDestroying' ) || organization.get( 'isDestroyed' ));
        } );
    }.property( 'filter', 'arrangedContent.@each' ),

    filteredCount : function ()
    {
        return this.get( 'filteredContent' ).get( 'length' );
    }.property( 'filteredContent.length' ),

    orders : [
        { label : 'Ranking (maior > menor)', property : 'ranking', ascending : false },
        { label : 'Ranking (menor > maior)', property : 'ranking', ascending : true },
        { label : 'Ordem alfabética', property : 'nickname', ascending : true },
        { label : 'Data de cadastro (recente > antigo)', property : 'createTime', ascending : false },
        { label : 'Data de cadastro (antigo > recente)', property : 'createTime', ascending : true }
    ],

    order : null,

    orderChanged : function ()
    {
        var order = this.get( 'order' );

        this.set( 'sortAscending', order.ascending );
        this.set( 'sortProperties', [order.property] );

    }.observes( 'order', 'filteredContent.@each' ),

    init : function ()
    {
        var orders = this.get( 'orders' );

        this.set( 'order', orders.findBy( 'property', 'nickname' ) );
        this.set( 'sortAscending', true );
        this.set( 'sortProperties', ['nickname'] );

        this._super();
    }
} );
