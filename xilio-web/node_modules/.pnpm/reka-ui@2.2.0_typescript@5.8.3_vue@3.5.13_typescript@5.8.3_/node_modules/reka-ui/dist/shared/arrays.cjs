'use strict';

const ohash = require('ohash');

function areEqual(arrayA, arrayB) {
  if (arrayA.length !== arrayB.length)
    return false;
  for (let index = 0; index < arrayA.length; index++) {
    if (arrayA[index] !== arrayB[index])
      return false;
  }
  return true;
}
function findValuesBetween(array, start, end) {
  const startIndex = array.findIndex((i) => ohash.isEqual(i, start));
  const endIndex = array.findIndex((i) => ohash.isEqual(i, end));
  if (startIndex === -1 || endIndex === -1)
    return [];
  const [minIndex, maxIndex] = [startIndex, endIndex].sort((a, b) => a - b);
  return array.slice(minIndex, maxIndex + 1);
}

exports.areEqual = areEqual;
exports.findValuesBetween = findValuesBetween;
//# sourceMappingURL=arrays.cjs.map
