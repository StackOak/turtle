'use strict';

const vue = require('vue');
const component_BaseSeparator = require('../component/BaseSeparator.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Toolbar_ToolbarRoot = require('./ToolbarRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ToolbarSeparator",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const rootContext = Toolbar_ToolbarRoot.injectToolbarRootContext();
    shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(component_BaseSeparator._sfc_main, {
        orientation: vue.unref(rootContext).orientation.value,
        "as-child": props.asChild,
        as: _ctx.as
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["orientation", "as-child", "as"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ToolbarSeparator.cjs.map
