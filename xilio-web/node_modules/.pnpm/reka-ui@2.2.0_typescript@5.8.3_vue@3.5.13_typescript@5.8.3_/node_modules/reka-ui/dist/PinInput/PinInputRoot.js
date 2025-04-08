import { defineComponent, toRefs, computed, ref, watch, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot, createVNode } from 'vue';
import { useVModel } from '@vueuse/core';
import { _ as _sfc_main$1 } from '../VisuallyHidden/VisuallyHiddenInput.js';
import { c as createContext } from '../shared/createContext.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { u as useDirection } from '../shared/useDirection.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const [injectPinInputRootContext, providePinInputRootContext] = createContext("PinInputRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "PinInputRoot",
  props: {
    modelValue: {},
    defaultValue: {},
    placeholder: { default: "" },
    mask: { type: Boolean },
    otp: { type: Boolean },
    type: { default: "text" },
    dir: {},
    disabled: { type: Boolean },
    id: {},
    asChild: { type: Boolean },
    as: {},
    name: {},
    required: { type: Boolean }
  },
  emits: ["update:modelValue", "complete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { mask, otp, placeholder, type, disabled, dir: propDir } = toRefs(props);
    const { forwardRef } = useForwardExpose();
    const dir = useDirection(propDir);
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue ?? [],
      passive: props.modelValue === void 0
    });
    const currentModelValue = computed(() => Array.isArray(modelValue.value) ? [...modelValue.value] : []);
    const inputElements = ref(/* @__PURE__ */ new Set());
    function onInputElementChange(el) {
      inputElements.value.add(el);
    }
    const isCompleted = computed(() => {
      const modelValues = currentModelValue.value.filter((i) => !!i);
      return modelValues.length === inputElements.value.size;
    });
    watch(modelValue, () => {
      if (isCompleted.value)
        emits("complete", modelValue.value);
    }, { deep: true });
    providePinInputRootContext({
      modelValue,
      currentModelValue,
      mask,
      otp,
      placeholder,
      type,
      dir,
      disabled,
      isCompleted,
      inputElements,
      onInputElementChange
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(_ctx.$attrs, {
        ref: unref(forwardRef),
        dir: unref(dir),
        "data-complete": isCompleted.value ? "" : void 0,
        "data-disabled": unref(disabled) ? "" : void 0
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) }),
          createVNode(_sfc_main$1, {
            id: _ctx.id,
            as: "input",
            feature: "focusable",
            tabindex: "-1",
            value: currentModelValue.value.join(""),
            name: _ctx.name ?? "",
            disabled: unref(disabled),
            required: _ctx.required,
            onFocus: _cache[0] || (_cache[0] = ($event) => Array.from(inputElements.value)?.[0]?.focus())
          }, null, 8, ["id", "value", "name", "disabled", "required"])
        ]),
        _: 3
      }, 16, ["dir", "data-complete", "data-disabled"]);
    };
  }
});

export { _sfc_main as _, injectPinInputRootContext as i };
//# sourceMappingURL=PinInputRoot.js.map
