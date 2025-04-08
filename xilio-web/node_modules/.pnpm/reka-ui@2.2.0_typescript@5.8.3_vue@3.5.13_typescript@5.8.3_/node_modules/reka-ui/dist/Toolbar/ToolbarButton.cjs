'use strict';

const vue = require('vue');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const RovingFocus_RovingFocusItem = require('../RovingFocus/RovingFocusItem.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ToolbarButton",
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(RovingFocus_RovingFocusItem._sfc_main), {
        "as-child": "",
        focusable: !_ctx.disabled
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({
            ref: vue.unref(forwardRef),
            type: _ctx.as === "button" ? "button" : void 0
          }, props), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["type"])
        ]),
        _: 3
      }, 8, ["focusable"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ToolbarButton.cjs.map
