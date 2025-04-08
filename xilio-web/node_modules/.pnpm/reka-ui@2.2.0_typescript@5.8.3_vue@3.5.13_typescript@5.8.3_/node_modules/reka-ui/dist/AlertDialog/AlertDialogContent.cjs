'use strict';

const vue = require('vue');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useEmitAsProps = require('../shared/useEmitAsProps.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Dialog_DialogContent = require('../Dialog/DialogContent.cjs');

const [injectAlertDialogContentContext, provideAlertDialogContentContext] = shared_createContext.createContext("AlertDialogContent");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const emitsAsProps = shared_useEmitAsProps.useEmitAsProps(emits);
    shared_useForwardExpose.useForwardExpose();
    const cancelElement = vue.ref();
    provideAlertDialogContentContext({
      onCancelElementChange: (el) => {
        cancelElement.value = el;
      }
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Dialog_DialogContent._sfc_main), vue.mergeProps({ ...props, ...vue.unref(emitsAsProps) }, {
        role: "alertdialog",
        onPointerDownOutside: _cache[0] || (_cache[0] = vue.withModifiers(() => {
        }, ["prevent"])),
        onInteractOutside: _cache[1] || (_cache[1] = vue.withModifiers(() => {
        }, ["prevent"])),
        onOpenAutoFocus: _cache[2] || (_cache[2] = () => {
          vue.nextTick(() => {
            cancelElement.value?.focus({
              preventScroll: true
            });
          });
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
exports.injectAlertDialogContentContext = injectAlertDialogContentContext;
//# sourceMappingURL=AlertDialogContent.cjs.map
