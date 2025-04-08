import { defineComponent, ref, createBlock, openBlock, unref, mergeProps, withModifiers, nextTick, withCtx, renderSlot } from 'vue';
import { c as createContext } from '../shared/createContext.js';
import { u as useEmitAsProps } from '../shared/useEmitAsProps.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { _ as _sfc_main$1 } from '../Dialog/DialogContent.js';

const [injectAlertDialogContentContext, provideAlertDialogContentContext] = createContext("AlertDialogContent");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AlertDialogContent",
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
    const emitsAsProps = useEmitAsProps(emits);
    useForwardExpose();
    const cancelElement = ref();
    provideAlertDialogContentContext({
      onCancelElementChange: (el) => {
        cancelElement.value = el;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), mergeProps({ ...props, ...unref(emitsAsProps) }, {
        role: "alertdialog",
        onPointerDownOutside: _cache[0] || (_cache[0] = withModifiers(() => {
        }, ["prevent"])),
        onInteractOutside: _cache[1] || (_cache[1] = withModifiers(() => {
        }, ["prevent"])),
        onOpenAutoFocus: _cache[2] || (_cache[2] = () => {
          nextTick(() => {
            cancelElement.value?.focus({
              preventScroll: true
            });
          });
        })
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

export { _sfc_main as _, injectAlertDialogContentContext as i };
//# sourceMappingURL=AlertDialogContent.js.map
