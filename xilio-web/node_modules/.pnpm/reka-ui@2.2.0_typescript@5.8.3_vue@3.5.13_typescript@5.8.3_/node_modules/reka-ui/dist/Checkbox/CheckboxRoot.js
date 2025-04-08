import { defineComponent, computed, createBlock, openBlock, resolveDynamicComponent, unref, mergeProps, withKeys, withModifiers, withCtx, renderSlot, createCommentVNode } from 'vue';
import { g as getState, i as isIndeterminate } from './utils.js';
import { isEqual } from 'ohash';
import { useVModel } from '@vueuse/core';
import { c as createContext } from '../shared/createContext.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { i as injectCheckboxGroupRootContext } from './CheckboxGroupRoot.js';
import { i as isNullish } from '../shared/nullish.js';
import { i as isValueEqualOrExist } from '../shared/isValueEqualOrExist.js';
import { u as useFormControl } from '../shared/useFormControl.js';
import { _ as _sfc_main$1 } from '../RovingFocus/RovingFocusItem.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { _ as _sfc_main$2 } from '../VisuallyHidden/VisuallyHiddenInput.js';

const [injectCheckboxRootContext, provideCheckboxRootContext] = createContext("CheckboxRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "CheckboxRoot",
  props: {
    defaultValue: { type: [Boolean, String] },
    modelValue: { type: [Boolean, String, null], default: void 0 },
    disabled: { type: Boolean },
    value: { default: "on" },
    id: {},
    asChild: { type: Boolean },
    as: { default: "button" },
    name: {},
    required: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { forwardRef, currentElement } = useForwardExpose();
    const checkboxGroupContext = injectCheckboxGroupRootContext(null);
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue,
      passive: props.modelValue === void 0
    });
    const disabled = computed(() => checkboxGroupContext?.disabled.value || props.disabled);
    const checkboxState = computed(() => {
      if (!isNullish(checkboxGroupContext?.modelValue.value)) {
        return isValueEqualOrExist(checkboxGroupContext.modelValue.value, props.value);
      } else {
        return modelValue.value === "indeterminate" ? "indeterminate" : modelValue.value;
      }
    });
    function handleClick() {
      if (!isNullish(checkboxGroupContext?.modelValue.value)) {
        const modelValueArray = [...checkboxGroupContext.modelValue.value || []];
        if (isValueEqualOrExist(modelValueArray, props.value)) {
          const index = modelValueArray.findIndex((i) => isEqual(i, props.value));
          modelValueArray.splice(index, 1);
        } else {
          modelValueArray.push(props.value);
        }
        checkboxGroupContext.modelValue.value = modelValueArray;
      } else {
        modelValue.value = isIndeterminate(modelValue.value) ? true : !modelValue.value;
      }
    }
    const isFormControl = useFormControl(currentElement);
    const ariaLabel = computed(() => props.id && currentElement.value ? document.querySelector(`[for="${props.id}"]`)?.innerText : void 0);
    provideCheckboxRootContext({
      disabled,
      state: checkboxState
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(unref(checkboxGroupContext)?.rovingFocus.value ? unref(_sfc_main$1) : unref(Primitive)), mergeProps(_ctx.$attrs, {
        id: _ctx.id,
        ref: unref(forwardRef),
        role: "checkbox",
        "as-child": _ctx.asChild,
        as: _ctx.as,
        type: _ctx.as === "button" ? "button" : void 0,
        "aria-checked": unref(isIndeterminate)(checkboxState.value) ? "mixed" : checkboxState.value,
        "aria-required": _ctx.required,
        "aria-label": _ctx.$attrs["aria-label"] || ariaLabel.value,
        "data-state": unref(getState)(checkboxState.value),
        "data-disabled": disabled.value ? "" : void 0,
        disabled: disabled.value,
        focusable: unref(checkboxGroupContext)?.rovingFocus.value ? !disabled.value : void 0,
        onKeydown: withKeys(withModifiers(() => {
        }, ["prevent"]), ["enter"]),
        onClick: handleClick
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {
            modelValue: unref(modelValue),
            state: checkboxState.value
          }),
          unref(isFormControl) && _ctx.name && !unref(checkboxGroupContext) ? (openBlock(), createBlock(unref(_sfc_main$2), {
            key: 0,
            type: "checkbox",
            checked: !!checkboxState.value,
            name: _ctx.name,
            value: _ctx.value,
            disabled: disabled.value,
            required: _ctx.required
          }, null, 8, ["checked", "name", "value", "disabled", "required"])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 16, ["id", "as-child", "as", "type", "aria-checked", "aria-required", "aria-label", "data-state", "data-disabled", "disabled", "focusable", "onKeydown"]);
    };
  }
});

export { _sfc_main as _, injectCheckboxRootContext as i };
//# sourceMappingURL=CheckboxRoot.js.map
