'use strict';

const core = require('@vueuse/core');
const vue = require('vue');

function useIsUsingKeyboardImpl() {
  const isUsingKeyboard = vue.ref(false);
  vue.onMounted(() => {
    core.useEventListener("keydown", () => {
      isUsingKeyboard.value = true;
    }, { capture: true, passive: true });
    core.useEventListener(["pointerdown", "pointermove"], () => {
      isUsingKeyboard.value = false;
    }, { capture: true, passive: true });
  });
  return isUsingKeyboard;
}
const useIsUsingKeyboard = core.createSharedComposable(useIsUsingKeyboardImpl);

exports.useIsUsingKeyboard = useIsUsingKeyboard;
//# sourceMappingURL=useIsUsingKeyboard.cjs.map
