import { defineComponent, toRefs, createBlock, openBlock, resolveDynamicComponent, unref, withCtx, createVNode, renderSlot, createCommentVNode } from 'vue';
import { u as useSingleOrMultipleValue } from '../shared/useSingleOrMultipleValue.js';
import { _ as _sfc_main$2 } from '../VisuallyHidden/VisuallyHiddenInput.js';
import { c as createContext } from '../shared/createContext.js';
import { u as useDirection } from '../shared/useDirection.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { u as useFormControl } from '../shared/useFormControl.js';
import { _ as _sfc_main$1 } from '../RovingFocus/RovingFocusGroup.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const [injectToggleGroupRootContext, provideToggleGroupRootContext] = createContext("ToggleGroupRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ToggleGroupRoot",
  props: {
    rovingFocus: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    orientation: {},
    dir: {},
    loop: { type: Boolean, default: true },
    asChild: { type: Boolean },
    as: {},
    name: {},
    required: { type: Boolean },
    type: {},
    modelValue: {},
    defaultValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { loop, rovingFocus, disabled, dir: propDir } = toRefs(props);
    const dir = useDirection(propDir);
    const { forwardRef, currentElement } = useForwardExpose();
    const { modelValue, changeModelValue, isSingle } = useSingleOrMultipleValue(props, emits);
    const isFormControl = useFormControl(currentElement);
    provideToggleGroupRootContext({
      isSingle,
      modelValue,
      changeModelValue,
      dir,
      orientation: props.orientation,
      loop,
      rovingFocus,
      disabled
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(unref(rovingFocus) ? unref(_sfc_main$1) : unref(Primitive)), {
        "as-child": "",
        orientation: unref(rovingFocus) ? _ctx.orientation : void 0,
        dir: unref(dir),
        loop: unref(rovingFocus) ? unref(loop) : void 0
      }, {
        default: withCtx(() => [
          createVNode(unref(Primitive), {
            ref: unref(forwardRef),
            role: "group",
            "as-child": _ctx.asChild,
            as: _ctx.as
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) }),
              unref(isFormControl) && _ctx.name ? (openBlock(), createBlock(_sfc_main$2, {
                key: 0,
                name: _ctx.name,
                required: _ctx.required,
                value: unref(modelValue)
              }, null, 8, ["name", "required", "value"])) : createCommentVNode("", true)
            ]),
            _: 3
          }, 8, ["as-child", "as"])
        ]),
        _: 3
      }, 8, ["orientation", "dir", "loop"]);
    };
  }
});

export { _sfc_main as _, injectToggleGroupRootContext as i };
//# sourceMappingURL=ToggleGroupRoot.js.map
