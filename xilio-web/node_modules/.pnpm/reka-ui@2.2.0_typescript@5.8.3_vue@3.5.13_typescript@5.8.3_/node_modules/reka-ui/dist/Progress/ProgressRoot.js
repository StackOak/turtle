import { defineComponent, watch, nextTick, computed, createBlock, openBlock, unref, withCtx, renderSlot } from 'vue';
import { useVModel } from '@vueuse/core';
import { c as createContext } from '../shared/createContext.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as isNullish } from '../shared/nullish.js';

const DEFAULT_MAX = 100;
const [injectProgressRootContext, provideProgressRootContext] = createContext("ProgressRoot");
const isNumber = (v) => typeof v === "number";
function validateValue(value, max) {
  const isValidValueError = isNullish(value) || isNumber(value) && !Number.isNaN(value) && value <= max && value >= 0;
  if (isValidValueError)
    return value;
  console.error(`Invalid prop \`value\` of value \`${value}\` supplied to \`ProgressRoot\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\`  or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`);
  return null;
}
function validateMax(max) {
  const isValidMaxError = isNumber(max) && !Number.isNaN(max) && max > 0;
  if (isValidMaxError)
    return max;
  console.error(
    `Invalid prop \`max\` of value \`${max}\` supplied to \`ProgressRoot\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`
  );
  return DEFAULT_MAX;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProgressRoot",
  props: {
    modelValue: {},
    max: { default: DEFAULT_MAX },
    getValueLabel: { type: Function, default: (value, max) => `${Math.round(value / max * DEFAULT_MAX)}%` },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue", "update:max"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    useForwardExpose();
    const modelValue = useVModel(props, "modelValue", emit, {
      passive: props.modelValue === void 0
    });
    const max = useVModel(props, "max", emit, {
      passive: props.max === void 0
    });
    watch(
      () => modelValue.value,
      async (value) => {
        const correctedValue = validateValue(value, props.max);
        if (correctedValue !== value) {
          await nextTick();
          modelValue.value = correctedValue;
        }
      },
      { immediate: true }
    );
    watch(
      () => props.max,
      (newMax) => {
        const correctedMax = validateMax(props.max);
        if (correctedMax !== newMax)
          max.value = correctedMax;
      },
      { immediate: true }
    );
    const progressState = computed(() => {
      if (isNullish(modelValue.value))
        return "indeterminate";
      if (modelValue.value === max.value)
        return "complete";
      return "loading";
    });
    provideProgressRootContext({
      modelValue,
      max,
      progressState
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        "as-child": _ctx.asChild,
        as: _ctx.as,
        "aria-valuemax": unref(max),
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(unref(modelValue)) ? unref(modelValue) : void 0,
        "aria-valuetext": _ctx.getValueLabel(unref(modelValue), unref(max)),
        "aria-label": _ctx.getValueLabel(unref(modelValue), unref(max)),
        role: "progressbar",
        "data-state": progressState.value,
        "data-value": unref(modelValue) ?? void 0,
        "data-max": unref(max)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })
        ]),
        _: 3
      }, 8, ["as-child", "as", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-label", "data-state", "data-value", "data-max"]);
    };
  }
});

export { _sfc_main as _, injectProgressRootContext as i };
//# sourceMappingURL=ProgressRoot.js.map
