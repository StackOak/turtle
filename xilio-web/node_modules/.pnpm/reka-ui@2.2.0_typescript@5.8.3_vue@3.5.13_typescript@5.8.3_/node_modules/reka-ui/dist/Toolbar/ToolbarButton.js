import { defineComponent, createBlock, openBlock, unref, withCtx, createVNode, mergeProps, renderSlot } from 'vue';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { _ as _sfc_main$1 } from '../RovingFocus/RovingFocusItem.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ToolbarButton",
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const { forwardRef } = useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), {
        "as-child": "",
        focusable: !_ctx.disabled
      }, {
        default: withCtx(() => [
          createVNode(unref(Primitive), mergeProps({
            ref: unref(forwardRef),
            type: _ctx.as === "button" ? "button" : void 0
          }, props), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["type"])
        ]),
        _: 3
      }, 8, ["focusable"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ToolbarButton.js.map
