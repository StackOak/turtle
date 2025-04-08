'use strict';

const vue = require('vue');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Separator_Separator = require('../Separator/Separator.cjs');
const Stepper_StepperRoot = require('./StepperRoot.cjs');
const Stepper_StepperItem = require('./StepperItem.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "StepperSeparator",
  props: {
    orientation: {},
    decorative: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const rootContext = Stepper_StepperRoot.injectStepperRootContext();
    const itemContext = Stepper_StepperItem.injectStepperItemContext();
    shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Separator_Separator._sfc_main), vue.mergeProps(props, {
        decorative: "",
        orientation: vue.unref(rootContext).orientation.value,
        "data-state": vue.unref(itemContext).state.value
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["orientation", "data-state"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=StepperSeparator.cjs.map
