import { defineComponent, toRefs, computed, createBlock, openBlock, resolveDynamicComponent, unref, mergeProps, withCtx, renderSlot, createCommentVNode } from 'vue';
import { useVModel } from '@vueuse/core';
import { c as createContext } from '../shared/createContext.js';
import { u as useDirection } from '../shared/useDirection.js';
import { u as usePrimitiveElement } from '../Primitive/usePrimitiveElement.js';
import { u as useFormControl } from '../shared/useFormControl.js';
import { _ as _sfc_main$1 } from '../RovingFocus/RovingFocusGroup.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { _ as _sfc_main$2 } from '../VisuallyHidden/VisuallyHiddenInput.js';

const [injectCheckboxGroupRootContext, provideCheckboxGroupRootContext] = createContext("CheckboxGroupRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CheckboxGroupRoot",
  props: {
    defaultValue: {},
    modelValue: {},
    rovingFocus: { type: Boolean, default: true },
    disabled: { type: Boolean },
    as: {},
    asChild: { type: Boolean },
    dir: {},
    orientation: {},
    loop: { type: Boolean },
    name: {},
    required: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { disabled, rovingFocus, dir: propDir } = toRefs(props);
    const dir = useDirection(propDir);
    const { primitiveElement, currentElement } = usePrimitiveElement();
    const isFormControl = useFormControl(currentElement);
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue ?? [],
      passive: props.modelValue === void 0
    });
    const rovingFocusProps = computed(() => {
      return rovingFocus.value ? { loop: props.loop, dir: dir.value, orientation: props.orientation } : {};
    });
    provideCheckboxGroupRootContext({
      modelValue,
      rovingFocus,
      disabled
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(unref(rovingFocus) ? unref(_sfc_main$1) : unref(Primitive)), mergeProps({
        ref_key: "primitiveElement",
        ref: primitiveElement,
        as: _ctx.as,
        "as-child": _ctx.asChild
      }, rovingFocusProps.value), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default"),
          unref(isFormControl) && _ctx.name ? (openBlock(), createBlock(unref(_sfc_main$2), {
            key: 0,
            name: _ctx.name,
            value: unref(modelValue),
            required: _ctx.required
          }, null, 8, ["name", "value", "required"])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 16, ["as", "as-child"]);
    };
  }
});

export { _sfc_main as _, injectCheckboxGroupRootContext as i };
//# sourceMappingURL=CheckboxGroupRoot.js.map
