'use strict';

const vue = require('vue');
const Menu_MenuPortal = require('../Menu/MenuPortal.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ContextMenuPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    defer: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Menu_MenuPortal._sfc_main), vue.normalizeProps(vue.guardReactiveProps(props)), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ContextMenuPortal.cjs.map
