'use strict';

const vue = require('vue');
const PinInput_PinInputRoot = require('./PinInputRoot.cjs');
const Primitive_usePrimitiveElement = require('../Primitive/usePrimitiveElement.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const shared_useArrowNavigation = require('../shared/useArrowNavigation.cjs');
const shared_getActiveElement = require('../shared/getActiveElement.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "PinInputInput",
  props: {
    index: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "input" }
  },
  setup(__props) {
    const props = __props;
    const context = PinInput_PinInputRoot.injectPinInputRootContext();
    const inputElements = vue.computed(() => Array.from(context.inputElements.value));
    const currentValue = vue.computed(() => context.currentModelValue.value[props.index]);
    const disabled = vue.computed(() => props.disabled || context.disabled.value);
    const isOtpMode = vue.computed(() => context.otp.value);
    const isNumericMode = vue.computed(() => context.type.value === "number");
    const isPasswordMode = vue.computed(() => context.mask.value);
    const { primitiveElement, currentElement } = Primitive_usePrimitiveElement.usePrimitiveElement();
    function handleInput(event) {
      const target = event.target;
      if ((event.data?.length ?? 0) > 1) {
        handleMultipleCharacter(target.value);
        return;
      }
      if (isNumericMode.value && !/^\d*$/.test(target.value)) {
        target.value = target.value.replace(/\D/g, "");
        return;
      }
      target.value = target.value.slice(-1);
      updateModelValueAt(props.index, target.value);
      const nextEl = inputElements.value[props.index + 1];
      if (nextEl)
        nextEl.focus();
    }
    function resetPlaceholder() {
      const target = currentElement.value;
      vue.nextTick(() => {
        if (target && !target.value)
          target.placeholder = context.placeholder.value;
      });
    }
    function handleKeydown(event) {
      shared_useArrowNavigation.useArrowNavigation(event, shared_getActiveElement.getActiveElement(), void 0, {
        itemsArray: inputElements.value,
        focus: true,
        loop: false,
        arrowKeyOptions: "horizontal",
        dir: context.dir.value
      });
    }
    function handleBackspace(event) {
      event.preventDefault();
      const target = event.target;
      const value = target.value;
      if (value) {
        updateModelValueAt(props.index, "");
      } else {
        const prevEl = inputElements.value[props.index - 1];
        if (prevEl) {
          prevEl.focus();
          updateModelValueAt(props.index - 1, "");
        }
      }
    }
    function handleDelete(event) {
      if (event.key === "Delete") {
        event.preventDefault();
        updateModelValueAt(props.index, "");
      }
    }
    function handleFocus(event) {
      const target = event.target;
      target.setSelectionRange(1, 1);
      if (!target.value)
        target.placeholder = "";
    }
    function handleBlur(event) {
      resetPlaceholder();
    }
    function handlePaste(event) {
      event.preventDefault();
      const clipboardData = event.clipboardData;
      if (!clipboardData)
        return;
      const values = clipboardData.getData("text");
      handleMultipleCharacter(values);
    }
    function handleMultipleCharacter(values) {
      const tempModelValue = [...context.currentModelValue.value];
      const initialIndex = values.length >= inputElements.value.length ? 0 : props.index;
      const lastIndex = Math.min(initialIndex + values.length, inputElements.value.length);
      for (let i = initialIndex; i < lastIndex; i++) {
        const input = inputElements.value[i];
        const value = values[i - initialIndex];
        if (isNumericMode.value && !/^\d*$/.test(value))
          continue;
        tempModelValue[i] = value;
        input.focus();
      }
      context.modelValue.value = tempModelValue;
      inputElements.value[lastIndex]?.focus();
    }
    function removeTrailingEmptyStrings(input) {
      let i = input.length - 1;
      while (i >= 0 && input[i] === "") {
        input.pop();
        i--;
      }
      return input;
    }
    function updateModelValueAt(index, value) {
      const tempModelValue = [...context.currentModelValue.value];
      tempModelValue[index] = value;
      context.modelValue.value = removeTrailingEmptyStrings(tempModelValue);
    }
    vue.watch(currentValue, () => {
      if (!currentValue.value) {
        resetPlaceholder();
      }
    });
    vue.onMounted(() => {
      context.onInputElementChange(currentElement.value);
    });
    vue.onUnmounted(() => {
      context.inputElements?.value.delete(currentElement.value);
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        ref_key: "primitiveElement",
        ref: primitiveElement,
        autocapitalize: "none",
        as: _ctx.as,
        "as-child": _ctx.asChild,
        autocomplete: isOtpMode.value ? "one-time-code" : "false",
        type: isPasswordMode.value ? "password" : "text",
        inputmode: isNumericMode.value ? "numeric" : "text",
        pattern: isNumericMode.value ? "[0-9]*" : void 0,
        placeholder: vue.unref(context).placeholder.value,
        value: currentValue.value,
        disabled: disabled.value,
        "data-disabled": disabled.value ? "" : void 0,
        "data-complete": vue.unref(context).isCompleted.value ? "" : void 0,
        "aria-label": `pin input ${_ctx.index + 1} of ${inputElements.value.length}`,
        onInput: _cache[0] || (_cache[0] = ($event) => handleInput($event)),
        onKeydown: [
          vue.withKeys(handleKeydown, ["left", "right", "up", "down", "home", "end"]),
          vue.withKeys(handleBackspace, ["backspace"]),
          vue.withKeys(handleDelete, ["delete"])
        ],
        onFocus: handleFocus,
        onBlur: handleBlur,
        onPaste: handlePaste
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as", "as-child", "autocomplete", "type", "inputmode", "pattern", "placeholder", "value", "disabled", "data-disabled", "data-complete", "aria-label"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=PinInputInput.cjs.map
