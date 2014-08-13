/*global Ember, $*/

// ----------------------------------- ORGANIZATION
EmberApp.Organization = Ember.Object.extend( EmberApp.Serializable, {
    propertyNames : [
        'nickname', 'phones', 'ranking', 'cnpj', 'website', 'category', 'address'
    ],

    avatar : function ()
    {
        var id = this.get( 'organizationId' );

        id = (+id % 10) + 1;

        return 'http://lorempixel.com/150/150/people/' + id;

    }.property( 'organizationId' ),

    phoneNumber : function ( key, value )
    {
        var phones = this.get( 'phones' );
        var phone, isDirty;

        if ( !phones || !phones.length )
        {
            phones = [
                {
                    type : 'work', number : null
                }
            ];
        }

        phone = phones.filter( function ( item )
        {
            return item.type === 'work';
        } )[0] || null;

        if ( !phone )
        {
            phone = { type : 'work', number : null };
            phones.push( phone );
        }

        isDirty = this.get( 'isDirty' );

        if ( arguments.length > 1 )
        {
            phone.number = value;
            isDirty = true;
        }

        this.set( 'phones', phones );
        this.set( 'isDirty', isDirty );

        return phone;
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
                url  : EmberApp.BASE_URL + '/organizations/' + this.get( 'organizationId' ),
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
                url  : EmberApp.BASE_URL + '/organizations',
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
                url  : EmberApp.BASE_URL + '/organizations/' + this.get( 'organizationId' ),
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
                url  : EmberApp.BASE_URL + '/organizations/' + this.get( 'organizationId' ),
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
        url  : EmberApp.BASE_URL + '/organizations',
        type : 'GET'
    } ).done(function ( response )
    {
        deferred.resolve( response.map( function ( item )
        {
            if ( item.category )
            {
                item.category = EmberApp.Category.get( item.category.categoryId );
            }

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
            url  : EmberApp.BASE_URL + '/organizations/' + id,
            type : 'GET'
        } ).done(function ( item )
        {
            if ( item.category )
            {
                item.category = EmberApp.Category.get( item.category.categoryId );
            }

            deferred.resolve( EmberApp.Organization.create( item ) );
        } ).fail( function ()
        {
            deferred.reject( 'unexpected server error on GET ' + id );
        } );
    }
    else
    {
        deferred.resolve( EmberApp.Organization.create( {organizationId : 0, phones : []} ) );
    }

    return deferred.promise();
};
