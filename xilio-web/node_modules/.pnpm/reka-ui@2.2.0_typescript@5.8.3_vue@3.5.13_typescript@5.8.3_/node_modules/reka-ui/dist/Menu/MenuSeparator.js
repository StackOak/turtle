import { defineComponent, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MenuSeparator",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        role: "separator",
        "aria-orientation": "horizontal"
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=MenuSeparator.js.map
