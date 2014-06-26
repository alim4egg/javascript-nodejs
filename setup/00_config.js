// Any files in this directory will be `require()`'ed when the application
// starts, and the exported function will be invoked with a `this` context of
// the application itself.  Initializers are used to connect to databases and
// message queues, and configure sub-systems such as authentication.

// Async initializers are declared by exporting `function(done) { /*...*/ }`.
// `done` is a callback which must be invoked when the initializer is
// finished.  Initializers are invoked sequentially, ensuring that the
// previous one has completed before the next one executes.


'use strict';

/**
 * Module dependencies.
 */
var config              = require('config');
var log                 = require('../lib/log')(module);

// end of dependencies.


module.exports = function () {
  // this = application

  // this function is an example
  // we don't do anything with config here, but ensure that it exists and works
};