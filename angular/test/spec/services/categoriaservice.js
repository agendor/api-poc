'use strict';

describe('Service: CategoriaService', function () {

  // load the service's module
  beforeEach(module('angularApp'));

  // instantiate service
  var CategoriaService;
  beforeEach(inject(function (_CategoriaService_) {
    CategoriaService = _CategoriaService_;
  }));

  it('should do something', function () {
    expect(!!CategoriaService).toBe(true);
  });

});
