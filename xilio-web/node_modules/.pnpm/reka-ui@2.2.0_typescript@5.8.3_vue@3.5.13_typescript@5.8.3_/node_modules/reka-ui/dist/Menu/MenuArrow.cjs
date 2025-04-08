'use strict';

const vue = require('vue');
const Popper_PopperArrow = require('../Popper/PopperArrow.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "MenuArrow",
  props: {
    width: {},
    height: {},
    rounded: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Popper_PopperArrow._sfc_main), vue.normalizeProps(vue.guardReactiveProps(props)), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=MenuArrow.cjs.map
