import { defineComponent, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { _ as _sfc_main$1 } from '../Separator/Separator.js';
import { i as injectStepperRootContext } from './StepperRoot.js';
import { i as injectStepperItemContext } from './StepperItem.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "StepperSeparator",
  props: {
    orientation: {},
    decorative: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectStepperRootContext();
    const itemContext = injectStepperItemContext();
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), mergeProps(props, {
        decorative: "",
        orientation: unref(rootContext).orientation.value,
        "data-state": unref(itemContext).state.value
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["orientation", "data-state"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=StepperSeparator.js.map
