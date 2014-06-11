'use strict';

/**
 * Generate a UTF-8 message that will be sent to a connected client.
 *
 * @async
 * @param {Number} size The specified in bytes for the message.
 * @param {Function} fn The callback function for the data.
 * @public
 */
exports.utf8 = function utf(size, fn) {
  var key = 'utf8::'+ size
    , cached = cache[key];

  // We have a cached version of this size, return that instead.
  if (cached) return fn(undefined, cached);

  cached = cache[key] = new Buffer(size).toString('utf-8');
  fn(undefined, cached);
};

/**
 * Generate a binary message that will be sent to a connected client.
 *
 * @async
 * @param {Number} size The specified in bytes for the message.
 * @param {Function} fn The callback function for the data.
 * @public
 */
exports.binary = function binary(size, fn) {
  var key = 'binary::'+ size
    , cached = cache[key];

  // We have a cached version of this size, return that instead.
  if (cached) return fn(undefined, cached);

  cached = cache[key] = new Buffer(size);
  fn(undefined, cached);
};


exports.jsonmsg = function jsonmsg(size, fn) {
    var key = 'jsonmsg::' + size
        , cached = cache[key];

    var testMessage = {
        message: '',
        sessionId: '',
        callId: '1000000000',
        did: '2070000000',
        extension: '11111',
        messageDate: '2014-06-11 12:21:39.268'
    };

    var testMessageJson = JSON.stringify(testMessage);
    //console.log('testMessageJson = ' + testMessageJson);

    // We have a cached version of this size, return that instead.
    if (cached) return fn(undefined, cached);

    //var localBuffer = new Buffer(200);
    //localBuffer.write(testMessageJson, "ascii");
    cached = cache[key] = testMessageJson;
    fn(undefined, cached);
};

//
// The following is not needed to create a session file. We don't want to
// re-create & re-allocate memory every time we receive a message so we cache
// them in a variable.
//
var cache = Object.create(null);
