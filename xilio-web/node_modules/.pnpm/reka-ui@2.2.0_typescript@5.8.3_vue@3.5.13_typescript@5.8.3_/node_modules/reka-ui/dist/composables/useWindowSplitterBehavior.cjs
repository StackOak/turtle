'use strict';

const vue = require('vue');
const utils_assert = require('../utils/assert.cjs');
const utils_dom = require('../utils/dom.cjs');

function useWindowSplitterResizeHandlerBehavior({
  disabled,
  handleId,
  resizeHandler,
  panelGroupElement
}) {
  vue.watchEffect((onCleanup) => {
    const _panelGroupElement = panelGroupElement.value;
    if (disabled.value || resizeHandler.value === null || _panelGroupElement === null)
      return;
    const handleElement = utils_dom.getResizeHandleElement(handleId, _panelGroupElement);
    if (handleElement == null)
      return;
    const onKeyDown = (event) => {
      if (event.defaultPrevented)
        return;
      switch (event.key) {
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
        case "ArrowUp":
        case "End":
        case "Home": {
          event.preventDefault();
          resizeHandler.value?.(event);
          break;
        }
        case "F6": {
          event.preventDefault();
          const groupId = handleElement.getAttribute("data-panel-group-id");
          utils_assert.assert(groupId);
          const handles = utils_dom.getResizeHandleElementsForGroup(
            groupId,
            _panelGroupElement
          );
          const index = utils_dom.getResizeHandleElementIndex(
            groupId,
            handleId,
            _panelGroupElement
          );
          utils_assert.assert(index !== null);
          const nextIndex = event.shiftKey ? index > 0 ? index - 1 : handles.length - 1 : index + 1 < handles.length ? index + 1 : 0;
          const nextHandle = handles[nextIndex];
          nextHandle.focus();
          break;
        }
      }
    };
    handleElement.addEventListener("keydown", onKeyDown);
    onCleanup(() => {
      handleElement.removeEventListener("keydown", onKeyDown);
    });
  });
}

exports.useWindowSplitterResizeHandlerBehavior = useWindowSplitterResizeHandlerBehavior;
//# sourceMappingURL=useWindowSplitterBehavior.cjs.map
