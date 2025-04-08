'use strict';

const vue = require('vue');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Slider_SliderRoot = require('./SliderRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "SliderTrack",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const rootContext = Slider_SliderRoot.injectSliderRootContext();
    shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        "as-child": _ctx.asChild,
        as: _ctx.as,
        "data-disabled": vue.unref(rootContext).disabled.value ? "" : void 0,
        "data-orientation": vue.unref(rootContext).orientation.value
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as-child", "as", "data-disabled", "data-orientation"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=SliderTrack.cjs.map
