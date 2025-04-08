'use strict';

const vue = require('vue');
const Dialog_DialogContentImpl = require('./DialogContentImpl.cjs');
const shared_useEmitAsProps = require('../shared/useEmitAsProps.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Dialog_DialogRoot = require('./DialogRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "DialogContentNonModal",
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
    const emitsAsProps = shared_useEmitAsProps.useEmitAsProps(emits);
    shared_useForwardExpose.useForwardExpose();
    const rootContext = Dialog_DialogRoot.injectDialogRootContext();
    const hasInteractedOutsideRef = vue.ref(false);
    const hasPointerDownOutsideRef = vue.ref(false);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(Dialog_DialogContentImpl._sfc_main, vue.mergeProps({ ...props, ...vue.unref(emitsAsProps) }, {
        "trap-focus": false,
        "disable-outside-pointer-events": false,
        onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.value) vue.unref(rootContext).triggerElement.value?.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.value = false;
          hasPointerDownOutsideRef.value = false;
        }),
        onInteractOutside: _cache[1] || (_cache[1] = (event) => {
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.value = true;
            if (event.detail.originalEvent.type === "pointerdown") {
              hasPointerDownOutsideRef.value = true;
            }
          }
          const target = event.target;
          const targetIsTrigger = vue.unref(rootContext).triggerElement.value?.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.value) {
            event.preventDefault();
          }
        })
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=DialogContentNonModal.cjs.map
