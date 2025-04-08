import { defineComponent, computed, createBlock, openBlock, unref, normalizeStyle, withCtx, renderSlot } from 'vue';
import { i as injectSliderOrientationContext, c as convertValueToPercentage } from './utils.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectSliderRootContext } from './SliderRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SliderRange",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const rootContext = injectSliderRootContext();
    const orientation = injectSliderOrientationContext();
    useForwardExpose();
    const percentages = computed(() => rootContext.currentModelValue.value.map(
      (value) => convertValueToPercentage(value, rootContext.min.value, rootContext.max.value)
    ));
    const offsetStart = computed(() => rootContext.currentModelValue.value.length > 1 ? Math.min(...percentages.value) : 0);
    const offsetEnd = computed(() => 100 - Math.max(...percentages.value, 0));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        "data-disabled": unref(rootContext).disabled.value ? "" : void 0,
        "data-orientation": unref(rootContext).orientation.value,
        "as-child": _ctx.asChild,
        as: _ctx.as,
        style: normalizeStyle({
          [unref(orientation).startEdge]: `${offsetStart.value}%`,
          [unref(orientation).endEdge]: `${offsetEnd.value}%`
        })
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["data-disabled", "data-orientation", "as-child", "as", "style"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=SliderRange.js.map
