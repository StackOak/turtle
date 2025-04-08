'use strict';

const vue = require('vue');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Stepper_StepperItem = require('./StepperItem.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "StepperIndicator",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const itemContext = Stepper_StepperItem.injectStepperItemContext();
    shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.normalizeProps(vue.guardReactiveProps(props)), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {
            step: vue.unref(itemContext).step.value
          }, () => [
            vue.createTextVNode(" Step " + vue.toDisplayString(vue.unref(itemContext).step.value), 1)
          ])
        ]),
        _: 3
      }, 16);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=StepperIndicator.cjs.map
