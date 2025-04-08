'use strict';

const ohash = require('ohash');
const shared_nullish = require('./nullish.cjs');

function isValueEqualOrExist(base, current) {
  if (shared_nullish.isNullish(base))
    return false;
  if (Array.isArray(base)) {
    return base.some((val) => ohash.isEqual(val, current));
  } else {
    return ohash.isEqual(base, current);
  }
}

exports.isValueEqualOrExist = isValueEqualOrExist;
//# sourceMappingURL=isValueEqualOrExist.cjs.map
