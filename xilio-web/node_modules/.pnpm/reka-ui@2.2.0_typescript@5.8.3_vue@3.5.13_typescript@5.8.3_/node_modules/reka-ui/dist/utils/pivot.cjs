'use strict';

const utils_dom = require('./dom.cjs');

function determinePivotIndices(groupId, dragHandleId, panelGroupElement) {
  const index = utils_dom.getResizeHandleElementIndex(
    groupId,
    dragHandleId,
    panelGroupElement
  );
  return index != null ? [index, index + 1] : [-1, -1];
}

exports.determinePivotIndices = determinePivotIndices;
//# sourceMappingURL=pivot.cjs.map
