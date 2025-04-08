import { defineComponent, createBlock, createCommentVNode, unref, openBlock, Teleport, renderSlot } from 'vue';
import { useMounted } from '@vueuse/core';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Teleport",
  props: {
    to: { default: "body" },
    disabled: { type: Boolean },
    defer: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(__props) {
    const isMounted = useMounted();
    return (_ctx, _cache) => {
      return unref(isMounted) || _ctx.forceMount ? (openBlock(), createBlock(Teleport, {
        key: 0,
        to: _ctx.to,
        disabled: _ctx.disabled,
        defer: _ctx.defer
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 8, ["to", "disabled", "defer"])) : createCommentVNode("", true);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=Teleport.js.map
