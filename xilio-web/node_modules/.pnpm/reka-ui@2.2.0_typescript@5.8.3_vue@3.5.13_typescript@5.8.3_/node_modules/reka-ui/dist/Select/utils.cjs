'use strict';

const ohash = require('ohash');

const OPEN_KEYS = [" ", "Enter", "ArrowUp", "ArrowDown"];
const SELECTION_KEYS = [" ", "Enter"];
const CONTENT_MARGIN = 10;
function valueComparator(value, currentValue, comparator) {
  if (value === void 0)
    return false;
  else if (Array.isArray(value))
    return value.some((val) => compare(val, currentValue, comparator));
  else
    return compare(value, currentValue, comparator);
}
function compare(value, currentValue, comparator) {
  if (value === void 0 || currentValue === void 0)
    return false;
  if (typeof value === "string")
    return value === currentValue;
  if (typeof comparator === "function")
    return comparator(value, currentValue);
  if (typeof comparator === "string")
    return value?.[comparator] === currentValue?.[comparator];
  return ohash.isEqual(value, currentValue);
}

exports.CONTENT_MARGIN = CONTENT_MARGIN;
exports.OPEN_KEYS = OPEN_KEYS;
exports.SELECTION_KEYS = SELECTION_KEYS;
exports.compare = compare;
exports.valueComparator = valueComparator;
//# sourceMappingURL=utils.cjs.map
