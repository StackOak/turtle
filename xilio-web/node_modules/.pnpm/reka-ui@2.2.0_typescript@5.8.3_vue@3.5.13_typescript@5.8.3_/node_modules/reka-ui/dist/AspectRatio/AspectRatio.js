import { defineComponent, computed, createElementBlock, openBlock, normalizeStyle, createVNode, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
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
    const { forwardRef } = useForwardExpose();
    const aspect = computed(() => {
      return 1 / props.ratio * 100;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        style: normalizeStyle(`position: relative; width: 100%; padding-bottom: ${aspect.value}%`),
        "data-reka-aspect-ratio-wrapper": ""
      }, [
        createVNode(unref(Primitive), mergeProps({
          ref: unref(forwardRef),
          "as-child": _ctx.asChild,
          as: _ctx.as,
          style: { "position": "absolute", "inset": "0px" }
        }, _ctx.$attrs), {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default", { aspect: aspect.value })
          ]),
          _: 3
        }, 16, ["as-child", "as"])
      ], 4);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=AspectRatio.js.map
