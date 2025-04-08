import { P as PRECISION } from './constants.js';

function fuzzyCompareNumbers(actual, expected, fractionDigits = PRECISION) {
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

export { fuzzyCompareNumbers as a, fuzzyNumbersEqual as f };
//# sourceMappingURL=compare.js.map
