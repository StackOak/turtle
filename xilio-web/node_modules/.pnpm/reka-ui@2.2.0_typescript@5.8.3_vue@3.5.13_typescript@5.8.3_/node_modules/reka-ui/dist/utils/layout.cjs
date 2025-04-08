'use strict';

const utils_assert = require('./assert.cjs');
const utils_compare = require('./compare.cjs');
const utils_resizePanel = require('./resizePanel.cjs');

function compareLayouts(a, b) {
  if (a.length !== b.length) {
    return false;
  } else {
    for (let index = 0; index < a.length; index++) {
      if (a[index] !== b[index])
        return false;
    }
  }
  return true;
}
function adjustLayoutByDelta({
  delta,
  layout: prevLayout,
  panelConstraints: panelConstraintsArray,
  pivotIndices,
  trigger
}) {
  if (utils_compare.fuzzyNumbersEqual(delta, 0))
    return prevLayout;
  const nextLayout = [...prevLayout];
  const [firstPivotIndex, secondPivotIndex] = pivotIndices;
  utils_assert.assert(firstPivotIndex != null);
  utils_assert.assert(secondPivotIndex != null);
  let deltaApplied = 0;
  {
    if (trigger === "keyboard") {
      {
        const index = delta < 0 ? secondPivotIndex : firstPivotIndex;
        const panelConstraints = panelConstraintsArray[index];
        utils_assert.assert(panelConstraints);
        if (panelConstraints.collapsible) {
          const prevSize = prevLayout[index];
          utils_assert.assert(prevSize != null);
          const panelConstraints2 = panelConstraintsArray[index];
          utils_assert.assert(panelConstraints2);
          const { collapsedSize = 0, minSize = 0 } = panelConstraints2;
          if (utils_compare.fuzzyNumbersEqual(prevSize, collapsedSize)) {
            const localDelta = minSize - prevSize;
            if (utils_compare.fuzzyCompareNumbers(localDelta, Math.abs(delta)) > 0)
              delta = delta < 0 ? 0 - localDelta : localDelta;
          }
        }
      }
      {
        const index = delta < 0 ? firstPivotIndex : secondPivotIndex;
        const panelConstraints = panelConstraintsArray[index];
        utils_assert.assert(panelConstraints);
        const { collapsible } = panelConstraints;
        if (collapsible) {
          const prevSize = prevLayout[index];
          utils_assert.assert(prevSize != null);
          const panelConstraints2 = panelConstraintsArray[index];
          utils_assert.assert(panelConstraints2);
          const { collapsedSize = 0, minSize = 0 } = panelConstraints2;
          if (utils_compare.fuzzyNumbersEqual(prevSize, minSize)) {
            const localDelta = prevSize - collapsedSize;
            if (utils_compare.fuzzyCompareNumbers(localDelta, Math.abs(delta)) > 0)
              delta = delta < 0 ? 0 - localDelta : localDelta;
          }
        }
      }
    }
  }
  {
    const increment = delta < 0 ? 1 : -1;
    let index = delta < 0 ? secondPivotIndex : firstPivotIndex;
    let maxAvailableDelta = 0;
    while (true) {
      const prevSize = prevLayout[index];
      utils_assert.assert(prevSize != null);
      const maxSafeSize = utils_resizePanel.resizePanel({
        panelConstraints: panelConstraintsArray,
        panelIndex: index,
        size: 100
      });
      const delta2 = maxSafeSize - prevSize;
      maxAvailableDelta += delta2;
      index += increment;
      if (index < 0 || index >= panelConstraintsArray.length)
        break;
    }
    const minAbsDelta = Math.min(Math.abs(delta), Math.abs(maxAvailableDelta));
    delta = delta < 0 ? 0 - minAbsDelta : minAbsDelta;
  }
  {
    const pivotIndex = delta < 0 ? firstPivotIndex : secondPivotIndex;
    let index = pivotIndex;
    while (index >= 0 && index < panelConstraintsArray.length) {
      const deltaRemaining = Math.abs(delta) - Math.abs(deltaApplied);
      const prevSize = prevLayout[index];
      utils_assert.assert(prevSize != null);
      const unsafeSize = prevSize - deltaRemaining;
      const safeSize = utils_resizePanel.resizePanel({
        panelConstraints: panelConstraintsArray,
        panelIndex: index,
        size: unsafeSize
      });
      if (!utils_compare.fuzzyNumbersEqual(prevSize, safeSize)) {
        deltaApplied += prevSize - safeSize;
        nextLayout[index] = safeSize;
        if (deltaApplied.toPrecision(3).localeCompare(Math.abs(delta).toPrecision(3), void 0, {
          numeric: true
        }) >= 0) {
          break;
        }
      }
      if (delta < 0)
        index--;
      else
        index++;
    }
  }
  if (utils_compare.fuzzyNumbersEqual(deltaApplied, 0)) {
    return prevLayout;
  }
  {
    const pivotIndex = delta < 0 ? secondPivotIndex : firstPivotIndex;
    const prevSize = prevLayout[pivotIndex];
    utils_assert.assert(prevSize != null);
    const unsafeSize = prevSize + deltaApplied;
    const safeSize = utils_resizePanel.resizePanel({
      panelConstraints: panelConstraintsArray,
      panelIndex: pivotIndex,
      size: unsafeSize
    });
    nextLayout[pivotIndex] = safeSize;
    if (!utils_compare.fuzzyNumbersEqual(safeSize, unsafeSize)) {
      let deltaRemaining = unsafeSize - safeSize;
      const pivotIndex2 = delta < 0 ? secondPivotIndex : firstPivotIndex;
      let index = pivotIndex2;
      while (index >= 0 && index < panelConstraintsArray.length) {
        const prevSize2 = nextLayout[index];
        utils_assert.assert(prevSize2 != null);
        const unsafeSize2 = prevSize2 + deltaRemaining;
        const safeSize2 = utils_resizePanel.resizePanel({
          panelConstraints: panelConstraintsArray,
          panelIndex: index,
          size: unsafeSize2
        });
        if (!utils_compare.fuzzyNumbersEqual(prevSize2, safeSize2)) {
          deltaRemaining -= safeSize2 - prevSize2;
          nextLayout[index] = safeSize2;
        }
        if (utils_compare.fuzzyNumbersEqual(deltaRemaining, 0))
          break;
        if (delta > 0)
          index--;
        else
          index++;
      }
    }
  }
  const totalSize = nextLayout.reduce((total, size) => size + total, 0);
  if (!utils_compare.fuzzyNumbersEqual(totalSize, 100))
    return prevLayout;
  return nextLayout;
}

exports.adjustLayoutByDelta = adjustLayoutByDelta;
exports.compareLayouts = compareLayouts;
//# sourceMappingURL=layout.cjs.map
