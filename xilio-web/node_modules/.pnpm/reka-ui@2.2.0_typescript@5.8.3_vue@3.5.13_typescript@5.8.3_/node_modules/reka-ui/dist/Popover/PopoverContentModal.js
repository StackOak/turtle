import { defineComponent, ref, createBlock, openBlock, mergeProps, unref, withModifiers, withCtx, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from './PopoverContentImpl.js';
import { u as useBodyScrollLock } from '../shared/useBodyScrollLock.js';
import { u as useForwardPropsEmits } from '../shared/useForwardPropsEmits.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { u as useHideOthers } from '../shared/useHideOthers.js';
import { i as injectPopoverRootContext } from './PopoverRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PopoverContentModal",
  props: {
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
    const isRightClickOutsideRef = ref(false);
    useBodyScrollLock(true);
    const forwarded = useForwardPropsEmits(props, emits);
    const { forwardRef, currentElement } = useForwardExpose();
    useHideOthers(currentElement);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, mergeProps(unref(forwarded), {
        ref: unref(forwardRef),
        "trap-focus": unref(rootContext).open.value,
        "disable-outside-pointer-events": "",
        onCloseAutoFocus: _cache[0] || (_cache[0] = withModifiers(
          (event) => {
            emits("closeAutoFocus", event);
            if (!isRightClickOutsideRef.value) unref(rootContext).triggerElement.value?.focus();
          },
          ["prevent"]
        )),
        onPointerDownOutside: _cache[1] || (_cache[1] = (event) => {
          emits("pointerDownOutside", event);
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          isRightClickOutsideRef.value = isRightClick;
        }),
        onFocusOutside: _cache[2] || (_cache[2] = withModifiers(() => {
        }, ["prevent"]))
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["trap-focus"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=PopoverContentModal.js.map
