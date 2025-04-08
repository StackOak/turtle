'use strict';

const vue = require('vue');
const Toolbar_ToolbarButton = require('./ToolbarButton.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const ToggleGroup_ToggleGroupItem = require('../ToggleGroup/ToggleGroupItem.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ToolbarToggleItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(Toolbar_ToolbarButton._sfc_main, { "as-child": "" }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(ToggleGroup_ToggleGroupItem._sfc_main), vue.mergeProps(props, { ref: vue.unref(forwardRef) }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16)
        ]),
        _: 3
      });
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ToolbarToggleItem.cjs.map
