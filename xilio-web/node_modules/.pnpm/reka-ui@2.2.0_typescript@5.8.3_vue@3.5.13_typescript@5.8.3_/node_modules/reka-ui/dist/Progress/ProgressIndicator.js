import { defineComponent, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { i as injectProgressRootContext } from './ProgressRoot.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProgressIndicator",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectProgressRootContext();
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        "data-state": unref(rootContext).progressState.value,
        "data-value": unref(rootContext).modelValue?.value ?? void 0,
        "data-max": unref(rootContext).max.value
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["data-state", "data-value", "data-max"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ProgressIndicator.js.map
