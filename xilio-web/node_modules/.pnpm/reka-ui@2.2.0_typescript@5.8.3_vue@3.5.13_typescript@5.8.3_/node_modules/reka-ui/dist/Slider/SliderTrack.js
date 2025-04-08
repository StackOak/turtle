import { defineComponent, createBlock, openBlock, unref, withCtx, renderSlot } from 'vue';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectSliderRootContext } from './SliderRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SliderTrack",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const rootContext = injectSliderRootContext();
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        "as-child": _ctx.asChild,
        as: _ctx.as,
        "data-disabled": unref(rootContext).disabled.value ? "" : void 0,
        "data-orientation": unref(rootContext).orientation.value
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as-child", "as", "data-disabled", "data-orientation"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=SliderTrack.js.map
