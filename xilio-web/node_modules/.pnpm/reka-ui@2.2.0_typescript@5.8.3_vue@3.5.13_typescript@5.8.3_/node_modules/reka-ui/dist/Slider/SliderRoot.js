import { defineComponent, toRefs, computed, ref, createBlock, openBlock, unref, withCtx, resolveDynamicComponent, mergeProps, renderSlot, createCommentVNode, toRaw } from 'vue';
import { _ as _sfc_main$1 } from './SliderHorizontal.js';
import { _ as _sfc_main$2 } from './SliderVertical.js';
import { useVModel } from '@vueuse/core';
import { P as PAGE_KEYS, A as ARROW_KEYS, g as getClosestValueIndex, a as getDecimalCount, r as roundValue, b as getNextSortedValues, h as hasMinStepsBetweenValues } from './utils.js';
import { u as useCollection } from '../Collection/Collection.js';
import { c as createContext } from '../shared/createContext.js';
import { u as useDirection } from '../shared/useDirection.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { u as useFormControl } from '../shared/useFormControl.js';
import { _ as _sfc_main$3 } from '../VisuallyHidden/VisuallyHiddenInput.js';
import { c as clamp } from '../shared/clamp.js';

const [injectSliderRootContext, provideSliderRootContext] = createContext("SliderRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "SliderRoot",
  props: {
    defaultValue: { default: () => [0] },
    modelValue: {},
    disabled: { type: Boolean, default: false },
    orientation: { default: "horizontal" },
    dir: {},
    inverted: { type: Boolean, default: false },
    min: { default: 0 },
    max: { default: 100 },
    step: { default: 1 },
    minStepsBetweenThumbs: { default: 0 },
    thumbAlignment: { default: "contain" },
    asChild: { type: Boolean },
    as: { default: "span" },
    name: {},
    required: { type: Boolean }
  },
  emits: ["update:modelValue", "valueCommit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { min, max, step, minStepsBetweenThumbs, orientation, disabled, thumbAlignment, dir: propDir } = toRefs(props);
    const dir = useDirection(propDir);
    const { forwardRef, currentElement } = useForwardExpose();
    const isFormControl = useFormControl(currentElement);
    const { CollectionSlot } = useCollection({ isProvider: true });
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue,
      passive: props.modelValue === void 0
    });
    const currentModelValue = computed(() => Array.isArray(modelValue.value) ? [...modelValue.value] : []);
    const valueIndexToChangeRef = ref(0);
    const valuesBeforeSlideStartRef = ref(currentModelValue.value);
    function handleSlideStart(value) {
      const closestIndex = getClosestValueIndex(currentModelValue.value, value);
      updateValues(value, closestIndex);
    }
    function handleSlideMove(value) {
      updateValues(value, valueIndexToChangeRef.value);
    }
    function handleSlideEnd() {
      const prevValue = valuesBeforeSlideStartRef.value[valueIndexToChangeRef.value];
      const nextValue = currentModelValue.value[valueIndexToChangeRef.value];
      const hasChanged = nextValue !== prevValue;
      if (hasChanged)
        emits("valueCommit", toRaw(currentModelValue.value));
    }
    function updateValues(value, atIndex, { commit } = { commit: false }) {
      const decimalCount = getDecimalCount(step.value);
      const snapToStep = roundValue(Math.round((value - min.value) / step.value) * step.value + min.value, decimalCount);
      const nextValue = clamp(snapToStep, min.value, max.value);
      const nextValues = getNextSortedValues(currentModelValue.value, nextValue, atIndex);
      if (hasMinStepsBetweenValues(nextValues, minStepsBetweenThumbs.value * step.value)) {
        valueIndexToChangeRef.value = nextValues.indexOf(nextValue);
        const hasChanged = String(nextValues) !== String(modelValue.value);
        if (hasChanged && commit)
          emits("valueCommit", nextValues);
        if (hasChanged) {
          thumbElements.value[valueIndexToChangeRef.value]?.focus();
          modelValue.value = nextValues;
        }
      }
    }
    const thumbElements = ref([]);
    provideSliderRootContext({
      modelValue,
      currentModelValue,
      valueIndexToChangeRef,
      thumbElements,
      orientation,
      min,
      max,
      disabled,
      thumbAlignment
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(CollectionSlot), null, {
        default: withCtx(() => [
          (openBlock(), createBlock(resolveDynamicComponent(unref(orientation) === "horizontal" ? _sfc_main$1 : _sfc_main$2), mergeProps(_ctx.$attrs, {
            ref: unref(forwardRef),
            "as-child": _ctx.asChild,
            as: _ctx.as,
            min: unref(min),
            max: unref(max),
            dir: unref(dir),
            inverted: _ctx.inverted,
            "aria-disabled": unref(disabled),
            "data-disabled": unref(disabled) ? "" : void 0,
            onPointerdown: _cache[0] || (_cache[0] = () => {
              if (!unref(disabled)) valuesBeforeSlideStartRef.value = currentModelValue.value;
            }),
            onSlideStart: _cache[1] || (_cache[1] = ($event) => !unref(disabled) && handleSlideStart($event)),
            onSlideMove: _cache[2] || (_cache[2] = ($event) => !unref(disabled) && handleSlideMove($event)),
            onSlideEnd: _cache[3] || (_cache[3] = ($event) => !unref(disabled) && handleSlideEnd()),
            onHomeKeyDown: _cache[4] || (_cache[4] = ($event) => !unref(disabled) && updateValues(unref(min), 0, { commit: true })),
            onEndKeyDown: _cache[5] || (_cache[5] = ($event) => !unref(disabled) && updateValues(unref(max), currentModelValue.value.length - 1, { commit: true })),
            onStepKeyDown: _cache[6] || (_cache[6] = (event, direction) => {
              if (!unref(disabled)) {
                const isPageKey = unref(PAGE_KEYS).includes(event.key);
                const isSkipKey = isPageKey || event.shiftKey && unref(ARROW_KEYS).includes(event.key);
                const multiplier = isSkipKey ? 10 : 1;
                const atIndex = valueIndexToChangeRef.value;
                const value = currentModelValue.value[atIndex];
                const stepInDirection = unref(step) * multiplier * direction;
                updateValues(value + stepInDirection, atIndex, { commit: true });
              }
            })
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) }),
              unref(isFormControl) && _ctx.name ? (openBlock(), createBlock(unref(_sfc_main$3), {
                key: 0,
                type: "number",
                value: unref(modelValue),
                name: _ctx.name,
                required: _ctx.required,
                disabled: unref(disabled),
                step: unref(step)
              }, null, 8, ["value", "name", "required", "disabled", "step"])) : createCommentVNode("", true)
            ]),
            _: 3
          }, 16, ["as-child", "as", "min", "max", "dir", "inverted", "aria-disabled", "data-disabled"]))
        ]),
        _: 3
      });
    };
  }
});

export { _sfc_main as _, injectSliderRootContext as i };
//# sourceMappingURL=SliderRoot.js.map
