'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular
.module('angularApp')
.controller('MainCtrl', function ($scope, companies) {
    var ctrl = this;
    
    ctrl.companies = companies;
})
;
