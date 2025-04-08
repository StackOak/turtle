import { defineComponent, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot, createElementBlock } from 'vue';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _hoisted_1 = {
  key: 0,
  d: "M0 0L6 6L12 0"
};
const _hoisted_2 = {
  key: 1,
  d: "M0 0L4.58579 4.58579C5.36683 5.36683 6.63316 5.36684 7.41421 4.58579L12 0"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Arrow",
  props: {
    width: { default: 10 },
    height: { default: 5 },
    rounded: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "svg" }
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        width: _ctx.width,
        height: _ctx.height,
        viewBox: _ctx.asChild ? void 0 : "0 0 12 6",
        preserveAspectRatio: _ctx.asChild ? void 0 : "none"
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            !_ctx.rounded ? (openBlock(), createElementBlock("path", _hoisted_1)) : (openBlock(), createElementBlock("path", _hoisted_2))
          ])
        ]),
        _: 3
      }, 16, ["width", "height", "viewBox", "preserveAspectRatio"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=Arrow.js.map
