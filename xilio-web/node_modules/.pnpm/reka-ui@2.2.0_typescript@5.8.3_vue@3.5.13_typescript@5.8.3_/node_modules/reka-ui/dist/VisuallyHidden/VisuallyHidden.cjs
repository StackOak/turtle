'use strict';

const vue = require('vue');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "VisuallyHidden",
  props: {
    feature: { default: "focusable" },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "aria-hidden": _ctx.feature === "focusable" ? "true" : void 0,
        "data-hidden": _ctx.feature === "fully-hidden" ? "" : void 0,
        tabindex: _ctx.feature === "fully-hidden" ? "-1" : void 0,
        style: {
          // See: https://github.com/twbs/bootstrap/blob/master/scss/mixins/_screen-reader.scss
          position: "absolute",
          border: 0,
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          clipPath: "inset(50%)",
          whiteSpace: "nowrap",
          wordWrap: "normal"
        }
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as", "as-child", "aria-hidden", "data-hidden", "tabindex"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=VisuallyHidden.cjs.map
