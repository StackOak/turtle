import { ref } from 'vue';
import { f as findValuesBetween } from './arrays.js';

function useSelectionBehavior(modelValue, props) {
  const firstValue = ref();
  const onSelectItem = (val, condition) => {
    if (props.multiple && Array.isArray(modelValue.value)) {
      if (props.selectionBehavior === "replace") {
        modelValue.value = [val];
        firstValue.value = val;
      } else {
        const index = modelValue.value.findIndex((v) => condition(v));
        if (index !== -1)
          modelValue.value.splice(index, 1);
        else
          modelValue.value.push(val);
      }
    } else {
      if (props.selectionBehavior === "replace") {
        modelValue.value = { ...val };
      } else {
        if (!Array.isArray(modelValue.value) && condition(modelValue.value))
          modelValue.value = void 0;
        else
          modelValue.value = { ...val };
      }
    }
    return modelValue.value;
  };
  function handleMultipleReplace(intent, currentElement, getItems, options) {
    if (!firstValue?.value || !props.multiple || !Array.isArray(modelValue.value))
      return;
    const collection = getItems().filter((i) => i.ref.dataset.disabled !== "");
    const lastValue = collection.find((i) => i.ref === currentElement)?.value;
    if (!lastValue)
      return;
    let value = null;
    switch (intent) {
      case "prev":
      case "next": {
        value = findValuesBetween(options, firstValue.value, lastValue);
        break;
      }
      case "first": {
        value = findValuesBetween(options, firstValue.value, options?.[0]);
        break;
      }
      case "last": {
        value = findValuesBetween(options, firstValue.value, options?.[options.length - 1]);
        break;
      }
    }
    modelValue.value = value;
  }
  return {
    firstValue,
    onSelectItem,
    handleMultipleReplace
  };
}

export { useSelectionBehavior as u };
//# sourceMappingURL=useSelectionBehavior.js.map
