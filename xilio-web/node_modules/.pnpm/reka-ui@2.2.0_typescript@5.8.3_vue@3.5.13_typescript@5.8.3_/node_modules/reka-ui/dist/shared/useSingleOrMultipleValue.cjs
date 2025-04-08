'use strict';

const core = require('@vueuse/core');
const vue = require('vue');
const ohash = require('ohash');
const shared_isValueEqualOrExist = require('./isValueEqualOrExist.cjs');

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
  const type = vue.computed(() => getDefaultType(props));
  const modelValue = core.useVModel(props, "modelValue", emits, {
    defaultValue: getDefaultValue(props),
    passive: props.modelValue === void 0,
    deep: true
  });
  function changeModelValue(value) {
    if (type.value === "single") {
      modelValue.value = ohash.isEqual(value, modelValue.value) ? void 0 : value;
    } else {
      const modelValueArray = Array.isArray(modelValue.value) ? [...modelValue.value || []] : [modelValue.value].filter(Boolean);
      if (shared_isValueEqualOrExist.isValueEqualOrExist(modelValueArray, value)) {
        const index = modelValueArray.findIndex((i) => ohash.isEqual(i, value));
        modelValueArray.splice(index, 1);
      } else {
        modelValueArray.push(value);
      }
      modelValue.value = modelValueArray;
    }
  }
  const isSingle = vue.computed(() => type.value === "single");
  return {
    modelValue,
    changeModelValue,
    isSingle
  };
}

exports.useSingleOrMultipleValue = useSingleOrMultipleValue;
//# sourceMappingURL=useSingleOrMultipleValue.cjs.map
