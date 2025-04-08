import { defineComponent, createBlock, openBlock, unref, withCtx, createVNode, mergeProps, renderSlot } from 'vue';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { i as injectRadioGroupItemContext } from './RadioGroupItem.js';
import { P as Presence } from '../Presence/Presence.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RadioGroupIndicator",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const { forwardRef } = useForwardExpose();
    const itemContext = injectRadioGroupItemContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Presence), {
        present: _ctx.forceMount || unref(itemContext).checked.value
      }, {
        default: withCtx(() => [
          createVNode(unref(Primitive), mergeProps({
            ref: unref(forwardRef),
            "data-state": unref(itemContext).checked.value ? "checked" : "unchecked",
            "data-disabled": unref(itemContext).disabled.value ? "" : void 0,
            "as-child": _ctx.asChild,
            as: _ctx.as
          }, _ctx.$attrs), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["data-state", "data-disabled", "as-child", "as"])
        ]),
        _: 3
      }, 8, ["present"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=RadioGroupIndicator.js.map
