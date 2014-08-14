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
        var category = EmberApp.Category.FIXTURES.findBy( 'categoryId', this.get( 'category' ) );

        return category.name;
    }.property( 'category' ),

    isDirty : false,

    isNew : function ()
    {
        return +this.get( 'organizationId' ) === 0;
    }.property( 'organizationId' ),

    /** overrides Ember.Copyable */
    copy : function ()
    {
        var id = +this.get('organizationId');
        var copy = EmberApp.Organization.createRecord( JSON.parse( this.serialize() ) );

        copy.set('organizationId', id);
        copy.set('isDirty', false);

        return copy;
    },

    validate : function ()
    {
        var nickname = this.get( 'nickname' );
        return !!(nickname && nickname.trim());
    },

    set : function ( property, value )
    {
        if ( property !== 'isDirty' ) // avoids infinite recursion
        {
            this.set( 'isDirty', true );
        }
        return this._super( property, value );
    }
} );

// static methods
EmberApp.Organization.reopenClass( {
    createRecord : function ( data )
    {
        var current;

        if ( data.category && data.category.categoryId )
        {
            data.category = data.category.categoryId;
        }

        current = EmberApp.Organization.create( data );

        current.set('isDirty', false);

        return current;
    }
} );
