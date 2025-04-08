import { defineComponent, toRefs, ref, computed, watch, nextTick, createBlock, openBlock, unref, withCtx, renderSlot, createElementVNode, toDisplayString } from 'vue';
import { useVModel } from '@vueuse/core';
import { c as createContext } from '../shared/createContext.js';
import { u as useDirection } from '../shared/useDirection.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';

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
const [injectStepperRootContext, provideStepperRootContext] = createContext("StepperRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
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
    const { dir: propDir, orientation: propOrientation, linear } = toRefs(props);
    const dir = useDirection(propDir);
    useForwardExpose();
    const totalStepperItems = ref(/* @__PURE__ */ new Set());
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue,
      passive: props.modelValue === void 0
    });
    const totalStepperItemsArray = computed(() => Array.from(totalStepperItems.value));
    const isFirstStep = computed(() => modelValue.value === 1);
    const isLastStep = computed(() => modelValue.value === totalStepperItemsArray.value.length);
    const totalSteps = computed(() => totalStepperItems.value.size);
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
    const nextStepperItem = ref(null);
    const prevStepperItem = ref(null);
    const isNextDisabled = computed(() => nextStepperItem.value ? nextStepperItem.value.getAttribute("disabled") === "" : true);
    const isPrevDisabled = computed(() => prevStepperItem.value ? prevStepperItem.value.getAttribute("disabled") === "" : true);
    watch(modelValue, async () => {
      await nextTick(() => {
        nextStepperItem.value = totalStepperItemsArray.value.length && modelValue.value < totalStepperItemsArray.value.length ? totalStepperItemsArray.value[modelValue.value] : null;
        prevStepperItem.value = totalStepperItemsArray.value.length && modelValue.value > 1 ? totalStepperItemsArray.value[modelValue.value - 2] : null;
      });
    });
    watch(totalStepperItemsArray, async () => {
      await nextTick(() => {
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
      return openBlock(), createBlock(unref(Primitive), {
        role: "group",
        "aria-label": "progress",
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "data-linear": unref(linear) ? "" : void 0,
        "data-orientation": _ctx.orientation
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {
            modelValue: unref(modelValue),
            totalSteps: totalStepperItems.value.size,
            isNextDisabled: isNextDisabled.value,
            isPrevDisabled: isPrevDisabled.value,
            isFirstStep: isFirstStep.value,
            isLastStep: isLastStep.value,
            goToStep,
            nextStep: () => goToStep((unref(modelValue) ?? 1) + 1),
            prevStep: () => goToStep((unref(modelValue) ?? 1) - 1)
          }),
          createElementVNode("div", _hoisted_1, " Step " + toDisplayString(unref(modelValue)) + " of " + toDisplayString(totalStepperItems.value.size), 1)
        ]),
        _: 3
      }, 8, ["as", "as-child", "data-linear", "data-orientation"]);
    };
  }
});

export { _sfc_main as _, injectStepperRootContext as i };
//# sourceMappingURL=StepperRoot.js.map
