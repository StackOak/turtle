import { b as getResizeHandleElementIndex } from './dom.js';

function determinePivotIndices(groupId, dragHandleId, panelGroupElement) {
  const index = getResizeHandleElementIndex(
    groupId,
    dragHandleId,
    panelGroupElement
  );
  return index != null ? [index, index + 1] : [-1, -1];
}

export { determinePivotIndices as d };
//# sourceMappingURL=pivot.js.map
