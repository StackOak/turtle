import { toValue, unrefElement } from '@vueuse/core';
import { computed } from 'vue';

function useFormControl(el) {
  return computed(() => toValue(el) ? Boolean(unrefElement(el)?.closest("form")) : true);
}

export { useFormControl as u };
//# sourceMappingURL=useFormControl.js.map
