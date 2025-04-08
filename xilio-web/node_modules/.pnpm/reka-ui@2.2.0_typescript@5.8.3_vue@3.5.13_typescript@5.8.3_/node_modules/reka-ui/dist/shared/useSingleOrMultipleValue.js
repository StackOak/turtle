import { useVModel } from '@vueuse/core';
import { computed } from 'vue';
import { isEqual } from 'ohash';
import { i as isValueEqualOrExist } from './isValueEqualOrExist.js';

function validateProps({ type, defaultValue, modelValue }) {
  const value = modelValue || defaultValue;
  const canTypeBeInferred = modelValue !== void 0 || defaultValue !== void 0;
  if (canTypeBeInferred)
    return Array.isArray(value) ? "multiple" : "single";
  else
    return type ?? "single";
}
function getDefaultType({ type, defaultValue, modelValue }) {
  if (type)
    return type;
  return validateProps({ type, defaultValue, modelValue });
}
function getDefaultValue({ type, defaultValue }) {
  if (defaultValue !== void 0)
    return defaultValue;
  return type === "single" ? void 0 : [];
}
function useSingleOrMultipleValue(props, emits) {
  const type = computed(() => getDefaultType(props));
  const modelValue = useVModel(props, "modelValue", emits, {
    defaultValue: getDefaultValue(props),
    passive: props.modelValue === void 0,
    deep: true
  });
  function changeModelValue(value) {
    if (type.value === "single") {
      modelValue.value = isEqual(value, modelValue.value) ? void 0 : value;
    } else {
      const modelValueArray = Array.isArray(modelValue.value) ? [...modelValue.value || []] : [modelValue.value].filter(Boolean);
      if (isValueEqualOrExist(modelValueArray, value)) {
        const index = modelValueArray.findIndex((i) => isEqual(i, value));
        modelValueArray.splice(index, 1);
      } else {
        modelValueArray.push(value);
      }
      modelValue.value = modelValueArray;
    }
  }
  const isSingle = computed(() => type.value === "single");
  return {
    modelValue,
    changeModelValue,
    isSingle
  };
}

export { useSingleOrMultipleValue as u };
//# sourceMappingURL=useSingleOrMultipleValue.js.map
