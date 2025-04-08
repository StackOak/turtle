'use strict';

const vue = require('vue');
const Progress_ProgressRoot = require('./ProgressRoot.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ProgressIndicator",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const rootContext = Progress_ProgressRoot.injectProgressRootContext();
    shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(props, {
        "data-state": vue.unref(rootContext).progressState.value,
        "data-value": vue.unref(rootContext).modelValue?.value ?? void 0,
        "data-max": vue.unref(rootContext).max.value
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["data-state", "data-value", "data-max"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ProgressIndicator.cjs.map
