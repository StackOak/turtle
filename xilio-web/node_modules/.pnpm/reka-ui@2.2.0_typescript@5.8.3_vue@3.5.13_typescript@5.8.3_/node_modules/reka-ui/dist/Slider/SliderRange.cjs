'use strict';

const vue = require('vue');
const Slider_utils = require('./utils.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Slider_SliderRoot = require('./SliderRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "SliderRange",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const rootContext = Slider_SliderRoot.injectSliderRootContext();
    const orientation = Slider_utils.injectSliderOrientationContext();
    shared_useForwardExpose.useForwardExpose();
    const percentages = vue.computed(() => rootContext.currentModelValue.value.map(
      (value) => Slider_utils.convertValueToPercentage(value, rootContext.min.value, rootContext.max.value)
    ));
    const offsetStart = vue.computed(() => rootContext.currentModelValue.value.length > 1 ? Math.min(...percentages.value) : 0);
    const offsetEnd = vue.computed(() => 100 - Math.max(...percentages.value, 0));
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        "data-disabled": vue.unref(rootContext).disabled.value ? "" : void 0,
        "data-orientation": vue.unref(rootContext).orientation.value,
        "as-child": _ctx.asChild,
        as: _ctx.as,
        style: vue.normalizeStyle({
          [vue.unref(orientation).startEdge]: `${offsetStart.value}%`,
          [vue.unref(orientation).endEdge]: `${offsetEnd.value}%`
        })
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["data-disabled", "data-orientation", "as-child", "as", "style"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=SliderRange.cjs.map
