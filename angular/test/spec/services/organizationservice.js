'use strict';

describe('Service: EmpresaService', function () {

  // load the service's module
  beforeEach(module('angularApp'));

  // instantiate service
  var EmpresaService;
  beforeEach(inject(function (_EmpresaService_) {
    EmpresaService = _EmpresaService_;
  }));

  it('should do something', function () {
    expect(!!EmpresaService).toBe(true);
  });

});
