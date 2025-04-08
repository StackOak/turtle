'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useDirection = require('../shared/useDirection.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _hoisted_1 = {
  "aria-live": "polite",
  "aria-atomic": "true",
  role: "status",
  style: {
    transform: "translateX(-100%)",
    position: "absolute",
    pointerEvents: "none",
    opacity: 0,
    margin: 0
  }
};
const [injectStepperRootContext, provideStepperRootContext] = shared_createContext.createContext("StepperRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "StepperRoot",
  props: {
    defaultValue: { default: 1 },
    orientation: { default: "horizontal" },
    dir: {},
    modelValue: {},
    linear: { type: Boolean, default: true },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { dir: propDir, orientation: propOrientation, linear } = vue.toRefs(props);
    const dir = shared_useDirection.useDirection(propDir);
    shared_useForwardExpose.useForwardExpose();
    const totalStepperItems = vue.ref(/* @__PURE__ */ new Set());
    const modelValue = core.useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue,
      passive: props.modelValue === void 0
    });
    const totalStepperItemsArray = vue.computed(() => Array.from(totalStepperItems.value));
    const isFirstStep = vue.computed(() => modelValue.value === 1);
    const isLastStep = vue.computed(() => modelValue.value === totalStepperItemsArray.value.length);
    const totalSteps = vue.computed(() => totalStepperItems.value.size);
    function goToStep(step) {
      if (step > totalSteps.value)
        return;
      if (step < 1)
        return;
      if (totalStepperItems.value.size && !!totalStepperItemsArray.value[step] && !!totalStepperItemsArray.value[step].getAttribute("disabled"))
        return;
      if (linear.value) {
        if (step > (modelValue.value ?? 1) + 1)
          return;
      }
      modelValue.value = step;
    }
    const nextStepperItem = vue.ref(null);
    const prevStepperItem = vue.ref(null);
    const isNextDisabled = vue.computed(() => nextStepperItem.value ? nextStepperItem.value.getAttribute("disabled") === "" : true);
    const isPrevDisabled = vue.computed(() => prevStepperItem.value ? prevStepperItem.value.getAttribute("disabled") === "" : true);
    vue.watch(modelValue, async () => {
      await vue.nextTick(() => {
        nextStepperItem.value = totalStepperItemsArray.value.length && modelValue.value < totalStepperItemsArray.value.length ? totalStepperItemsArray.value[modelValue.value] : null;
        prevStepperItem.value = totalStepperItemsArray.value.length && modelValue.value > 1 ? totalStepperItemsArray.value[modelValue.value - 2] : null;
      });
    });
    vue.watch(totalStepperItemsArray, async () => {
      await vue.nextTick(() => {
        nextStepperItem.value = totalStepperItemsArray.value.length && modelValue.value < totalStepperItemsArray.value.length ? totalStepperItemsArray.value[modelValue.value] : null;
        prevStepperItem.value = totalStepperItemsArray.value.length && modelValue.value > 1 ? totalStepperItemsArray.value[modelValue.value - 2] : null;
      });
    });
    provideStepperRootContext({
      modelValue,
      changeModelValue: (value) => {
        modelValue.value = value;
      },
      orientation: propOrientation,
      dir,
      linear,
      totalStepperItems
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        role: "group",
        "aria-label": "progress",
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "data-linear": vue.unref(linear) ? "" : void 0,
        "data-orientation": _ctx.orientation
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {
            modelValue: vue.unref(modelValue),
            totalSteps: totalStepperItems.value.size,
            isNextDisabled: isNextDisabled.value,
            isPrevDisabled: isPrevDisabled.value,
            isFirstStep: isFirstStep.value,
            isLastStep: isLastStep.value,
            goToStep,
            nextStep: () => goToStep((vue.unref(modelValue) ?? 1) + 1),
            prevStep: () => goToStep((vue.unref(modelValue) ?? 1) - 1)
          }),
          vue.createElementVNode("div", _hoisted_1, " Step " + vue.toDisplayString(vue.unref(modelValue)) + " of " + vue.toDisplayString(totalStepperItems.value.size), 1)
        ]),
        _: 3
      }, 8, ["as", "as-child", "data-linear", "data-orientation"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectStepperRootContext = injectStepperRootContext;
//# sourceMappingURL=StepperRoot.cjs.map
