'use strict';

function assert(expectedCondition, message = "Assertion failed!") {
  if (!expectedCondition) {
    console.error(message);
    throw new Error(message);
  }
}

exports.assert = assert;
//# sourceMappingURL=assert.cjs.map
