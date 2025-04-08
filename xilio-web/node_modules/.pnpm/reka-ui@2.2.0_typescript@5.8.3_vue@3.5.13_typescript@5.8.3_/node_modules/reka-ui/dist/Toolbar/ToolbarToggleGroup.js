import { defineComponent, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { i as injectToolbarRootContext } from './ToolbarRoot.js';
import { u as useEmitAsProps } from '../shared/useEmitAsProps.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { _ as _sfc_main$1 } from '../ToggleGroup/ToggleGroupRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ToolbarToggleGroup",
  props: {
    rovingFocus: { type: Boolean },
    disabled: { type: Boolean },
    orientation: {},
    dir: {},
    loop: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    name: {},
    required: { type: Boolean },
    type: {},
    modelValue: {},
    defaultValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = injectToolbarRootContext();
    const emitsAsProps = useEmitAsProps(emits);
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), mergeProps({ ...props, ...unref(emitsAsProps) }, {
        "data-orientation": unref(rootContext).orientation.value,
        dir: unref(rootContext).dir.value,
        "roving-focus": false
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["data-orientation", "dir"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ToolbarToggleGroup.js.map
