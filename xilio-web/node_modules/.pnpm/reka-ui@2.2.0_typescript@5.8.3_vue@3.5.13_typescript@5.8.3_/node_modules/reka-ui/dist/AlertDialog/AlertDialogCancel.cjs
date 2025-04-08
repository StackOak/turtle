'use strict';

const vue = require('vue');
const AlertDialog_AlertDialogContent = require('./AlertDialogContent.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Dialog_DialogClose = require('../Dialog/DialogClose.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "AlertDialogCancel",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const contentContext = AlertDialog_AlertDialogContent.injectAlertDialogContentContext();
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    vue.onMounted(() => {
      contentContext.onCancelElementChange(currentElement.value);
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Dialog_DialogClose._sfc_main), vue.mergeProps(props, { ref: vue.unref(forwardRef) }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=AlertDialogCancel.cjs.map
