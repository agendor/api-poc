'use strict';

/**
 * @ngdoc service
 * @name angularApp.OrganizationService
 * @description
 * # OrganizationService
 * Service in the angularApp.
 */
angular.module( 'angularApp' ).service( 'OrganizationService',
function OrganizationService ( $q, $http, DSCacheFactory, CategoryService )
{
    var BASE_URL = 'http://localhost:8000/organizations';

    var toURL = function ( id )
    {
        return BASE_URL + ( id ? '/' + id : '' );

    };

    var dataCache = DSCacheFactory( 'organizationCache', {
        maxAge             : 90000,         // Items added to this cache expire after 15 minutes.
        cacheFlushInterval : 600000,        // This cache will clear itself every hour.
        deleteOnExpire     : 'aggressive'   // Items will be deleted from this cache right when they expire.
    } );

    var empty = function ()
    {
        return {
            'organizationId' : 0,
            'customer'       : {
                'customerId' : 0,
                'name'       : '0'
            },
            'user'           : {
                'userId' : 0
            },
            'phones'         : [
                //{'number': '(11) 3045-2200','type': 'work'}
            ],
            'emails'         : [

            ],
            'social'         : {
                'facebook' : null,
                'twitter'  : null,
                'skype'    : null,
                'linkedIn' : null
            },
            'address'        : {
                'postalCode'     : null,
                'country'        : 'Brasil',
                'state'          : null,
                'city'           : null,
                'district'       : null,
                'streetName'     : '',
                'streetNumber'   : null,
                'additionalInfo' : ''
            },
            'userOwner'      : {
                'userId' : 0,
                'name'   : ''
            },
            'nickname'       : '',
            'legalName'      : null,
            'cnpj'           : '',
            'description'    : null,
            'website'        : null,
            'createTime'     : '',
            'ranking'        : 0,
            'categoryId'     : 31 // TODO: get from API
        };
    };

    var getAll = function ()
    {
        var deferred = $q.defer();

        $http.get( toURL(), {
            cache   : dataCache,
            headers : { 'Authorization' : 'Basic dEB0LmNvbToxMjM='}
        } ).then(function ( response )
        {
            var organizations = response.data.map( function ( organization )
            {
                dataCache.put( toURL( organization.organizationId ), organization );

                return {
                    organizationId : organization.organizationId,
                    nickname       : organization.nickname,
                    ranking        : organization.ranking,
                    createTime     : organization.createTime,
                    category       : 'Cliente efetivo', // TODO: get from API
                    phoneNumber    : organization.phones.length && organization.phones[0].number,
                    avatar         : 'http://lorempixel.com/150/150/nature/9'
                };

            } );

            return deferred.resolve( organizations );
        } ).catch( deferred.reject );

        return deferred.promise;
    };

    var getById = function ( id )
    {
        var deferred = $q.defer();

        if ( id === 'nova' )
        {
            deferred.resolve( empty() );
        }
        else
        {

            $http.get( toURL( id ), {
                cache   : dataCache,
                headers : { 'Authorization' : 'Basic dEB0LmNvbToxMjM='}
            } ).then(function ( response )
            {
                var organization = response.data;

                organization.categoryId = 31; // TODO: get from API
                organization.phoneNumber = organization.phones.length && organization.phones[0].number;
                organization.avatar = 'http://lorempixel.com/150/150/nature/9';

                return deferred.resolve( organization );
            } ).catch( deferred.reject );
        }

        return deferred.promise;
    };

    var updateRanking = function ( id, rating )
    {
        var deferred = $q.defer();

        $http.put( toURL( id ), {
            ranking : rating
        }, {
            headers : { 'Authorization' : 'Basic dEB0LmNvbToxMjM='}
        } ).then(function ( response )
        {
            var organization = response.data;

            dataCache.put( toURL( id ), organization );
            dataCache.remove( toURL() );

            return deferred.resolve( organization );
        } ).catch( deferred.reject );

        return deferred.promise;
    };

    var deleteOrganization = function ( id )
    {
        var deferred = $q.defer();

        $http.delete( toURL( id ), {
            headers : { 'Authorization' : 'Basic dEB0LmNvbToxMjM='}
        } ).then(function ()
        {
            dataCache.remove( toURL( id ) );
            dataCache.remove( toURL() );

            return deferred.resolve();
        } ).catch( deferred.reject );

        return deferred.promise;

    };

    return {
        get           : function ( id )
        {
            return id ? getById( id ) : getAll();
        },
        updateRanking : updateRanking,
        'delete'      : deleteOrganization
    };
} );