'use strict';

const vue = require('vue');
const Toast_ToastAnnounceExclude = require('./ToastAnnounceExclude.cjs');
const Toast_ToastRootImpl = require('./ToastRootImpl.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ToastClose",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = Toast_ToastRootImpl.injectToastRootContext();
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(Toast_ToastAnnounceExclude._sfc_main, { "as-child": "" }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(props, {
            ref: vue.unref(forwardRef),
            type: _ctx.as === "button" ? "button" : void 0,
            onClick: vue.unref(rootContext).onClose
          }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["type", "onClick"])
        ]),
        _: 3
      });
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ToastClose.cjs.map
