import { defineComponent, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectStepperItemContext } from './StepperItem.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "StepperDescription",
  props: {
    asChild: { type: Boolean },
    as: { default: "p" }
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    const itemContext = injectStepperItemContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        id: unref(itemContext).descriptionId
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["id"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=StepperDescription.js.map
