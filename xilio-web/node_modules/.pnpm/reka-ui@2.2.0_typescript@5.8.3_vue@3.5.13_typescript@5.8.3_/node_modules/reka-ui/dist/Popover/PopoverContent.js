import { defineComponent, createBlock, openBlock, unref, withCtx, mergeProps, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from './PopoverContentModal.js';
import { _ as _sfc_main$2 } from './PopoverContentNonModal.js';
import { u as useForwardPropsEmits } from '../shared/useForwardPropsEmits.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { u as useId } from '../shared/useId.js';
import { P as Presence } from '../Presence/Presence.js';
import { i as injectPopoverRootContext } from './PopoverRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PopoverContent",
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
    const rootContext = injectPopoverRootContext();
    const forwarded = useForwardPropsEmits(props, emits);
    const { forwardRef } = useForwardExpose();
    rootContext.contentId ||= useId(void 0, "reka-popover-content");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Presence), {
        present: _ctx.forceMount || unref(rootContext).open.value
      }, {
        default: withCtx(() => [
          unref(rootContext).modal.value ? (openBlock(), createBlock(_sfc_main$1, mergeProps({ key: 0 }, unref(forwarded), { ref: unref(forwardRef) }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16)) : (openBlock(), createBlock(_sfc_main$2, mergeProps({ key: 1 }, unref(forwarded), { ref: unref(forwardRef) }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16))
        ]),
        _: 3
      }, 8, ["present"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=PopoverContent.js.map
