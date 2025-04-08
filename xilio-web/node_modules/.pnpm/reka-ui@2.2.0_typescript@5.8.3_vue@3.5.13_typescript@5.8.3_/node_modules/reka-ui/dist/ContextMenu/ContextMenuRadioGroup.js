import { defineComponent, createBlock, openBlock, unref, normalizeProps, guardReactiveProps, withCtx, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from '../Menu/MenuRadioGroup.js';
import { u as useEmitAsProps } from '../shared/useEmitAsProps.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ContextMenuRadioGroup",
  props: {
    modelValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const emitsAsProps = useEmitAsProps(emits);
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), normalizeProps(guardReactiveProps({ ...props, ...unref(emitsAsProps) })), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ContextMenuRadioGroup.js.map
