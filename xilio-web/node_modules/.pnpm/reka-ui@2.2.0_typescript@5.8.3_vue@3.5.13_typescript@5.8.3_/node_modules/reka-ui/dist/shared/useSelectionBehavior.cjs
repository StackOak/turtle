'use strict';

const vue = require('vue');
const shared_arrays = require('./arrays.cjs');

function useSelectionBehavior(modelValue, props) {
  const firstValue = vue.ref();
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
        value = shared_arrays.findValuesBetween(options, firstValue.value, lastValue);
        break;
      }
      case "first": {
        value = shared_arrays.findValuesBetween(options, firstValue.value, options?.[0]);
        break;
      }
      case "last": {
        value = shared_arrays.findValuesBetween(options, firstValue.value, options?.[options.length - 1]);
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

exports.useSelectionBehavior = useSelectionBehavior;
//# sourceMappingURL=useSelectionBehavior.cjs.map
