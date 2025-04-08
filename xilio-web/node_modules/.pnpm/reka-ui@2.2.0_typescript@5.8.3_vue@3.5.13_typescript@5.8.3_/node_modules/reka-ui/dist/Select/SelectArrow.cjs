'use strict';

const vue = require('vue');
const Popper_PopperArrow = require('../Popper/PopperArrow.cjs');
const Select_SelectRoot = require('./SelectRoot.cjs');
const Select_SelectContentImpl = require('./SelectContentImpl.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "SelectArrow",
  props: {
    width: { default: 10 },
    height: { default: 5 },
    rounded: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "svg" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = Select_SelectRoot.injectSelectRootContext();
    const contentContext = Select_SelectContentImpl.injectSelectContentContext(Select_SelectContentImpl.SelectContentDefaultContextValue);
    return (_ctx, _cache) => {
      return vue.unref(rootContext).open.value && vue.unref(contentContext).position === "popper" ? (vue.openBlock(), vue.createBlock(vue.unref(Popper_PopperArrow._sfc_main), vue.normalizeProps(vue.mergeProps({ key: 0 }, props)), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16)) : vue.createCommentVNode("", true);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=SelectArrow.cjs.map
