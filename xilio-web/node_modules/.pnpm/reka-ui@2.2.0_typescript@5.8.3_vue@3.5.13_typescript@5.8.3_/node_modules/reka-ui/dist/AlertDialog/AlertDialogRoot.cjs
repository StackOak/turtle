'use strict';

const vue = require('vue');
const shared_useForwardPropsEmits = require('../shared/useForwardPropsEmits.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Dialog_DialogRoot = require('../Dialog/DialogRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "AlertDialogRoot",
  props: {
    open: { type: Boolean },
    defaultOpen: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = shared_useForwardPropsEmits.useForwardPropsEmits(props, emits);
    shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Dialog_DialogRoot._sfc_main), vue.mergeProps(vue.unref(forwarded), { modal: true }), {
        default: vue.withCtx((slotProps) => [
          vue.renderSlot(_ctx.$slots, "default", vue.normalizeProps(vue.guardReactiveProps(slotProps)))
        ]),
        _: 3
      }, 16);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=AlertDialogRoot.cjs.map
