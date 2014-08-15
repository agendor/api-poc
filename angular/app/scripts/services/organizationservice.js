/*jshint newcap: false */
'use strict';

/**
 * @ngdoc service
 * @name angularApp.OrganizationService
 * @description
 * # OrganizationService
 * Service in the angularApp.
 */
angular.module( 'angularApp' ).service( 'OrganizationService', [
    '$q', '$http', 'DSCacheFactory', function ( $q, $http, DSCacheFactory )
    {
        var BASE_URL = 'http://localhost:8000/organizations';
        var AUTH_TOKEN = 'Basic dEB0LmNvbToxMjM=';

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
            return BASE_URL + ( id ? '/' + id : '' );

        };

        /**
         * checks if an object has no properties
         * @param {object} obj
         * @returns {boolean}
         * @private
         */
        var _isEmptyObject = function _isEmptyObject ( obj )
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
         * list all organizations
         * @returns {promise|Promise.promise|Q.promise}
         * @private
         */
        var _getAll = function ()
        {
            var deferred = $q.defer();

            $http.get( _toURL(), {
                'cache'   : dataCache,
                'headers' : { 'Authorization' : AUTH_TOKEN}
            } ).then(function ( response )
            {
                var organizations = response.data.map( function ( organization )
                {
                    dataCache.put( _toURL( organization.organizationId ), organization );

                    return {
                        'organizationId' : organization.organizationId,
                        'nickname'       : organization.nickname,
                        'ranking'        : organization.ranking,
                        'createTime'     : organization.createTime,
                        'category'       : 31, // TODO: get from API
                        'phoneNumber'    : organization.phones && organization.phones.length &&
                        organization.phones[0].number,
                        'avatar'         : 'http://lorempixel.com/150/150/nature/9'
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

            $http.get( _toURL( id ), {
                'cache'   : dataCache,
                'headers' : { 'Authorization' : AUTH_TOKEN}
            } ).then(function ( response )
            {
                var organization = response.data;

                organization.category = 31; // TODO: get from API
                organization.phoneNumber =
                organization.phones && organization.phones.length && organization.phones[0].number;
                organization.avatar = 'http://lorempixel.com/150/150/nature/9';

                delete organization.phones;

                return deferred.resolve( angular.copy( organization ) );
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

            $http.put( _toURL( id ), {
                'ranking' : raking
            }, {
                'headers' : { 'Authorization' : AUTH_TOKEN}
            } ).then(function ( response )
            {
                var organization = response.data;

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

            $http.delete( _toURL( id ), {
                'headers' : { 'Authorization' : AUTH_TOKEN}
            } ).then(function ()
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

            // custom code for PoC
            organization = _stripEmptyAttributes( angular.copy( organization ) );
            if ( organization.phoneNumber )
            {
                organization.phones = [
                    {'type' : 'mobile', 'number' : organization.phoneNumber}
                ];
            }
            delete organization.phoneNumber;

            $http.post( _toURL(), organization, {
                'headers' : { 'Authorization' : AUTH_TOKEN}
            } ).then(function ( response )
            {
                var organization = response.data;

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

            // custom code for PoC
            organization = _stripEmptyAttributes( angular.copy( organization ) );

            delete organization.avatar;
            delete organization.createTime;
            delete organization.user;
            delete organization.customer;

            if ( organization.phoneNumber )
            {
                if ( organization.phones && organization.phones.length )
                {
                    organization.phones[0].number = organization.phoneNumber;
                }
                else
                {
                    organization.phones = [
                        {'type' : 'mobile', 'number' : organization.phoneNumber}
                    ];
                }
            }
            delete organization.phoneNumber;

            if ( organization.userOwner )
            {
                organization.userOwner = organization.userOwner.userId || 0;
            }

            $http.put( _toURL( id ), organization, {
                'headers' : { 'Authorization' : AUTH_TOKEN}
            } ).then(function ( response )
            {
                var organization = response.data;

                dataCache.put( _toURL( organization.organizationId ), organization );
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
