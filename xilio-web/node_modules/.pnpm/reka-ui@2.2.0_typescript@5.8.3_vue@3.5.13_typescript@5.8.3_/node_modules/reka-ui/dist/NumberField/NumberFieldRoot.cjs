'use strict';

const vue = require('vue');
const NumberField_utils = require('./utils.cjs');
const core = require('@vueuse/core');
const shared_createContext = require('../shared/createContext.cjs');
const Primitive_usePrimitiveElement = require('../Primitive/usePrimitiveElement.cjs');
const shared_useLocale = require('../shared/useLocale.cjs');
const shared_useFormControl = require('../shared/useFormControl.cjs');
const shared_clamp = require('../shared/clamp.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const VisuallyHidden_VisuallyHiddenInput = require('../VisuallyHidden/VisuallyHiddenInput.cjs');

const [injectNumberFieldRootContext, provideNumberFieldRootContext] = shared_createContext.createContext("NumberFieldRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "NumberFieldRoot",
  props: {
    defaultValue: { default: void 0 },
    modelValue: {},
    min: {},
    max: {},
    step: { default: 1 },
    stepSnapping: { type: Boolean, default: true },
    formatOptions: {},
    locale: {},
    disabled: { type: Boolean },
    disableWheelChange: { type: Boolean },
    id: {},
    asChild: { type: Boolean },
    as: { default: "div" },
    name: {},
    required: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { disabled, disableWheelChange, min, max, step, stepSnapping, formatOptions, id, locale: propLocale } = vue.toRefs(props);
    const modelValue = core.useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue,
      passive: props.modelValue === void 0
    });
    const { primitiveElement, currentElement } = Primitive_usePrimitiveElement.usePrimitiveElement();
    const locale = shared_useLocale.useLocale(propLocale);
    const isFormControl = shared_useFormControl.useFormControl(currentElement);
    const inputEl = vue.ref();
    const isDecreaseDisabled = vue.computed(
      () => clampInputValue(modelValue.value) === min.value || (min.value && !isNaN(modelValue.value) ? NumberField_utils.handleDecimalOperation("-", modelValue.value, step.value) < min.value : false)
    );
    const isIncreaseDisabled = vue.computed(
      () => clampInputValue(modelValue.value) === max.value || (max.value && !isNaN(modelValue.value) ? NumberField_utils.handleDecimalOperation("+", modelValue.value, step.value) > max.value : false)
    );
    function handleChangingValue(type, multiplier = 1) {
      inputEl.value?.focus();
      const currentInputValue = numberParser.parse(inputEl.value?.value ?? "");
      if (props.disabled)
        return;
      if (isNaN(currentInputValue)) {
        modelValue.value = min.value ?? 0;
      } else {
        if (type === "increase")
          modelValue.value = clampInputValue(currentInputValue + (step.value ?? 1) * multiplier);
        else
          modelValue.value = clampInputValue(currentInputValue - (step.value ?? 1) * multiplier);
      }
    }
    function handleIncrease(multiplier = 1) {
      handleChangingValue("increase", multiplier);
    }
    function handleDecrease(multiplier = 1) {
      handleChangingValue("decrease", multiplier);
    }
    function handleMinMaxValue(type) {
      if (type === "min" && min.value !== void 0)
        modelValue.value = clampInputValue(min.value);
      else if (type === "max" && max.value !== void 0)
        modelValue.value = clampInputValue(max.value);
    }
    const numberFormatter = NumberField_utils.useNumberFormatter(locale, formatOptions);
    const numberParser = NumberField_utils.useNumberParser(locale, formatOptions);
    const inputMode = vue.computed(() => {
      const hasDecimals = numberFormatter.resolvedOptions().maximumFractionDigits > 0;
      return hasDecimals ? "decimal" : "numeric";
    });
    const textValueFormatter = NumberField_utils.useNumberFormatter(locale, formatOptions);
    const textValue = vue.computed(() => isNaN(modelValue.value) ? "" : textValueFormatter.format(modelValue.value));
    function validate(val) {
      return numberParser.isValidPartialNumber(val, min.value, max.value);
    }
    function setInputValue(val) {
      if (inputEl.value)
        inputEl.value.value = val;
    }
    function clampInputValue(val) {
      let clampedValue;
      if (step.value === void 0 || isNaN(step.value) || !stepSnapping.value)
        clampedValue = shared_clamp.clamp(val, min.value, max.value);
      else
        clampedValue = shared_clamp.snapValueToStep(val, min.value, max.value, step.value);
      clampedValue = numberParser.parse(numberFormatter.format(clampedValue));
      return clampedValue;
    }
    function applyInputValue(val) {
      const parsedValue = numberParser.parse(val);
      modelValue.value = clampInputValue(parsedValue);
      if (!val.length)
        return setInputValue(val);
      if (isNaN(parsedValue))
        return setInputValue(textValue.value);
      return setInputValue(textValue.value);
    }
    provideNumberFieldRootContext({
      modelValue,
      handleDecrease,
      handleIncrease,
      handleMinMaxValue,
      inputMode,
      inputEl,
      onInputElement: (el) => inputEl.value = el,
      textValue,
      validate,
      applyInputValue,
      disabled,
      disableWheelChange,
      max,
      min,
      isDecreaseDisabled,
      isIncreaseDisabled,
      id
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(_ctx.$attrs, {
        ref_key: "primitiveElement",
        ref: primitiveElement,
        role: "group",
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "data-disabled": vue.unref(disabled) ? "" : void 0
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {
            modelValue: vue.unref(modelValue),
            textValue: textValue.value
          }),
          vue.unref(isFormControl) && _ctx.name ? (vue.openBlock(), vue.createBlock(vue.unref(VisuallyHidden_VisuallyHiddenInput._sfc_main), {
            key: 0,
            type: "text",
            value: vue.unref(modelValue),
            name: _ctx.name,
            disabled: vue.unref(disabled),
            required: _ctx.required
          }, null, 8, ["value", "name", "disabled", "required"])) : vue.createCommentVNode("", true)
        ]),
        _: 3
      }, 16, ["as", "as-child", "data-disabled"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectNumberFieldRootContext = injectNumberFieldRootContext;
//# sourceMappingURL=NumberFieldRoot.cjs.map
