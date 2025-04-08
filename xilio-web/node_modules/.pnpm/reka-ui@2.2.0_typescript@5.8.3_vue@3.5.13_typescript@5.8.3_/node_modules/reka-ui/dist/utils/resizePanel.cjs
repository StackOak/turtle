'use strict';

const utils_constants = require('./constants.cjs');
const utils_assert = require('./assert.cjs');
const utils_compare = require('./compare.cjs');

function resizePanel({
  panelConstraints: panelConstraintsArray,
  panelIndex,
  size
}) {
  const panelConstraints = panelConstraintsArray[panelIndex];
  utils_assert.assert(panelConstraints != null);
  const { collapsedSize = 0, collapsible, maxSize = 100, minSize = 0 } = panelConstraints;
  if (utils_compare.fuzzyCompareNumbers(size, minSize) < 0) {
    if (collapsible) {
      const halfwayPoint = (collapsedSize + minSize) / 2;
      if (utils_compare.fuzzyCompareNumbers(size, halfwayPoint) < 0)
        size = collapsedSize;
      else
        size = minSize;
    } else {
      size = minSize;
    }
  }
  size = Math.min(maxSize, size);
  size = Number.parseFloat(size.toFixed(utils_constants.PRECISION));
  return size;
}

exports.resizePanel = resizePanel;
//# sourceMappingURL=resizePanel.cjs.map
