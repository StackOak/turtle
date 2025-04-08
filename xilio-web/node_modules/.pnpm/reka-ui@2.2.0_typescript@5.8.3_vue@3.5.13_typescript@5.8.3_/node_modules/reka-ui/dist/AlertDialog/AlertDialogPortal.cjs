'use strict';

const vue = require('vue');
const Teleport_Teleport = require('../Teleport/Teleport.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "AlertDialogPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    defer: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Teleport_Teleport._sfc_main), vue.normalizeProps(vue.guardReactiveProps(props)), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=AlertDialogPortal.cjs.map
