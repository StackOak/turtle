import { defineComponent, toRefs, createBlock, openBlock, unref, withCtx, renderSlot } from 'vue';
import { u as useSingleOrMultipleValue } from '../shared/useSingleOrMultipleValue.js';
import { c as createContext } from '../shared/createContext.js';
import { u as useDirection } from '../shared/useDirection.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const [injectAccordionRootContext, provideAccordionRootContext] = createContext("AccordionRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AccordionRoot",
  props: {
    collapsible: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    dir: {},
    orientation: { default: "vertical" },
    unmountOnHide: { type: Boolean, default: true },
    asChild: { type: Boolean },
    as: {},
    type: {},
    modelValue: {},
    defaultValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { dir, disabled, unmountOnHide } = toRefs(props);
    const direction = useDirection(dir);
    const { modelValue, changeModelValue, isSingle } = useSingleOrMultipleValue(props, emits);
    const { forwardRef, currentElement: parentElement } = useForwardExpose();
    provideAccordionRootContext({
      disabled,
      direction,
      orientation: props.orientation,
      parentElement,
      isSingle,
      collapsible: props.collapsible,
      modelValue,
      changeModelValue,
      unmountOnHide
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        ref: unref(forwardRef),
        "as-child": _ctx.asChild,
        as: _ctx.as
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })
        ]),
        _: 3
      }, 8, ["as-child", "as"]);
    };
  }
});

export { _sfc_main as _, injectAccordionRootContext as i };
//# sourceMappingURL=AccordionRoot.js.map
