var mockery = require('mockery');

process.env.NODE_ENV = 'test';

beforeEach(function(){
  mockery.enable({
    warnOnReplace: false,
    warnOnUnregistered: false,
    useCleanCache: true
  });
});

afterEach(function(){
  mockery.deregisterAll();
  mockery.disable();
});