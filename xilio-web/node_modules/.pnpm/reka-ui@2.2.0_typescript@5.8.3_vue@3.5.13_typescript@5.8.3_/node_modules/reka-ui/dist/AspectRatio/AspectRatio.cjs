'use strict';

const vue = require('vue');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "AspectRatio",
  props: {
    ratio: { default: 1 },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    const aspect = vue.computed(() => {
      return 1 / props.ratio * 100;
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", {
        style: vue.normalizeStyle(`position: relative; width: 100%; padding-bottom: ${aspect.value}%`),
        "data-reka-aspect-ratio-wrapper": ""
      }, [
        vue.createVNode(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({
          ref: vue.unref(forwardRef),
          "as-child": _ctx.asChild,
          as: _ctx.as,
          style: { "position": "absolute", "inset": "0px" }
        }, _ctx.$attrs), {
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "default", { aspect: aspect.value })
          ]),
          _: 3
        }, 16, ["as-child", "as"])
      ], 4);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=AspectRatio.cjs.map
