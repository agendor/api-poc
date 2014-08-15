/*jshint newcap: false */
'use strict';

/**
 * removes empty attributes
 * @param {object} obj
 * @param {number} [level]
 * @returns {object}
 * @private
 */
var _stripEmptyAttributes = function _stripEmptyAttributes ( obj, level )
{
    level = level || 0;

    if ( level > 3 )
    {
        return obj;
    }

    /**
     * checks if an object has no properties
     * @param {object} obj
     * @returns {boolean}
     * @private
     */
    var _isEmptyObject = function ( obj )
    {
        for ( var attribute in obj )
        {
            if ( obj.hasOwnProperty( attribute ) )
            {
                return false;
            }
        }
        return true;
    };

    for ( var attribute in obj )
    {
        if ( obj.hasOwnProperty( attribute ) )
        {
            if ( angular.isObject( obj[attribute] ) )
            {
                obj[attribute] = _stripEmptyAttributes( obj[attribute], level + 1 );

                if ( _isEmptyObject( obj[attribute] ) )
                {
                    delete obj[attribute];
                }

                continue;
            }

            if ( angular.isArray( obj[attribute] ) && !obj[attribute].length )
            {
                delete obj[attribute];
                continue;
            }

            if ( !obj[attribute] )
            {
                delete obj[attribute];
            }
        }
    }

    return obj;
};

/**
 * @ngdoc service
 * @name angularApp.OrganizationService
 * @description
 * # OrganizationService
 * Service in the angularApp.
 */
angular.module( 'angularApp' ).service( 'OrganizationService', [
    '$q', '$http', 'DSCacheFactory', 'BASE_URL', function ( $q, $http, DSCacheFactory, BASE_URL )
    {
        var dataCache = DSCacheFactory( 'organizationCache', {
            'maxAge'             : 90000,         // Items added to this cache expire after 15 minutes.
            'cacheFlushInterval' : 600000,        // This cache will clear itself every hour.
            'deleteOnExpire'     : 'aggressive'   // Items will be deleted from this cache right when they expire.
        } );

        /**
         * creates endpoint URL
         * @param {number} [id] optional
         * @returns {string}
         * @private
         */
        var _toURL = function ( id )
        {
            return BASE_URL + '/organizations' + ( id ? '/' + id : '?per_page=25' );

        };

        /**
         * returns a stub object for an organization
         * @returns {object}
         * @private
         */
        var _stub = function ()
        {
            return {
                'organizationId' : 0,
                'customer'       : {
                    'customerId' : 0,
                    'name'       : ''
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
                    'country'        : '',
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
                'category'       : 0
            };
        };

        /**
         * serializes data berfore sending server
         * @param {object} organization
         * @returns {object}
         * @private
         */
        var _serialize = function ( organization )
        {
            var _phone;

            if ( organization.phoneNumber )
            {
                if ( organization.phones && organization.phones.length )
                {
                    _phone = organization.phones.filter( function ( item )
                    {
                        return item.type === 'work';
                    } )[0] || undefined;

                    if ( _phone )
                    {
                        _phone.number = organization.phoneNumber;
                    }
                    else
                    {
                        organization.phones.push( {'type' : 'work', 'number' : organization.phoneNumber} );
                    }
                }
                else
                {
                    organization.phones = [
                        {'type' : 'work', 'number' : organization.phoneNumber}
                    ];
                }
            }
            delete organization.phoneNumber;

            delete organization.avatar;
            delete organization.createTime;
            delete organization.user;
            delete organization.customer;
            delete organization.userOwner;

            return _stripEmptyAttributes( organization );
        };

        /**
         * serializes data from server
         * @param {object|string} data
         * @returns {object}
         * @private
         */
        var _deserialize = function ( data )
        {
            var organization = angular.extend( _stub(), data );
            var _phone;

            if ( organization.category && organization.category.categoryId )
            {
                organization.category = organization.category.categoryId;
            }
            else
            {
                organization.category = undefined;
            }

            organization.avatar = 'http://lorempixel.com/150/150/people/' + ( (+organization.organizationId % 10) + 1 );

            if ( organization.phones && organization.phones.length )
            {
                _phone = organization.phones.filter( function ( item )
                {
                    return item.type === 'work';
                } )[0] || undefined;

                if ( _phone )
                {
                    organization.phoneNumber = _phone.number;
                }
            }
            else
            {
                organization.phoneNumber = undefined;
            }

            return _stripEmptyAttributes( organization );
        };

        /**
         * list all organizations
         * @returns {promise|Promise.promise|Q.promise}
         * @private
         */
        var _getAll = function ()
        {
            var deferred = $q.defer();

            $http.get( _toURL(), { 'cache' : dataCache } ).then(function ( response )
            {
                var organizations = response.data.map( function ( organization )
                {
                    organization = _deserialize( organization );

                    dataCache.put( _toURL( organization.organizationId ), organization );

                    return {
                        'organizationId' : organization.organizationId,
                        'nickname'       : organization.nickname,
                        'ranking'        : organization.ranking,
                        'createTime'     : organization.createTime,
                        'category'       : organization.category,
                        'phoneNumber'    : organization.phoneNumber,
                        'avatar'         : organization.avatar
                    };

                } );

                return deferred.resolve( organizations );
            } ).catch( deferred.reject );

            return deferred.promise;
        };

        /**
         * returns a organization
         * @param {number} id
         * @returns {promise|Promise.promise|Q.promise}
         * @private
         */
        var _getById = function ( id )
        {
            var deferred = $q.defer();

            var organization = dataCache.get( _toURL( id ) );

            if ( organization && organization.nickname )
            {
                deferred.resolve( organization );
                return deferred.promise;
            }

            $http.get( _toURL( id ), { 'cache' : dataCache } ).then(function ( response )
            {
                var organization = _deserialize( response.data );

                dataCache.put( _toURL( id ), organization );

                return deferred.resolve( organization );
            } ).catch( deferred.reject );

            return deferred.promise;
        };

        /**
         * Updates the ranking for an existing  organization
         * @param {number} id
         * @param {number} raking
         * @returns {promise|Promise.promise|Q.promise}
         * @private
         */
        var _putRanking = function ( id, raking )
        {
            var deferred = $q.defer();

            $http.put( _toURL( id ), { 'ranking' : raking } ).then(function ( response )
            {
                var organization = _deserialize( response.data );

                dataCache.put( _toURL( id ), organization );
                dataCache.remove( _toURL() );

                return deferred.resolve( organization );
            } ).catch( deferred.reject );

            return deferred.promise;
        };

        /**
         * deletes a organization
         * @param {number} id
         * @returns {promise|Promise.promise|Q.promise}
         * @private
         */
        var _delete = function ( id )
        {
            var deferred = $q.defer();

            $http.delete( _toURL( id ) ).then(function ()
            {
                dataCache.remove( _toURL( id ) );
                dataCache.remove( _toURL() );

                return deferred.resolve();
            } ).catch( deferred.reject );

            return deferred.promise;
        };

        /**
         * inserts a new organization
         * @param {object} organization
         * @returns {promise|Promise.promise|Q.promise}
         * @private
         */
        var _post = function ( organization )
        {
            var deferred = $q.defer();

            $http.post( _toURL(), _serialize( organization ) ).then(function ( response )
            {
                var organization = _deserialize( response.data );

                dataCache.put( _toURL( organization.organizationId ), organization );
                dataCache.remove( _toURL() );

                return deferred.resolve( organization );
            } ).catch( deferred.reject );

            return deferred.promise;
        };

        /**
         * updates a organization
         * @param {number} id
         * @param {object} organization
         * @returns {promise|Promise.promise|Q.promise}
         * @private
         */
        var _put = function ( id, organization )
        {
            var deferred = $q.defer();

            $http.put( _toURL( id ), _serialize( organization ) ).then(function ( response )
            {
                var organization = _deserialize( response.data );

                dataCache.put( _toURL( id ), organization );
                dataCache.remove( _toURL() );

                return deferred.resolve( organization );
            } ).catch( deferred.reject );

            return deferred.promise;
        };

        /**
         * exposed API
         */
        return {
            'stub'          : _stub,
            'get'           : function ( id )
            {
                return id ? _getById( id ) : _getAll();
            },
            'updateRanking' : _putRanking,
            'delete'        : _delete,
            'save'          : function ( organization )
            {
                return +organization.organizationId ? _put( +organization.organizationId, organization ) :
                _post( organization );
            }
        };
    }
] );
