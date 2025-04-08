'use strict';

const vue = require('vue');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _hoisted_1 = {
  key: 0,
  d: "M0 0L6 6L12 0"
};
const _hoisted_2 = {
  key: 1,
  d: "M0 0L4.58579 4.58579C5.36683 5.36683 6.63316 5.36684 7.41421 4.58579L12 0"
};
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(props, {
        width: _ctx.width,
        height: _ctx.height,
        viewBox: _ctx.asChild ? void 0 : "0 0 12 6",
        preserveAspectRatio: _ctx.asChild ? void 0 : "none"
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            !_ctx.rounded ? (vue.openBlock(), vue.createElementBlock("path", _hoisted_1)) : (vue.openBlock(), vue.createElementBlock("path", _hoisted_2))
          ])
        ]),
        _: 3
      }, 16, ["width", "height", "viewBox", "preserveAspectRatio"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=Arrow.cjs.map
