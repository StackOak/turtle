import { defineComponent, createBlock, openBlock, mergeProps, unref, withCtx, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from './DialogContentImpl.js';
import { u as useEmitAsProps } from '../shared/useEmitAsProps.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { u as useHideOthers } from '../shared/useHideOthers.js';
import { i as injectDialogRootContext } from './DialogRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DialogContentModal",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = injectDialogRootContext();
    const emitsAsProps = useEmitAsProps(emits);
    const { forwardRef, currentElement } = useForwardExpose();
    useHideOthers(currentElement);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, mergeProps({ ...props, ...unref(emitsAsProps) }, {
        ref: unref(forwardRef),
        "trap-focus": unref(rootContext).open.value,
        "disable-outside-pointer-events": true,
        onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
          if (!event.defaultPrevented) {
            event.preventDefault();
            unref(rootContext).triggerElement.value?.focus();
          }
        }),
        onPointerDownOutside: _cache[1] || (_cache[1] = (event) => {
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (isRightClick) event.preventDefault();
        }),
        onFocusOutside: _cache[2] || (_cache[2] = (event) => {
          event.preventDefault();
        })
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
//# sourceMappingURL=DialogContentModal.js.map
