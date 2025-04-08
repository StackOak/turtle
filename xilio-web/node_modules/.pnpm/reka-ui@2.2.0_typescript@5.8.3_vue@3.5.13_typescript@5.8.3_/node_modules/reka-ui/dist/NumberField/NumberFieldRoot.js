import { defineComponent, toRefs, ref, computed, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot, createCommentVNode } from 'vue';
import { h as handleDecimalOperation, a as useNumberFormatter, b as useNumberParser } from './utils.js';
import { useVModel } from '@vueuse/core';
import { c as createContext } from '../shared/createContext.js';
import { u as usePrimitiveElement } from '../Primitive/usePrimitiveElement.js';
import { u as useLocale } from '../shared/useLocale.js';
import { u as useFormControl } from '../shared/useFormControl.js';
import { c as clamp, s as snapValueToStep } from '../shared/clamp.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { _ as _sfc_main$1 } from '../VisuallyHidden/VisuallyHiddenInput.js';

const [injectNumberFieldRootContext, provideNumberFieldRootContext] = createContext("NumberFieldRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
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
    const { disabled, disableWheelChange, min, max, step, stepSnapping, formatOptions, id, locale: propLocale } = toRefs(props);
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue,
      passive: props.modelValue === void 0
    });
    const { primitiveElement, currentElement } = usePrimitiveElement();
    const locale = useLocale(propLocale);
    const isFormControl = useFormControl(currentElement);
    const inputEl = ref();
    const isDecreaseDisabled = computed(
      () => clampInputValue(modelValue.value) === min.value || (min.value && !isNaN(modelValue.value) ? handleDecimalOperation("-", modelValue.value, step.value) < min.value : false)
    );
    const isIncreaseDisabled = computed(
      () => clampInputValue(modelValue.value) === max.value || (max.value && !isNaN(modelValue.value) ? handleDecimalOperation("+", modelValue.value, step.value) > max.value : false)
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
    const numberFormatter = useNumberFormatter(locale, formatOptions);
    const numberParser = useNumberParser(locale, formatOptions);
    const inputMode = computed(() => {
      const hasDecimals = numberFormatter.resolvedOptions().maximumFractionDigits > 0;
      return hasDecimals ? "decimal" : "numeric";
    });
    const textValueFormatter = useNumberFormatter(locale, formatOptions);
    const textValue = computed(() => isNaN(modelValue.value) ? "" : textValueFormatter.format(modelValue.value));
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
        clampedValue = clamp(val, min.value, max.value);
      else
        clampedValue = snapValueToStep(val, min.value, max.value, step.value);
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
      return openBlock(), createBlock(unref(Primitive), mergeProps(_ctx.$attrs, {
        ref_key: "primitiveElement",
        ref: primitiveElement,
        role: "group",
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "data-disabled": unref(disabled) ? "" : void 0
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {
            modelValue: unref(modelValue),
            textValue: textValue.value
          }),
          unref(isFormControl) && _ctx.name ? (openBlock(), createBlock(unref(_sfc_main$1), {
            key: 0,
            type: "text",
            value: unref(modelValue),
            name: _ctx.name,
            disabled: unref(disabled),
            required: _ctx.required
          }, null, 8, ["value", "name", "disabled", "required"])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 16, ["as", "as-child", "data-disabled"]);
    };
  }
});

export { _sfc_main as _, injectNumberFieldRootContext as i };
//# sourceMappingURL=NumberFieldRoot.js.map
