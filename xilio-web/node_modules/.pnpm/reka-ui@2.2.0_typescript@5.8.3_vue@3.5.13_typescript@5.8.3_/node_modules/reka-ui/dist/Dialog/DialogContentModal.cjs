'use strict';

const vue = require('vue');
const Dialog_DialogContentImpl = require('./DialogContentImpl.cjs');
const shared_useEmitAsProps = require('../shared/useEmitAsProps.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useHideOthers = require('../shared/useHideOthers.cjs');
const Dialog_DialogRoot = require('./DialogRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const rootContext = Dialog_DialogRoot.injectDialogRootContext();
    const emitsAsProps = shared_useEmitAsProps.useEmitAsProps(emits);
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    shared_useHideOthers.useHideOthers(currentElement);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(Dialog_DialogContentImpl._sfc_main, vue.mergeProps({ ...props, ...vue.unref(emitsAsProps) }, {
        ref: vue.unref(forwardRef),
        "trap-focus": vue.unref(rootContext).open.value,
        "disable-outside-pointer-events": true,
        onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
          if (!event.defaultPrevented) {
            event.preventDefault();
            vue.unref(rootContext).triggerElement.value?.focus();
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
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["trap-focus"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=DialogContentModal.cjs.map
