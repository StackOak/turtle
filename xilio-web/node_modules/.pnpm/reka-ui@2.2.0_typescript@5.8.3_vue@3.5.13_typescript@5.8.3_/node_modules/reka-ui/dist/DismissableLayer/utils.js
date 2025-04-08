import { isClient } from '@vueuse/shared';
import { ref, watchEffect, nextTick } from 'vue';
import { h as handleAndDispatchCustomEvent } from '../shared/handleAndDispatchCustomEvent.js';

const POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
const FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
function isLayerExist(layerElement, targetElement) {
  const targetLayer = targetElement.closest(
    "[data-dismissable-layer]"
  );
  const mainLayer = layerElement.dataset.dismissableLayer === "" ? layerElement : layerElement.querySelector(
    "[data-dismissable-layer]"
  );
  const nodeList = Array.from(
    layerElement.ownerDocument.querySelectorAll("[data-dismissable-layer]")
  );
  if (targetLayer && mainLayer === targetLayer || nodeList.indexOf(mainLayer) < nodeList.indexOf(targetLayer)) {
    return true;
  } else {
    return false;
  }
}
function usePointerDownOutside(onPointerDownOutside, element) {
  const ownerDocument = element?.value?.ownerDocument ?? globalThis?.document;
  const isPointerInsideDOMTree = ref(false);
  const handleClickRef = ref(() => {
  });
  watchEffect((cleanupFn) => {
    if (!isClient)
      return;
    const handlePointerDown = async (event) => {
      const target = event.target;
      if (!element?.value)
        return;
      if (isLayerExist(element.value, target)) {
        isPointerInsideDOMTree.value = false;
        return;
      }
      if (event.target && !isPointerInsideDOMTree.value) {
        let handleAndDispatchPointerDownOutsideEvent = function() {
          handleAndDispatchCustomEvent(
            POINTER_DOWN_OUTSIDE,
            onPointerDownOutside,
            eventDetail
          );
        };
        const eventDetail = { originalEvent: event };
        if (event.pointerType === "touch") {
          ownerDocument.removeEventListener("click", handleClickRef.value);
          handleClickRef.value = handleAndDispatchPointerDownOutsideEvent;
          ownerDocument.addEventListener("click", handleClickRef.value, {
            once: true
          });
        } else {
          handleAndDispatchPointerDownOutsideEvent();
        }
      } else {
        ownerDocument.removeEventListener("click", handleClickRef.value);
      }
      isPointerInsideDOMTree.value = false;
    };
    const timerId = window.setTimeout(() => {
      ownerDocument.addEventListener("pointerdown", handlePointerDown);
    }, 0);
    cleanupFn(() => {
      window.clearTimeout(timerId);
      ownerDocument.removeEventListener("pointerdown", handlePointerDown);
      ownerDocument.removeEventListener("click", handleClickRef.value);
    });
  });
  return {
    onPointerDownCapture: () => isPointerInsideDOMTree.value = true
  };
}
function useFocusOutside(onFocusOutside, element) {
  const ownerDocument = element?.value?.ownerDocument ?? globalThis?.document;
  const isFocusInsideDOMTree = ref(false);
  watchEffect((cleanupFn) => {
    if (!isClient)
      return;
    const handleFocus = async (event) => {
      if (!element?.value)
        return;
      await nextTick();
      await nextTick();
      if (!element.value || isLayerExist(element.value, event.target))
        return;
      if (event.target && !isFocusInsideDOMTree.value) {
        const eventDetail = { originalEvent: event };
        handleAndDispatchCustomEvent(
          FOCUS_OUTSIDE,
          onFocusOutside,
          eventDetail
        );
      }
    };
    ownerDocument.addEventListener("focusin", handleFocus);
    cleanupFn(() => ownerDocument.removeEventListener("focusin", handleFocus));
  });
  return {
    onFocusCapture: () => isFocusInsideDOMTree.value = true,
    onBlurCapture: () => isFocusInsideDOMTree.value = false
  };
}

export { useFocusOutside as a, usePointerDownOutside as u };
//# sourceMappingURL=utils.js.map
