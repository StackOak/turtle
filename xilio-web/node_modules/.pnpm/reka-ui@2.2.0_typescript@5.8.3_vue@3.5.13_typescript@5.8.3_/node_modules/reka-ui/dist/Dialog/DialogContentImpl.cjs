'use strict';

const vue = require('vue');
const DismissableLayer_DismissableLayer = require('../DismissableLayer/DismissableLayer.cjs');
const Menu_utils = require('../Menu/utils.cjs');
const Dialog_utils = require('./utils.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useId = require('../shared/useId.cjs');
const shared_getActiveElement = require('../shared/getActiveElement.cjs');
const FocusScope_FocusScope = require('../FocusScope/FocusScope.cjs');
const Dialog_DialogRoot = require('./DialogRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "DialogContentImpl",
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
    const { forwardRef, currentElement: contentElement } = shared_useForwardExpose.useForwardExpose();
    rootContext.titleId ||= shared_useId.useId(void 0, "reka-dialog-title");
    rootContext.descriptionId ||= shared_useId.useId(void 0, "reka-dialog-description");
    vue.onMounted(() => {
      rootContext.contentElement = contentElement;
      if (shared_getActiveElement.getActiveElement() !== document.body)
        rootContext.triggerElement.value = shared_getActiveElement.getActiveElement();
    });
    if (process.env.NODE_ENV !== "production") {
      Dialog_utils.useWarning({
        titleName: "DialogTitle",
        contentName: "DialogContent",
        componentLink: "dialog.html#title",
        titleId: rootContext.titleId,
        descriptionId: rootContext.descriptionId,
        contentElement
      });
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(FocusScope_FocusScope._sfc_main), {
        "as-child": "",
        loop: "",
        trapped: props.trapFocus,
        onMountAutoFocus: _cache[5] || (_cache[5] = ($event) => emits("openAutoFocus", $event)),
        onUnmountAutoFocus: _cache[6] || (_cache[6] = ($event) => emits("closeAutoFocus", $event))
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(DismissableLayer_DismissableLayer._sfc_main), vue.mergeProps({
            id: vue.unref(rootContext).contentId,
            ref: vue.unref(forwardRef),
            as: _ctx.as,
            "as-child": _ctx.asChild,
            "disable-outside-pointer-events": _ctx.disableOutsidePointerEvents,
            role: "dialog",
            "aria-describedby": vue.unref(rootContext).descriptionId,
            "aria-labelledby": vue.unref(rootContext).titleId,
            "data-state": vue.unref(Menu_utils.getOpenState)(vue.unref(rootContext).open.value)
          }, _ctx.$attrs, {
            onDismiss: _cache[0] || (_cache[0] = ($event) => vue.unref(rootContext).onOpenChange(false)),
            onEscapeKeyDown: _cache[1] || (_cache[1] = ($event) => emits("escapeKeyDown", $event)),
            onFocusOutside: _cache[2] || (_cache[2] = ($event) => emits("focusOutside", $event)),
            onInteractOutside: _cache[3] || (_cache[3] = ($event) => emits("interactOutside", $event)),
            onPointerDownOutside: _cache[4] || (_cache[4] = ($event) => emits("pointerDownOutside", $event))
          }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["id", "as", "as-child", "disable-outside-pointer-events", "aria-describedby", "aria-labelledby", "data-state"])
        ]),
        _: 3
      }, 8, ["trapped"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=DialogContentImpl.cjs.map
