'use strict';

const vue = require('vue');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Popper_PopperRoot = require('./PopperRoot.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "PopperAnchor",
  props: {
    reference: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    const rootContext = Popper_PopperRoot.injectPopperRootContext();
    vue.watchPostEffect(() => {
      rootContext.onAnchorChange(props.reference ?? currentElement.value);
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        ref: vue.unref(forwardRef),
        as: _ctx.as,
        "as-child": _ctx.asChild
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as", "as-child"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=PopperAnchor.cjs.map
