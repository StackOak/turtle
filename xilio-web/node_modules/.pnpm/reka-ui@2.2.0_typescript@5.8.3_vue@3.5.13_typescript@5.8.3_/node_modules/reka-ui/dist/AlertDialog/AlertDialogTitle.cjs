'use strict';

const vue = require('vue');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Dialog_DialogTitle = require('../Dialog/DialogTitle.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "AlertDialogTitle",
  props: {
    asChild: { type: Boolean },
    as: { default: "h2" }
  },
  setup(__props) {
    const props = __props;
    shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Dialog_DialogTitle._sfc_main), vue.normalizeProps(vue.guardReactiveProps(props)), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=AlertDialogTitle.cjs.map
