import { defineComponent, toRefs, computed, ref, onMounted, onUnmounted, createBlock, openBlock, unref, withCtx, createVNode, resolveDynamicComponent, mergeProps, renderSlot } from 'vue';
import { _ as _sfc_main$2 } from '../DismissableLayer/DismissableLayer.js';
import { _ as _sfc_main$3 } from '../Popper/PopperContent.js';
import { u as useBodyScrollLock } from '../shared/useBodyScrollLock.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { u as useHideOthers } from '../shared/useHideOthers.js';
import { u as useForwardProps } from '../shared/useForwardProps.js';
import { c as createContext } from '../shared/createContext.js';
import { _ as _sfc_main$1 } from '../Listbox/ListboxContent.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectComboboxRootContext } from './ComboboxRoot.js';

const [injectComboboxContentContext, provideComboboxContentContext] = createContext("ComboboxContent");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ComboboxContentImpl",
  props: {
    position: { default: "inline" },
    bodyLock: { type: Boolean },
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
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { position } = toRefs(props);
    const rootContext = injectComboboxRootContext();
    const { forwardRef, currentElement } = useForwardExpose();
    useBodyScrollLock(props.bodyLock);
    useHideOthers(rootContext.parentElement);
    const pickedProps = computed(() => {
      if (props.position === "popper")
        return props;
      else return {};
    });
    const forwardedProps = useForwardProps(pickedProps.value);
    const popperStyle = {
      // Ensure border-box for floating-ui calculations
      "boxSizing": "border-box",
      "--reka-combobox-content-transform-origin": "var(--reka-popper-transform-origin)",
      "--reka-combobox-content-available-width": "var(--reka-popper-available-width)",
      "--reka-combobox-content-available-height": "var(--reka-popper-available-height)",
      "--reka-combobox-trigger-width": "var(--reka-popper-anchor-width)",
      "--reka-combobox-trigger-height": "var(--reka-popper-anchor-height)"
    };
    provideComboboxContentContext({ position });
    const isInputWithinContent = ref(false);
    onMounted(() => {
      if (rootContext.inputElement.value) {
        isInputWithinContent.value = currentElement.value.contains(rootContext.inputElement.value);
        if (isInputWithinContent.value) {
          rootContext.inputElement.value.focus();
        }
      }
    });
    onUnmounted(() => {
      if (isInputWithinContent.value) {
        rootContext.triggerElement.value?.focus();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), { "as-child": "" }, {
        default: withCtx(() => [
          createVNode(unref(_sfc_main$2), {
            "as-child": "",
            "disable-outside-pointer-events": _ctx.disableOutsidePointerEvents,
            onDismiss: _cache[0] || (_cache[0] = ($event) => unref(rootContext).onOpenChange(false)),
            onFocusOutside: _cache[1] || (_cache[1] = (ev) => {
              if (unref(rootContext).parentElement.value?.contains(ev.target)) ev.preventDefault();
              emits("focusOutside", ev);
            }),
            onInteractOutside: _cache[2] || (_cache[2] = ($event) => emits("interactOutside", $event)),
            onEscapeKeyDown: _cache[3] || (_cache[3] = ($event) => emits("escapeKeyDown", $event)),
            onPointerDownOutside: _cache[4] || (_cache[4] = (ev) => {
              if (unref(rootContext).parentElement.value?.contains(ev.target)) ev.preventDefault();
              emits("pointerDownOutside", ev);
            })
          }, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent(unref(position) === "popper" ? unref(_sfc_main$3) : unref(Primitive)), mergeProps({ ..._ctx.$attrs, ...unref(forwardedProps) }, {
                id: unref(rootContext).contentId,
                ref: unref(forwardRef),
                "data-state": unref(rootContext).open.value ? "open" : "closed",
                style: {
                  // flex layout so we can place the scroll buttons properly
                  display: "flex",
                  flexDirection: "column",
                  // reset the outline by default as the content MAY get focused
                  outline: "none",
                  ...unref(position) === "popper" ? popperStyle : {}
                }
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 16, ["id", "data-state", "style"]))
            ]),
            _: 3
          }, 8, ["disable-outside-pointer-events"])
        ]),
        _: 3
      });
    };
  }
});

export { _sfc_main as _, injectComboboxContentContext as i };
//# sourceMappingURL=ComboboxContentImpl.js.map
