/*global Ember, $*/

var BASE_URL = 'http://localhost:8000';

/**
 * @ref http://stackoverflow.com/a/10260347
 */
EmberApp.Serializable = Ember.Mixin.create( {
    serialize : function ()
    {
        var propertyNames = this.get( 'propertyNames' ) || [];
        return JSON.stringify( this.getProperties( propertyNames ) );
    },

    deserialize : function ( hash )
    {
        this.setProperties( hash );
    }
} );

// ----------------------------------- ORGANIZATION
EmberApp.Organization = Ember.Object.extend( EmberApp.Serializable, {
    propertyNames : [
        'nickname', 'phones', 'ranking', 'cnpj', 'website'
    ],

    avatar : function ()
    {
        var id = this.get( 'organizationId' );

        id = (+id % 10) + 1;

        return 'http://lorempixel.com/150/150/people/' + id;

    }.property( 'organizationId' ),

    inCategory : function ()
    {
        console.log(EmberApp.Category.get( 31 ));
        return EmberApp.Category.get( 31 );
    }.property(),

    phoneNumber : function ( key, value )
    {
        var phones = this.get( 'phones' );

        if ( !phones || !phones.length )
        {
            phones = [
                {
                    type : 'mobile', number : null
                }
            ];
        }

        if ( arguments.length > 1 )
        {
            phones[0].number = value;
        }

        this.set( 'phones', phones );

        return phones[0];
    }.property( 'phones' ),

    isDirty : false,

    isNew : function ()
    {
        var id = this.get( 'organizationId' );
        return +id === 0;
    }.property( 'organizationId' ),

    validate : function ()
    {
        return true;
    },

    set : function ( property, value )
    {
        if ( property !== 'isDirty' ) // avoids infinite recursion
        {
            this.set( 'isDirty', true );
        }
        return this._super( property, value );
    },

    updateRanking : function ()
    {
        var deferred = $.Deferred();

        var ranking = this.get( 'ranking' );

        if ( this.get( 'organizationId' ) === 0 )
        {
            deferred.reject( 'Can\'t update new record' );
        }
        else
        {
            $.ajax( {
                url  : BASE_URL + '/organizations/' + this.get( 'organizationId' ),
                type : 'PUT',
                data : JSON.stringify( { ranking : this.get( 'ranking' ) } )
            } ).done(function ()
            {
                deferred.resolve( true );
            } ).fail( function ()
            {
                deferred.reject( 'unexpected server error PUT ranking' );
            } );
        }

        return deferred.promise();
    },
    save          : function ()
    {
        var deferred = $.Deferred();

        var self = this;

        if ( this.get( 'organizationId' ) === 0 )
        {
            $.ajax( {
                url  : BASE_URL + '/organizations',
                type : 'POST',
                data : this.serialize()
            } ).done(function ( response )
            {
                self.deserialize( response );

                self.set( 'isDirty', false );
                self.set( 'isNew', false );

                deferred.resolve( self );
            } ).fail( function ()
            {
                deferred.reject( 'unexpected server error on POST' );
            } );
        }
        else
        {
            $.ajax( {
                url  : BASE_URL + '/organizations/' + this.get( 'organizationId' ),
                type : 'PUT',
                data : this.serialize()
            } ).done(function ( response )
            {
                self.deserialize( response );

                self.set( 'isDirty', false );

                deferred.resolve( self );
            } ).fail( function ()
            {
                deferred.reject( 'unexpected server error on PUT' );
            } );
        }

        return deferred.promise();
    },
    'delete'      : function ()
    {
        var deferred = $.Deferred();

        if ( this.get( 'organizationId' ) === 0 )
        {
            deferred.reject( 'Can\'t delete a new organization' );
        }
        else
        {
            $.ajax( {
                url  : BASE_URL + '/organizations/' + this.get( 'organizationId' ),
                type : 'DELETE'
            } ).done(function ()
            {
                deferred.resolve( true );
            } ).fail( function ()
            {
                deferred.reject( 'unexpected server error on DELETE' );
            } );
        }

        return deferred.promise();
    }
} );

EmberApp.Organization.all = function ()
{
    var deferred = $.Deferred();

    $.ajax( {
        url  : BASE_URL + '/organizations',
        type : 'GET'
    } ).done(function ( response )
    {
        deferred.resolve( response.map( function ( item )
        {
            return EmberApp.Organization.create( item );
        } ) );
    } ).fail( function ()
    {
        deferred.reject( 'unexpected server error on GET all' );
    } );

    return deferred.promise();
};

EmberApp.Organization.get = function ( id )
{
    var deferred = $.Deferred();

    id = +id;

    if ( typeof id === 'number' && id > 0 )
    {
        $.ajax( {
            url  : BASE_URL + '/organizations/' + id,
            type : 'GET'
        } ).done(function ( response )
        {
            deferred.resolve( EmberApp.Organization.create( response ) );
        } ).fail( function ()
        {
            deferred.reject( 'unexpected server error on GET ' + id );
        } );
    }
    else
    {
        deferred.resolve( EmberApp.Organization.create( {organizationId : 0} ) );
    }

    return deferred.promise();
};

// ----------------------------------- CATEGORY

EmberApp.Category = Ember.Object.extend();

EmberApp.Category.get = function ( id )
{
    return EmberApp.Category.FIXTURES.filter( function ( category )
    {
        return category.categoryId === +id;
    } );
};

EmberApp.Category.FIXTURES = [
    EmberApp.Category.create( {
        categoryId : 31,
        name       : 'Cliente efetivo'
    } ),
    EmberApp.Category.create( {
        categoryId : 32,
        name       : 'Cliente em potencial'
    } ),
    EmberApp.Category.create( {
        categoryId : 33,
        name       : 'Concorrente'
    } ),
    EmberApp.Category.create( {
        categoryId : 34,
        name       : 'Fornecedor'
    } ),
    EmberApp.Category.create( {
        categoryId : 35,
        name       : 'Parceiro'
    } )
];
