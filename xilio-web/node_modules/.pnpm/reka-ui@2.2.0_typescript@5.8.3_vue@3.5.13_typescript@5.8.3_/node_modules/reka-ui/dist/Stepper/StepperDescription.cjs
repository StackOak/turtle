'use strict';

const vue = require('vue');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Stepper_StepperItem = require('./StepperItem.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "StepperDescription",
  props: {
    asChild: { type: Boolean },
    as: { default: "p" }
  },
  setup(__props) {
    const props = __props;
    shared_useForwardExpose.useForwardExpose();
    const itemContext = Stepper_StepperItem.injectStepperItemContext();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(props, {
        id: vue.unref(itemContext).descriptionId
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["id"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=StepperDescription.cjs.map
