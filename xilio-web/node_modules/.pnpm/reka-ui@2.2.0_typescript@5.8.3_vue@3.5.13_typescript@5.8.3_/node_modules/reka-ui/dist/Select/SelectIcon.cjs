'use strict';

const vue = require('vue');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "SelectIcon",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        "aria-hidden": "true",
        as: _ctx.as,
        "as-child": _ctx.asChild
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            _cache[0] || (_cache[0] = vue.createTextVNode("▼"))
          ])
        ]),
        _: 3
      }, 8, ["as", "as-child"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=SelectIcon.cjs.map
