import { defineComponent, toRefs, computed, createBlock, openBlock, unref, mergeProps, withKeys, withModifiers, withCtx, renderSlot, createCommentVNode } from 'vue';
import { useVModel } from '@vueuse/core';
import { c as createContext } from '../shared/createContext.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { u as useFormControl } from '../shared/useFormControl.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { _ as _sfc_main$1 } from '../VisuallyHidden/VisuallyHiddenInput.js';

const [injectSwitchRootContext, provideSwitchRootContext] = createContext("SwitchRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SwitchRoot",
  props: {
    defaultValue: { type: Boolean },
    modelValue: { type: [Boolean, null], default: void 0 },
    disabled: { type: Boolean },
    id: {},
    value: { default: "on" },
    asChild: { type: Boolean },
    as: { default: "button" },
    name: {},
    required: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { disabled } = toRefs(props);
    const modelValue = useVModel(props, "modelValue", emit, {
      defaultValue: props.defaultValue,
      passive: props.modelValue === void 0
    });
    function toggleCheck() {
      if (disabled.value)
        return;
      modelValue.value = !modelValue.value;
    }
    const { forwardRef, currentElement } = useForwardExpose();
    const isFormControl = useFormControl(currentElement);
    const ariaLabel = computed(() => props.id && currentElement.value ? document.querySelector(`[for="${props.id}"]`)?.innerText : void 0);
    provideSwitchRootContext({
      modelValue,
      toggleCheck,
      disabled
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(_ctx.$attrs, {
        id: _ctx.id,
        ref: unref(forwardRef),
        role: "switch",
        type: _ctx.as === "button" ? "button" : void 0,
        value: _ctx.value,
        "aria-label": _ctx.$attrs["aria-label"] || ariaLabel.value,
        "aria-checked": unref(modelValue),
        "aria-required": _ctx.required,
        "data-state": unref(modelValue) ? "checked" : "unchecked",
        "data-disabled": unref(disabled) ? "" : void 0,
        "as-child": _ctx.asChild,
        as: _ctx.as,
        disabled: unref(disabled),
        onClick: toggleCheck,
        onKeydown: withKeys(withModifiers(toggleCheck, ["prevent"]), ["enter"])
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) }),
          unref(isFormControl) && _ctx.name ? (openBlock(), createBlock(unref(_sfc_main$1), {
            key: 0,
            type: "checkbox",
            name: _ctx.name,
            disabled: unref(disabled),
            required: _ctx.required,
            value: _ctx.value,
            checked: !!unref(modelValue)
          }, null, 8, ["name", "disabled", "required", "value", "checked"])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 16, ["id", "type", "value", "aria-label", "aria-checked", "aria-required", "data-state", "data-disabled", "as-child", "as", "disabled", "onKeydown"]);
    };
  }
});

export { _sfc_main as _, injectSwitchRootContext as i };
//# sourceMappingURL=SwitchRoot.js.map
