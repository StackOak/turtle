import { createSharedComposable, useEventListener } from '@vueuse/core';
import { ref, onMounted } from 'vue';

function useIsUsingKeyboardImpl() {
  const isUsingKeyboard = ref(false);
  onMounted(() => {
    useEventListener("keydown", () => {
      isUsingKeyboard.value = true;
    }, { capture: true, passive: true });
    useEventListener(["pointerdown", "pointermove"], () => {
      isUsingKeyboard.value = false;
    }, { capture: true, passive: true });
  });
  return isUsingKeyboard;
}
const useIsUsingKeyboard = createSharedComposable(useIsUsingKeyboardImpl);

export { useIsUsingKeyboard as u };
//# sourceMappingURL=useIsUsingKeyboard.js.map
