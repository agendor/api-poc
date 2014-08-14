/*global Ember, $*/

// ----------------------------------- ORGANIZATION
EmberApp.Organization = Ember.Object.extend( EmberApp.Serializable, Ember.Copyable, {
    propertyNames : [
        'nickname', 'legalName', 'ranking', 'cnpj', 'website', 'category', 'phones', 'address', 'social'
    ],

    organizationId : 0,
    nickname       : '',
    legalName      : '',
    ranking        : 0,
    cnpj           : '',
    website        : '',
    category       : 31,
    phones         : [
        {
            number : '',
            type   : 'work'
        },
        {
            number : '',
            type   : 'mobile'
        },
        {
            number : '',
            type   : 'fax'
        }
    ],
    address        : {
        postalCode     : '',
        country        : '',
        state          : '',
        city           : '',
        district       : '',
        streetName     : '',
        streetNumber   : 0,
        additionalInfo : ''
    },
    social         : {
        facebook : '',
        twitter  : '',
        skype    : '',
        linkedIn : ''
    },

    avatar : function ()
    {
        return 'http://lorempixel.com/150/150/people/' + ((+this.get( 'organizationId' ) % 10) + 1);
    }.property( 'organizationId' ),

    phoneNumber : function ( key, value )
    {
        var phones = this.get( 'phones' );
        var phone, isDirty;

        if ( !phones || !phones.length )
        {
            phones = [
                { type : 'work', number : null }
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

    categoryName : function ()
    {
        return EmberApp.Category.FIXTURES.findBy( 'categoryId', this.get( 'category' ) );
    }.property( 'category' ),

    isDirty : false,

    isNew : function ()
    {
        return +this.get( 'organizationId' ) === 0;
    }.property( 'organizationId' ),

    /** overrides Ember.Copyable */
    copy : function ()
    {
        return EmberApp.Organization.createRecord( JSON.parse( this.serialize() ) );
    },

    validate : function ()
    {
        var nickname = this.get( 'nickname' );
        return !!(nickname && nickname.trim());
    }
} );

EmberApp.Organization.reopenClass( {

    set : function ( property, value )
    {
        if ( property !== 'isDirty' ) // avoids infinite recursion
        {
            this.set( 'isDirty', true );
        }
        return this._super( property, value );
    },

    createRecord : function ( data )
    {
        if ( data.category && data.category.categoryId )
        {
            data.category = data.category.categoryId;
        }

        return EmberApp.Organization.create( data );
    },

    updateRanking : function ()
    {
        var self = this;

        return Ember.RSVP.Promise( function ( resolve, reject )
        {
            if ( self.get( 'isNew' ) )
            {
                reject( 'Can\'t update new record' );
            }
            else
            {
                EmberApp.Adapter.ajax( '/organizations/' + self.get( 'organizationId' ), {
                    type : 'PUT',
                    data : JSON.stringify( { ranking : self.get( 'ranking' ) } )
                } ).done(function ()
                {
                    resolve( true );
                } ).fail( function ()
                {
                    reject( 'unexpected server error PUT ranking' );
                } );
            }
        } );
    },
    save          : function ()
    {
        var self = this;

        if ( this.get( 'isNew' ) )
        {
            return Ember.RSVP.Promise( function ( resolve, reject )
            {
                EmberApp.Adapter.ajax( '/organizations', {
                    type : 'POST',
                    data : self.serialize()
                } ).done(function ( response )
                {
                    self.deserialize( response );

                    self.set( 'isDirty', false );
                    self.set( 'isNew', false );

                    resolve( self );
                } ).fail( function ()
                {
                    reject( 'unexpected server error on POST' );
                } );
            } );
        }
        else
        {
            return Ember.RSVP.Promise( function ( resolve, reject )
            {
                EmberApp.Adapter.ajax( '/organizations/' + self.get( 'organizationId' ), {
                    type : 'PUT',
                    data : this.serialize()
                } ).done(function ( response )
                {
                    self.deserialize( response );

                    self.set( 'isDirty', false );

                    resolve( self );
                } ).fail( function ()
                {
                    reject( 'unexpected server error on PUT' );
                } );
            } );
        }
        /*
         var _clone = JSON.parse( this.serialize() );

         if ( _clone.category && _clone.category.categoryId )
         {
         _clone.category = +_clone.category.categoryId;
         }

         this.deserialize( _clone );
         */
    }
} );
