import { watchEffect } from 'vue';
import { a as adjustLayoutByDelta } from '../utils/layout.js';
import { a as assert } from '../utils/assert.js';
import { b as calculateAriaValues } from '../utils/calculate.js';
import { d as determinePivotIndices } from '../utils/pivot.js';
import { a as getResizeHandleElementsForGroup, c as getPanelGroupElement, d as getResizeHandlePanelIds } from '../utils/dom.js';
import { f as fuzzyNumbersEqual } from '../utils/compare.js';

function useWindowSplitterPanelGroupBehavior({
  eagerValuesRef,
  groupId,
  layout,
  panelDataArray,
  panelGroupElement,
  setLayout
}) {
  watchEffect((onCleanup) => {
    const _panelGroupElement = panelGroupElement.value;
    if (!_panelGroupElement)
      return;
    const resizeHandleElements = getResizeHandleElementsForGroup(
      groupId,
      _panelGroupElement
    );
    for (let index = 0; index < panelDataArray.length - 1; index++) {
      const { valueMax, valueMin, valueNow } = calculateAriaValues({
        layout: layout.value,
        panelsArray: panelDataArray,
        pivotIndices: [index, index + 1]
      });
      const resizeHandleElement = resizeHandleElements[index];
      if (resizeHandleElement == null) ; else {
        const panelData = panelDataArray[index];
        assert(panelData);
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
  watchEffect((onCleanup) => {
    const _panelGroupElement = panelGroupElement.value;
    if (!_panelGroupElement)
      return;
    const eagerValues = eagerValuesRef.value;
    assert(eagerValues);
    const { panelDataArray: panelDataArray2 } = eagerValues;
    const groupElement = getPanelGroupElement(groupId, _panelGroupElement);
    assert(groupElement != null, `No group found for id "${groupId}"`);
    const handles = getResizeHandleElementsForGroup(groupId, _panelGroupElement);
    assert(handles);
    const cleanupFunctions = handles.map((handle) => {
      const handleId = handle.getAttribute("data-panel-resize-handle-id");
      assert(handleId);
      const [idBefore, idAfter] = getResizeHandlePanelIds(
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
              assert(panelData);
              const size = layout.value[index];
              const {
                collapsedSize = 0,
                collapsible,
                minSize = 0
              } = panelData.constraints;
              if (size != null && collapsible) {
                const nextLayout = adjustLayoutByDelta({
                  delta: fuzzyNumbersEqual(size, collapsedSize) ? minSize - collapsedSize : collapsedSize - size,
                  layout: layout.value,
                  panelConstraints: panelDataArray2.map(
                    (panelData2) => panelData2.constraints
                  ),
                  pivotIndices: determinePivotIndices(
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

export { useWindowSplitterPanelGroupBehavior as u };
//# sourceMappingURL=useWindowSplitterPanelGroupBehavior.js.map
