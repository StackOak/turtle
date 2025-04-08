import { unrefElement } from '@vueuse/core';
import { hideOthers } from 'aria-hidden';
import { watch, onUnmounted } from 'vue';

function useHideOthers(target) {
  let undo;
  watch(() => unrefElement(target), (el) => {
    if (el)
      undo = hideOthers(el);
    else if (undo)
      undo();
  });
  onUnmounted(() => {
    if (undo)
      undo();
  });
}

export { useHideOthers as u };
//# sourceMappingURL=useHideOthers.js.map
