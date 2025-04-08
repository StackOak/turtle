import { defineComponent, computed, createBlock, openBlock, unref, withCtx, renderSlot, createCommentVNode } from 'vue';
import { useVModel } from '@vueuse/core';
import { _ as _sfc_main$1 } from '../VisuallyHidden/VisuallyHiddenInput.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { i as injectToggleGroupRootContext } from '../ToggleGroup/ToggleGroupRoot.js';
import { u as useFormControl } from '../shared/useFormControl.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Toggle",
  props: {
    defaultValue: { type: Boolean },
    modelValue: { type: [Boolean, null], default: void 0 },
    disabled: { type: Boolean, default: false },
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
    const toggleGroupContext = injectToggleGroupRootContext(null);
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue,
      passive: props.modelValue === void 0
    });
    function togglePressed() {
      modelValue.value = !modelValue.value;
    }
    const dataState = computed(() => {
      return modelValue.value ? "on" : "off";
    });
    const isFormControl = useFormControl(currentElement);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        ref: unref(forwardRef),
        type: _ctx.as === "button" ? "button" : void 0,
        "as-child": props.asChild,
        as: _ctx.as,
        "aria-pressed": unref(modelValue),
        "data-state": dataState.value,
        "data-disabled": _ctx.disabled ? "" : void 0,
        disabled: _ctx.disabled,
        onClick: togglePressed
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {
            modelValue: unref(modelValue),
            disabled: _ctx.disabled,
            pressed: unref(modelValue),
            state: dataState.value
          }),
          unref(isFormControl) && _ctx.name && !unref(toggleGroupContext) ? (openBlock(), createBlock(_sfc_main$1, {
            key: 0,
            type: "checkbox",
            name: _ctx.name,
            value: unref(modelValue),
            required: _ctx.required
          }, null, 8, ["name", "value", "required"])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["type", "as-child", "as", "aria-pressed", "data-state", "data-disabled", "disabled"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=Toggle.js.map
