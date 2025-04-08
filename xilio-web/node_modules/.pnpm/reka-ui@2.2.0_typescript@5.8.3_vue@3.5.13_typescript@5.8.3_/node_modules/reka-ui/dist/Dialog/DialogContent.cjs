'use strict';

const vue = require('vue');
const Dialog_DialogContentModal = require('./DialogContentModal.cjs');
const Dialog_DialogContentNonModal = require('./DialogContentNonModal.cjs');
const shared_useEmitAsProps = require('../shared/useEmitAsProps.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Presence_Presence = require('../Presence/Presence.cjs');
const Dialog_DialogRoot = require('./DialogRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "DialogContent",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = Dialog_DialogRoot.injectDialogRootContext();
    const emitsAsProps = shared_useEmitAsProps.useEmitAsProps(emits);
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Presence_Presence.Presence), {
        present: _ctx.forceMount || vue.unref(rootContext).open.value
      }, {
        default: vue.withCtx(() => [
          vue.unref(rootContext).modal.value ? (vue.openBlock(), vue.createBlock(Dialog_DialogContentModal._sfc_main, vue.mergeProps({
            key: 0,
            ref: vue.unref(forwardRef)
          }, { ...props, ...vue.unref(emitsAsProps), ..._ctx.$attrs }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16)) : (vue.openBlock(), vue.createBlock(Dialog_DialogContentNonModal._sfc_main, vue.mergeProps({
            key: 1,
            ref: vue.unref(forwardRef)
          }, { ...props, ...vue.unref(emitsAsProps), ..._ctx.$attrs }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16))
        ]),
        _: 3
      }, 8, ["present"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=DialogContent.cjs.map
