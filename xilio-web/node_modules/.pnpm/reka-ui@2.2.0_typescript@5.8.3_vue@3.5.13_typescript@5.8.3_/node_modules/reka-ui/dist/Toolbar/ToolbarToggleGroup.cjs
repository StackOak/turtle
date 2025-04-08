'use strict';

const vue = require('vue');
const Toolbar_ToolbarRoot = require('./ToolbarRoot.cjs');
const shared_useEmitAsProps = require('../shared/useEmitAsProps.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const ToggleGroup_ToggleGroupRoot = require('../ToggleGroup/ToggleGroupRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ToolbarToggleGroup",
  props: {
    rovingFocus: { type: Boolean },
    disabled: { type: Boolean },
    orientation: {},
    dir: {},
    loop: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    name: {},
    required: { type: Boolean },
    type: {},
    modelValue: {},
    defaultValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = Toolbar_ToolbarRoot.injectToolbarRootContext();
    const emitsAsProps = shared_useEmitAsProps.useEmitAsProps(emits);
    shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(ToggleGroup_ToggleGroupRoot._sfc_main), vue.mergeProps({ ...props, ...vue.unref(emitsAsProps) }, {
        "data-orientation": vue.unref(rootContext).orientation.value,
        dir: vue.unref(rootContext).dir.value,
        "roving-focus": false
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["data-orientation", "dir"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ToolbarToggleGroup.cjs.map
