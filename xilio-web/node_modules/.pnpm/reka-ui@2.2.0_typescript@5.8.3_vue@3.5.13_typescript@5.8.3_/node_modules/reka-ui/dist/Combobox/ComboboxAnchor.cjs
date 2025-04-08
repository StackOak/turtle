'use strict';

const vue = require('vue');
const Popper_PopperAnchor = require('../Popper/PopperAnchor.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ComboboxAnchor",
  props: {
    reference: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Popper_PopperAnchor._sfc_main), {
        "as-child": "",
        reference: _ctx.reference
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({
            ref: vue.unref(forwardRef),
            "as-child": _ctx.asChild,
            as: _ctx.as
          }, _ctx.$attrs), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["as-child", "as"])
        ]),
        _: 3
      }, 8, ["reference"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ComboboxAnchor.cjs.map
