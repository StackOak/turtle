import { defineComponent, createBlock, openBlock, unref, withCtx, createVNode, mergeProps, renderSlot } from 'vue';
import { i as isIndeterminate, g as getState } from './utils.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { i as injectCheckboxRootContext } from './CheckboxRoot.js';
import { P as Presence } from '../Presence/Presence.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CheckboxIndicator",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const { forwardRef } = useForwardExpose();
    const rootContext = injectCheckboxRootContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Presence), {
        present: _ctx.forceMount || unref(isIndeterminate)(unref(rootContext).state.value) || unref(rootContext).state.value === true
      }, {
        default: withCtx(() => [
          createVNode(unref(Primitive), mergeProps({
            ref: unref(forwardRef),
            "data-state": unref(getState)(unref(rootContext).state.value),
            "data-disabled": unref(rootContext).disabled.value ? "" : void 0,
            style: { pointerEvents: "none" },
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
//# sourceMappingURL=CheckboxIndicator.js.map
