'use strict';

const vue = require('vue');
const Slider_SliderHorizontal = require('./SliderHorizontal.cjs');
const Slider_SliderVertical = require('./SliderVertical.cjs');
const core = require('@vueuse/core');
const Slider_utils = require('./utils.cjs');
const Collection_Collection = require('../Collection/Collection.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useDirection = require('../shared/useDirection.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useFormControl = require('../shared/useFormControl.cjs');
const VisuallyHidden_VisuallyHiddenInput = require('../VisuallyHidden/VisuallyHiddenInput.cjs');
const shared_clamp = require('../shared/clamp.cjs');

const [injectSliderRootContext, provideSliderRootContext] = shared_createContext.createContext("SliderRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const { min, max, step, minStepsBetweenThumbs, orientation, disabled, thumbAlignment, dir: propDir } = vue.toRefs(props);
    const dir = shared_useDirection.useDirection(propDir);
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    const isFormControl = shared_useFormControl.useFormControl(currentElement);
    const { CollectionSlot } = Collection_Collection.useCollection({ isProvider: true });
    const modelValue = core.useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue,
      passive: props.modelValue === void 0
    });
    const currentModelValue = vue.computed(() => Array.isArray(modelValue.value) ? [...modelValue.value] : []);
    const valueIndexToChangeRef = vue.ref(0);
    const valuesBeforeSlideStartRef = vue.ref(currentModelValue.value);
    function handleSlideStart(value) {
      const closestIndex = Slider_utils.getClosestValueIndex(currentModelValue.value, value);
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
        emits("valueCommit", vue.toRaw(currentModelValue.value));
    }
    function updateValues(value, atIndex, { commit } = { commit: false }) {
      const decimalCount = Slider_utils.getDecimalCount(step.value);
      const snapToStep = Slider_utils.roundValue(Math.round((value - min.value) / step.value) * step.value + min.value, decimalCount);
      const nextValue = shared_clamp.clamp(snapToStep, min.value, max.value);
      const nextValues = Slider_utils.getNextSortedValues(currentModelValue.value, nextValue, atIndex);
      if (Slider_utils.hasMinStepsBetweenValues(nextValues, minStepsBetweenThumbs.value * step.value)) {
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
    const thumbElements = vue.ref([]);
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
      return vue.openBlock(), vue.createBlock(vue.unref(CollectionSlot), null, {
        default: vue.withCtx(() => [
          (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(orientation) === "horizontal" ? Slider_SliderHorizontal._sfc_main : Slider_SliderVertical._sfc_main), vue.mergeProps(_ctx.$attrs, {
            ref: vue.unref(forwardRef),
            "as-child": _ctx.asChild,
            as: _ctx.as,
            min: vue.unref(min),
            max: vue.unref(max),
            dir: vue.unref(dir),
            inverted: _ctx.inverted,
            "aria-disabled": vue.unref(disabled),
            "data-disabled": vue.unref(disabled) ? "" : void 0,
            onPointerdown: _cache[0] || (_cache[0] = () => {
              if (!vue.unref(disabled)) valuesBeforeSlideStartRef.value = currentModelValue.value;
            }),
            onSlideStart: _cache[1] || (_cache[1] = ($event) => !vue.unref(disabled) && handleSlideStart($event)),
            onSlideMove: _cache[2] || (_cache[2] = ($event) => !vue.unref(disabled) && handleSlideMove($event)),
            onSlideEnd: _cache[3] || (_cache[3] = ($event) => !vue.unref(disabled) && handleSlideEnd()),
            onHomeKeyDown: _cache[4] || (_cache[4] = ($event) => !vue.unref(disabled) && updateValues(vue.unref(min), 0, { commit: true })),
            onEndKeyDown: _cache[5] || (_cache[5] = ($event) => !vue.unref(disabled) && updateValues(vue.unref(max), currentModelValue.value.length - 1, { commit: true })),
            onStepKeyDown: _cache[6] || (_cache[6] = (event, direction) => {
              if (!vue.unref(disabled)) {
                const isPageKey = vue.unref(Slider_utils.PAGE_KEYS).includes(event.key);
                const isSkipKey = isPageKey || event.shiftKey && vue.unref(Slider_utils.ARROW_KEYS).includes(event.key);
                const multiplier = isSkipKey ? 10 : 1;
                const atIndex = valueIndexToChangeRef.value;
                const value = currentModelValue.value[atIndex];
                const stepInDirection = vue.unref(step) * multiplier * direction;
                updateValues(value + stepInDirection, atIndex, { commit: true });
              }
            })
          }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default", { modelValue: vue.unref(modelValue) }),
              vue.unref(isFormControl) && _ctx.name ? (vue.openBlock(), vue.createBlock(vue.unref(VisuallyHidden_VisuallyHiddenInput._sfc_main), {
                key: 0,
                type: "number",
                value: vue.unref(modelValue),
                name: _ctx.name,
                required: _ctx.required,
                disabled: vue.unref(disabled),
                step: vue.unref(step)
              }, null, 8, ["value", "name", "required", "disabled", "step"])) : vue.createCommentVNode("", true)
            ]),
            _: 3
          }, 16, ["as-child", "as", "min", "max", "dir", "inverted", "aria-disabled", "data-disabled"]))
        ]),
        _: 3
      });
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectSliderRootContext = injectSliderRootContext;
//# sourceMappingURL=SliderRoot.cjs.map
