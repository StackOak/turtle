'use strict';

const vue = require('vue');
const utils_layout = require('../utils/layout.cjs');
const utils_assert = require('../utils/assert.cjs');
const utils_calculate = require('../utils/calculate.cjs');
const utils_pivot = require('../utils/pivot.cjs');
const utils_dom = require('../utils/dom.cjs');
const utils_compare = require('../utils/compare.cjs');

function useWindowSplitterPanelGroupBehavior({
  eagerValuesRef,
  groupId,
  layout,
  panelDataArray,
  panelGroupElement,
  setLayout
}) {
  vue.watchEffect((onCleanup) => {
    const _panelGroupElement = panelGroupElement.value;
    if (!_panelGroupElement)
      return;
    const resizeHandleElements = utils_dom.getResizeHandleElementsForGroup(
      groupId,
      _panelGroupElement
    );
    for (let index = 0; index < panelDataArray.length - 1; index++) {
      const { valueMax, valueMin, valueNow } = utils_calculate.calculateAriaValues({
        layout: layout.value,
        panelsArray: panelDataArray,
        pivotIndices: [index, index + 1]
      });
      const resizeHandleElement = resizeHandleElements[index];
      if (resizeHandleElement == null) ; else {
        const panelData = panelDataArray[index];
        utils_assert.assert(panelData);
        resizeHandleElement.setAttribute("aria-controls", panelData.id);
        resizeHandleElement.setAttribute(
          "aria-valuemax",
          `${Math.round(valueMax)}`
        );
        resizeHandleElement.setAttribute(
          "aria-valuemin",
          `${Math.round(valueMin)}`
        );
        resizeHandleElement.setAttribute(
          "aria-valuenow",
          valueNow != null ? `${Math.round(valueNow)}` : ""
        );
      }
    }
    onCleanup(() => {
      resizeHandleElements.forEach((resizeHandleElement) => {
        resizeHandleElement.removeAttribute("aria-controls");
        resizeHandleElement.removeAttribute("aria-valuemax");
        resizeHandleElement.removeAttribute("aria-valuemin");
        resizeHandleElement.removeAttribute("aria-valuenow");
      });
    });
  });
  vue.watchEffect((onCleanup) => {
    const _panelGroupElement = panelGroupElement.value;
    if (!_panelGroupElement)
      return;
    const eagerValues = eagerValuesRef.value;
    utils_assert.assert(eagerValues);
    const { panelDataArray: panelDataArray2 } = eagerValues;
    const groupElement = utils_dom.getPanelGroupElement(groupId, _panelGroupElement);
    utils_assert.assert(groupElement != null, `No group found for id "${groupId}"`);
    const handles = utils_dom.getResizeHandleElementsForGroup(groupId, _panelGroupElement);
    utils_assert.assert(handles);
    const cleanupFunctions = handles.map((handle) => {
      const handleId = handle.getAttribute("data-panel-resize-handle-id");
      utils_assert.assert(handleId);
      const [idBefore, idAfter] = utils_dom.getResizeHandlePanelIds(
        groupId,
        handleId,
        panelDataArray2,
        _panelGroupElement
      );
      if (idBefore == null || idAfter == null)
        return () => {
        };
      const onKeyDown = (event) => {
        if (event.defaultPrevented)
          return;
        switch (event.key) {
          case "Enter": {
            event.preventDefault();
            const index = panelDataArray2.findIndex(
              (panelData) => panelData.id === idBefore
            );
            if (index >= 0) {
              const panelData = panelDataArray2[index];
              utils_assert.assert(panelData);
              const size = layout.value[index];
              const {
                collapsedSize = 0,
                collapsible,
                minSize = 0
              } = panelData.constraints;
              if (size != null && collapsible) {
                const nextLayout = utils_layout.adjustLayoutByDelta({
                  delta: utils_compare.fuzzyNumbersEqual(size, collapsedSize) ? minSize - collapsedSize : collapsedSize - size,
                  layout: layout.value,
                  panelConstraints: panelDataArray2.map(
                    (panelData2) => panelData2.constraints
                  ),
                  pivotIndices: utils_pivot.determinePivotIndices(
                    groupId,
                    handleId,
                    _panelGroupElement
                  ),
                  trigger: "keyboard"
                });
                if (layout.value !== nextLayout)
                  setLayout(nextLayout);
              }
            }
            break;
          }
        }
      };
      handle.addEventListener("keydown", onKeyDown);
      return () => {
        handle.removeEventListener("keydown", onKeyDown);
      };
    });
    onCleanup(() => {
      cleanupFunctions.forEach((cleanupFunction) => cleanupFunction());
    });
  });
}

exports.useWindowSplitterPanelGroupBehavior = useWindowSplitterPanelGroupBehavior;
//# sourceMappingURL=useWindowSplitterPanelGroupBehavior.cjs.map
