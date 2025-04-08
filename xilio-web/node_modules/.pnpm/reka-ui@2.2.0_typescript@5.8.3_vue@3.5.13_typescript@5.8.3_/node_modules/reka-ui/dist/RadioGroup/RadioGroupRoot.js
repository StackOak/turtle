import { defineComponent, toRefs, createBlock, openBlock, unref, withCtx, createVNode, renderSlot, createCommentVNode } from 'vue';
import { useVModel } from '@vueuse/core';
import { c as createContext } from '../shared/createContext.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { u as useDirection } from '../shared/useDirection.js';
import { u as useFormControl } from '../shared/useFormControl.js';
import { _ as _sfc_main$1 } from '../RovingFocus/RovingFocusGroup.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { _ as _sfc_main$2 } from '../VisuallyHidden/VisuallyHiddenInput.js';

const [injectRadioGroupRootContext, provideRadioGroupRootContext] = createContext("RadioGroupRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RadioGroupRoot",
  props: {
    modelValue: {},
    defaultValue: {},
    disabled: { type: Boolean, default: false },
    orientation: { default: void 0 },
    dir: {},
    loop: { type: Boolean, default: true },
    asChild: { type: Boolean },
    as: {},
    name: {},
    required: { type: Boolean, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { forwardRef, currentElement } = useForwardExpose();
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue,
      passive: props.modelValue === void 0
    });
    const { disabled, loop, orientation, name, required, dir: propDir } = toRefs(props);
    const dir = useDirection(propDir);
    const isFormControl = useFormControl(currentElement);
    provideRadioGroupRootContext({
      modelValue,
      changeModelValue: (value) => {
        modelValue.value = value;
      },
      disabled,
      loop,
      orientation,
      name: name?.value,
      required
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), {
        "as-child": "",
        orientation: unref(orientation),
        dir: unref(dir),
        loop: unref(loop)
      }, {
        default: withCtx(() => [
          createVNode(unref(Primitive), {
            ref: unref(forwardRef),
            role: "radiogroup",
            "data-disabled": unref(disabled) ? "" : void 0,
            "as-child": _ctx.asChild,
            as: _ctx.as,
            "aria-orientation": unref(orientation),
            "aria-required": unref(required),
            dir: unref(dir)
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) }),
              unref(isFormControl) && unref(name) ? (openBlock(), createBlock(unref(_sfc_main$2), {
                key: 0,
                required: unref(required),
                disabled: unref(disabled),
                value: unref(modelValue),
                name: unref(name)
              }, null, 8, ["required", "disabled", "value", "name"])) : createCommentVNode("", true)
            ]),
            _: 3
          }, 8, ["data-disabled", "as-child", "as", "aria-orientation", "aria-required", "dir"])
        ]),
        _: 3
      }, 8, ["orientation", "dir", "loop"]);
    };
  }
});

export { _sfc_main as _, injectRadioGroupRootContext as i };
//# sourceMappingURL=RadioGroupRoot.js.map
