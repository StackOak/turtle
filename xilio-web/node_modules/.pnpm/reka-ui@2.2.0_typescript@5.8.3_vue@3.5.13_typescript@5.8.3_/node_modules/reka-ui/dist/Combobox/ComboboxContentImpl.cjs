'use strict';

const vue = require('vue');
const DismissableLayer_DismissableLayer = require('../DismissableLayer/DismissableLayer.cjs');
const Popper_PopperContent = require('../Popper/PopperContent.cjs');
const shared_useBodyScrollLock = require('../shared/useBodyScrollLock.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useHideOthers = require('../shared/useHideOthers.cjs');
const shared_useForwardProps = require('../shared/useForwardProps.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const Listbox_ListboxContent = require('../Listbox/ListboxContent.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Combobox_ComboboxRoot = require('./ComboboxRoot.cjs');

const [injectComboboxContentContext, provideComboboxContentContext] = shared_createContext.createContext("ComboboxContent");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const { position } = vue.toRefs(props);
    const rootContext = Combobox_ComboboxRoot.injectComboboxRootContext();
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    shared_useBodyScrollLock.useBodyScrollLock(props.bodyLock);
    shared_useHideOthers.useHideOthers(rootContext.parentElement);
    const pickedProps = vue.computed(() => {
      if (props.position === "popper")
        return props;
      else return {};
    });
    const forwardedProps = shared_useForwardProps.useForwardProps(pickedProps.value);
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
    const isInputWithinContent = vue.ref(false);
    vue.onMounted(() => {
      if (rootContext.inputElement.value) {
        isInputWithinContent.value = currentElement.value.contains(rootContext.inputElement.value);
        if (isInputWithinContent.value) {
          rootContext.inputElement.value.focus();
        }
      }
    });
    vue.onUnmounted(() => {
      if (isInputWithinContent.value) {
        rootContext.triggerElement.value?.focus();
      }
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Listbox_ListboxContent._sfc_main), { "as-child": "" }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(DismissableLayer_DismissableLayer._sfc_main), {
            "as-child": "",
            "disable-outside-pointer-events": _ctx.disableOutsidePointerEvents,
            onDismiss: _cache[0] || (_cache[0] = ($event) => vue.unref(rootContext).onOpenChange(false)),
            onFocusOutside: _cache[1] || (_cache[1] = (ev) => {
              if (vue.unref(rootContext).parentElement.value?.contains(ev.target)) ev.preventDefault();
              emits("focusOutside", ev);
            }),
            onInteractOutside: _cache[2] || (_cache[2] = ($event) => emits("interactOutside", $event)),
            onEscapeKeyDown: _cache[3] || (_cache[3] = ($event) => emits("escapeKeyDown", $event)),
            onPointerDownOutside: _cache[4] || (_cache[4] = (ev) => {
              if (vue.unref(rootContext).parentElement.value?.contains(ev.target)) ev.preventDefault();
              emits("pointerDownOutside", ev);
            })
          }, {
            default: vue.withCtx(() => [
              (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(position) === "popper" ? vue.unref(Popper_PopperContent._sfc_main) : vue.unref(Primitive_Primitive.Primitive)), vue.mergeProps({ ..._ctx.$attrs, ...vue.unref(forwardedProps) }, {
                id: vue.unref(rootContext).contentId,
                ref: vue.unref(forwardRef),
                "data-state": vue.unref(rootContext).open.value ? "open" : "closed",
                style: {
                  // flex layout so we can place the scroll buttons properly
                  display: "flex",
                  flexDirection: "column",
                  // reset the outline by default as the content MAY get focused
                  outline: "none",
                  ...vue.unref(position) === "popper" ? popperStyle : {}
                }
              }), {
                default: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "default")
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

exports._sfc_main = _sfc_main;
exports.injectComboboxContentContext = injectComboboxContentContext;
//# sourceMappingURL=ComboboxContentImpl.cjs.map
