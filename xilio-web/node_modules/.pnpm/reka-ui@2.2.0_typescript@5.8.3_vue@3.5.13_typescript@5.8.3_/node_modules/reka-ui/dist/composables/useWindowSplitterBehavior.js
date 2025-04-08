import { watchEffect } from 'vue';
import { a as assert } from '../utils/assert.js';
import { g as getResizeHandleElement, a as getResizeHandleElementsForGroup, b as getResizeHandleElementIndex } from '../utils/dom.js';

function useWindowSplitterResizeHandlerBehavior({
  disabled,
  handleId,
  resizeHandler,
  panelGroupElement
}) {
  watchEffect((onCleanup) => {
    const _panelGroupElement = panelGroupElement.value;
    if (disabled.value || resizeHandler.value === null || _panelGroupElement === null)
      return;
    const handleElement = getResizeHandleElement(handleId, _panelGroupElement);
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
          assert(groupId);
          const handles = getResizeHandleElementsForGroup(
            groupId,
            _panelGroupElement
          );
          const index = getResizeHandleElementIndex(
            groupId,
            handleId,
            _panelGroupElement
          );
          assert(index !== null);
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

export { useWindowSplitterResizeHandlerBehavior as u };
//# sourceMappingURL=useWindowSplitterBehavior.js.map
