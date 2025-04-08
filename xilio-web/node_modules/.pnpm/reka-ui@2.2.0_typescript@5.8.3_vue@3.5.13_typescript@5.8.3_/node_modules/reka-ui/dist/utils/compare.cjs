'use strict';

const utils_constants = require('./constants.cjs');

function fuzzyCompareNumbers(actual, expected, fractionDigits = utils_constants.PRECISION) {
  actual = Number.parseFloat(actual.toFixed(fractionDigits));
  expected = Number.parseFloat(expected.toFixed(fractionDigits));
  const delta = actual - expected;
  if (delta === 0)
    return 0;
  else
    return delta > 0 ? 1 : -1;
}
function fuzzyNumbersEqual(actual, expected, fractionDigits) {
  return fuzzyCompareNumbers(actual, expected, fractionDigits) === 0;
}

exports.fuzzyCompareNumbers = fuzzyCompareNumbers;
exports.fuzzyNumbersEqual = fuzzyNumbersEqual;
//# sourceMappingURL=compare.cjs.map
