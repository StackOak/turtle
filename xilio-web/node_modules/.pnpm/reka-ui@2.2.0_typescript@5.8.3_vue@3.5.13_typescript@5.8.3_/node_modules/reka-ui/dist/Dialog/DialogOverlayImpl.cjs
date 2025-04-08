'use strict';

const vue = require('vue');
const shared_useBodyScrollLock = require('../shared/useBodyScrollLock.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Dialog_DialogRoot = require('./DialogRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "DialogOverlayImpl",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const rootContext = Dialog_DialogRoot.injectDialogRootContext();
    shared_useBodyScrollLock.useBodyScrollLock(true);
    shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "data-state": vue.unref(rootContext).open.value ? "open" : "closed",
        style: { "pointer-events": "auto" }
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as", "as-child", "data-state"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=DialogOverlayImpl.cjs.map
