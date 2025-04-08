import { defineComponent, createBlock, openBlock, withCtx, createVNode, unref, mergeProps, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from './ToolbarButton.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { _ as _sfc_main$2 } from '../ToggleGroup/ToggleGroupItem.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ToolbarToggleItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const { forwardRef } = useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, { "as-child": "" }, {
        default: withCtx(() => [
          createVNode(unref(_sfc_main$2), mergeProps(props, { ref: unref(forwardRef) }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16)
        ]),
        _: 3
      });
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ToolbarToggleItem.js.map
