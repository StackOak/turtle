'use strict';

const utils_assert = require('./assert.cjs');

function callPanelCallbacks(panelsArray, layout, panelIdToLastNotifiedSizeMap) {
  layout.forEach((size, index) => {
    const panelData = panelsArray[index];
    utils_assert.assert(panelData);
    const { callbacks, constraints, id: panelId } = panelData;
    const { collapsedSize = 0, collapsible } = constraints;
    const lastNotifiedSize = panelIdToLastNotifiedSizeMap[panelId];
    if (lastNotifiedSize == null || size !== lastNotifiedSize) {
      panelIdToLastNotifiedSizeMap[panelId] = size;
      const { onCollapse, onExpand, onResize } = callbacks;
      if (onResize)
        onResize(size, lastNotifiedSize);
      if (collapsible && (onCollapse || onExpand)) {
        if (onExpand && (lastNotifiedSize == null || lastNotifiedSize === collapsedSize) && size !== collapsedSize) {
          onExpand();
        }
        if (onCollapse && (lastNotifiedSize == null || lastNotifiedSize !== collapsedSize) && size === collapsedSize) {
          onCollapse();
        }
      }
    }
  });
}

exports.callPanelCallbacks = callPanelCallbacks;
//# sourceMappingURL=callPanelCallbacks.cjs.map
