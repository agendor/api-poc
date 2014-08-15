/* global describe, it, beforeEach, afterEach, after */

/**
 * @ref http://jsfiddle.net/ekidd/hCsws/
 */
// (function () {
//    'use strict';

    EmberApp.Store = DS.Store.extend({
        revision: 12,
        adapter: DS.FixtureAdapter.create({ simulateRemoteResponse: false })
    });

    EmberApp.Organization.FIXTURES = [
        {'organizationId' : 1, 'nickname' : 'Org A', createTime : '2014-08-07T14:40:00', ranking : 4},
        {'organizationId' : 2, 'nickname' : 'Org B', createTime : '2014-08-07T14:45:00', ranking : 3},
        {'organizationId' : 3, 'nickname' : 'Org C', createTime : '2014-08-07T14:43:00', ranking : 1},
        {'organizationId' : 4, 'nickname' : 'Org D', createTime : '2014-08-07T14:44:00', ranking : 2},
        {'organizationId' : 5, 'nickname' : 'Org E', createTime : '2014-08-07T14:42:00', ranking : 5}
    ];

    beforeEach(function () {
        Ember.run(function () { EmberApp.reset(); });
        Ember.testing = true;
    });

    afterEach(function () {
        Ember.testing = false;
    });

    after(function () {
        Ember.run(function () { EmberApp.reset(); });
    });

    describe('EmberApp.Category', function () {
        it('has a name', function () {
            var parceiro;

            Ember.run(function () {
                parceiro = EmberApp.Category.findBy('categoryId', 35);
            });

            parceiro.get('name' ).should.equal('Parceiro');
        });
    });

    describe('Give it some context', function () {
        describe('maybe a bit more context here', function () {
            it('should run here few assertions', function () {

            });
        });
    });
// })();
