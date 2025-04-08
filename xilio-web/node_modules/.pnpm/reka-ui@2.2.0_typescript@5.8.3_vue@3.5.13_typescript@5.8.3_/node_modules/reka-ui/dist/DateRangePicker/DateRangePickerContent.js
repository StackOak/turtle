import { defineComponent, createBlock, openBlock, unref, withCtx, createVNode, normalizeProps, guardReactiveProps, renderSlot } from 'vue';
import '@floating-ui/vue';
import { u as useForwardPropsEmits } from '../shared/useForwardPropsEmits.js';
import { _ as _sfc_main$1 } from '../Popover/PopoverPortal.js';
import { _ as _sfc_main$2 } from '../Popover/PopoverContent.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DateRangePickerContent",
  props: {
    forceMount: { type: Boolean },
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    positionStrategy: {},
    updatePositionStrategy: {},
    disableUpdateOnLayoutShift: { type: Boolean },
    prioritizePosition: { type: Boolean },
    reference: {},
    asChild: { type: Boolean },
    as: {},
    disableOutsidePointerEvents: { type: Boolean }
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), null, {
        default: withCtx(() => [
          createVNode(unref(_sfc_main$2), normalizeProps(guardReactiveProps({ ...unref(forwarded), ..._ctx.$attrs })), {
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
//# sourceMappingURL=DateRangePickerContent.js.map
