import { defineComponent, createBlock, openBlock, unref, withCtx, createVNode, mergeProps, renderSlot } from 'vue';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { _ as _sfc_main$1 } from '../RovingFocus/RovingFocusItem.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ToolbarLink",
  props: {
    asChild: { type: Boolean },
    as: { default: "a" }
  },
  setup(__props) {
    const props = __props;
    const { forwardRef } = useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), {
        "as-child": "",
        focusable: ""
      }, {
        default: withCtx(() => [
          createVNode(unref(Primitive), mergeProps(props, {
            ref: unref(forwardRef),
            onKeydown: _cache[0] || (_cache[0] = (event) => {
              if (event.key === " ") event.currentTarget?.click();
            })
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16)
        ]),
        _: 3
      });
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ToolbarLink.js.map
