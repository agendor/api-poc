/**
 * @ref http://wintellect.com/blogs/nstieglitz/ember-components-%E2%80%93-build-a-star-rating-component
 */

EmberApp.AgRankingComponent = Ember.Component.extend( {
    stars          : [],
    ranking        : 0,
    currentRanking : -1,
    initiated      : false,

    actions : {
        click : function ( star )
        {
            var ranking = this.get( 'ranking' );
            var index = star.index;
            var i;

            if ( index === ranking )
            {
                index = 0;
            }

            this.set( 'ranking', index );
            this.sendAction( 'action', index );
        }
    },

    mouseEnter : function ()
    {
        this.set( 'currentRanking', 0 );
    },

    mouseLeave : function ()
    {
        var ranking = this.get( 'ranking' );
        this.set( 'currentRanking', ranking );
    },

    _init : function ()
    {
        var initiated = this.get( 'initiated' );
        var stars, i, ranking;

        if ( initiated )
        {
            stars = [];
            ranking = this.get( 'currentRanking' );
            for ( i = 5; i > 0; i-- )
            {
                stars.pushObject( Ember.Object.create( {active : i <= ranking, index : i} ) );
            }
            this.set( 'stars', stars );
        }
        else
        {
            this.set( 'initiated', true );
            Ember.run.scheduleOnce( 'afterRender', this, this.mouseLeave );
        }
    }.observes( 'currentRanking', 'ranking' ).on( 'didInsertElement' )
} );
