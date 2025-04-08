'use strict';

const vue = require('vue');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Dialog_DialogOverlay = require('../Dialog/DialogOverlay.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "AlertDialogOverlay",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Dialog_DialogOverlay._sfc_main), vue.normalizeProps(vue.guardReactiveProps(props)), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=AlertDialogOverlay.cjs.map
