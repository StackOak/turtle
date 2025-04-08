import { defineComponent, createBlock, openBlock, unref, withCtx, renderSlot } from 'vue';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ToastAnnounceExclude",
  props: {
    altText: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "data-reka-toast-announce-exclude": "",
        "data-reka-toast-announce-alt": _ctx.altText || void 0
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as", "as-child", "data-reka-toast-announce-alt"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ToastAnnounceExclude.js.map
