import { createGlobalState } from '@vueuse/core';
import { ref } from 'vue';

const useFocusStackState = createGlobalState(() => {
  const stack = ref([]);
  return stack;
});
function createFocusScopesStack() {
  const stack = useFocusStackState();
  return {
    add(focusScope) {
      const activeFocusScope = stack.value[0];
      if (focusScope !== activeFocusScope)
        activeFocusScope?.pause();
      stack.value = arrayRemove(stack.value, focusScope);
      stack.value.unshift(focusScope);
    },
    remove(focusScope) {
      stack.value = arrayRemove(stack.value, focusScope);
      stack.value[0]?.resume();
    }
  };
}
function arrayRemove(array, item) {
  const updatedArray = [...array];
  const index = updatedArray.indexOf(item);
  if (index !== -1)
    updatedArray.splice(index, 1);
  return updatedArray;
}
function removeLinks(items) {
  return items.filter((item) => item.tagName !== "A");
}

export { createFocusScopesStack as c, removeLinks as r };
//# sourceMappingURL=stack.js.map
