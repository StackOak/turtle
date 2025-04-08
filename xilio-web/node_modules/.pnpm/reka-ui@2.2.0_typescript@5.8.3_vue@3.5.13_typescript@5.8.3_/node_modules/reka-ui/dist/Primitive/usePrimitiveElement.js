import { unrefElement } from '@vueuse/core';
import { ref, computed } from 'vue';

function usePrimitiveElement() {
  const primitiveElement = ref();
  const currentElement = computed(() => ["#text", "#comment"].includes(primitiveElement.value?.$el.nodeName) ? primitiveElement.value?.$el.nextElementSibling : unrefElement(primitiveElement));
  return {
    primitiveElement,
    currentElement
  };
}

export { usePrimitiveElement as u };
//# sourceMappingURL=usePrimitiveElement.js.map
