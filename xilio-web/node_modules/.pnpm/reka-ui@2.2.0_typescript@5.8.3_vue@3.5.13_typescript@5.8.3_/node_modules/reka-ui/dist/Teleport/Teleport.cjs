'use strict';

const vue = require('vue');
const core = require('@vueuse/core');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "Teleport",
  props: {
    to: { default: "body" },
    disabled: { type: Boolean },
    defer: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(__props) {
    const isMounted = core.useMounted();
    return (_ctx, _cache) => {
      return vue.unref(isMounted) || _ctx.forceMount ? (vue.openBlock(), vue.createBlock(vue.Teleport, {
        key: 0,
        to: _ctx.to,
        disabled: _ctx.disabled,
        defer: _ctx.defer
      }, [
        vue.renderSlot(_ctx.$slots, "default")
      ], 8, ["to", "disabled", "defer"])) : vue.createCommentVNode("", true);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=Teleport.cjs.map
