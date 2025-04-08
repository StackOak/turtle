'use strict';

const vue = require('vue');
const Dialog_DialogOverlayImpl = require('./DialogOverlayImpl.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Presence_Presence = require('../Presence/Presence.cjs');
const Dialog_DialogRoot = require('./DialogRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "DialogOverlay",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const rootContext = Dialog_DialogRoot.injectDialogRootContext();
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return vue.unref(rootContext)?.modal.value ? (vue.openBlock(), vue.createBlock(vue.unref(Presence_Presence.Presence), {
        key: 0,
        present: _ctx.forceMount || vue.unref(rootContext).open.value
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(Dialog_DialogOverlayImpl._sfc_main, vue.mergeProps(_ctx.$attrs, {
            ref: vue.unref(forwardRef),
            as: _ctx.as,
            "as-child": _ctx.asChild
          }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["as", "as-child"])
        ]),
        _: 3
      }, 8, ["present"])) : vue.createCommentVNode("", true);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=DialogOverlay.cjs.map
