import { defineComponent, createBlock, openBlock, unref, normalizeProps, guardReactiveProps, withCtx, renderSlot, createTextVNode, toDisplayString } from 'vue';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectStepperItemContext } from './StepperItem.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "StepperIndicator",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const itemContext = injectStepperItemContext();
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), normalizeProps(guardReactiveProps(props)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {
            step: unref(itemContext).step.value
          }, () => [
            createTextVNode(" Step " + toDisplayString(unref(itemContext).step.value), 1)
          ])
        ]),
        _: 3
      }, 16);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=StepperIndicator.js.map
