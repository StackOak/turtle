'use strict';

const vue = require('vue');
const Menu_MenuContent = require('../Menu/MenuContent.cjs');
const shared_useForwardPropsEmits = require('../shared/useForwardPropsEmits.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const ContextMenu_ContextMenuRoot = require('./ContextMenuRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ContextMenuContent",
  props: {
    forceMount: { type: Boolean },
    loop: { type: Boolean },
    alignOffset: { default: 0 },
    avoidCollisions: { type: Boolean, default: true },
    collisionBoundary: { default: () => [] },
    collisionPadding: { default: 0 },
    sticky: { default: "partial" },
    hideWhenDetached: { type: Boolean, default: false },
    positionStrategy: {},
    disableUpdateOnLayoutShift: { type: Boolean },
    prioritizePosition: { type: Boolean },
    reference: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = shared_useForwardPropsEmits.useForwardPropsEmits(props, emits);
    shared_useForwardExpose.useForwardExpose();
    const rootContext = ContextMenu_ContextMenuRoot.injectContextMenuRootContext();
    const hasInteractedOutside = vue.ref(false);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Menu_MenuContent._sfc_main), vue.mergeProps(vue.unref(forwarded), {
        side: "right",
        "side-offset": 2,
        align: "start",
        "update-position-strategy": "always",
        style: {
          "--reka-context-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
          "--reka-context-menu-content-available-width": "var(--reka-popper-available-width)",
          "--reka-context-menu-content-available-height": "var(--reka-popper-available-height)",
          "--reka-context-menu-trigger-width": "var(--reka-popper-anchor-width)",
          "--reka-context-menu-trigger-height": "var(--reka-popper-anchor-height)"
        },
        onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
          if (!event.defaultPrevented && hasInteractedOutside.value) {
            event.preventDefault();
          }
          hasInteractedOutside.value = false;
        }),
        onInteractOutside: _cache[1] || (_cache[1] = (event) => {
          const originalEvent = event.detail.originalEvent;
          if (originalEvent.button === 2 && event.target === vue.unref(rootContext).triggerElement.value) {
            event.preventDefault();
          }
          if (!event.defaultPrevented && !vue.unref(rootContext).modal.value)
            hasInteractedOutside.value = true;
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
//# sourceMappingURL=ContextMenuContent.cjs.map
