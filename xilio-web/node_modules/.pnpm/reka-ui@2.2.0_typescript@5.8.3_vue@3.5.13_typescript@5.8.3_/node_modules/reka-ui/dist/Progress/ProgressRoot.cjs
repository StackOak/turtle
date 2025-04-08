'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const shared_nullish = require('../shared/nullish.cjs');

const DEFAULT_MAX = 100;
const [injectProgressRootContext, provideProgressRootContext] = shared_createContext.createContext("ProgressRoot");
const isNumber = (v) => typeof v === "number";
function validateValue(value, max) {
  const isValidValueError = shared_nullish.isNullish(value) || isNumber(value) && !Number.isNaN(value) && value <= max && value >= 0;
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
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    shared_useForwardExpose.useForwardExpose();
    const modelValue = core.useVModel(props, "modelValue", emit, {
      passive: props.modelValue === void 0
    });
    const max = core.useVModel(props, "max", emit, {
      passive: props.max === void 0
    });
    vue.watch(
      () => modelValue.value,
      async (value) => {
        const correctedValue = validateValue(value, props.max);
        if (correctedValue !== value) {
          await vue.nextTick();
          modelValue.value = correctedValue;
        }
      },
      { immediate: true }
    );
    vue.watch(
      () => props.max,
      (newMax) => {
        const correctedMax = validateMax(props.max);
        if (correctedMax !== newMax)
          max.value = correctedMax;
      },
      { immediate: true }
    );
    const progressState = vue.computed(() => {
      if (shared_nullish.isNullish(modelValue.value))
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
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        "as-child": _ctx.asChild,
        as: _ctx.as,
        "aria-valuemax": vue.unref(max),
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(vue.unref(modelValue)) ? vue.unref(modelValue) : void 0,
        "aria-valuetext": _ctx.getValueLabel(vue.unref(modelValue), vue.unref(max)),
        "aria-label": _ctx.getValueLabel(vue.unref(modelValue), vue.unref(max)),
        role: "progressbar",
        "data-state": progressState.value,
        "data-value": vue.unref(modelValue) ?? void 0,
        "data-max": vue.unref(max)
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", { modelValue: vue.unref(modelValue) })
        ]),
        _: 3
      }, 8, ["as-child", "as", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-label", "data-state", "data-value", "data-max"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectProgressRootContext = injectProgressRootContext;
//# sourceMappingURL=ProgressRoot.cjs.map
