'use strict';

const vue = require('vue');
const Menu_MenuSubContent = require('../Menu/MenuSubContent.cjs');
const shared_useForwardPropsEmits = require('../shared/useForwardPropsEmits.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ContextMenuSubContent",
  props: {
    forceMount: { type: Boolean },
    loop: { type: Boolean },
    sideOffset: {},
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
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "entryFocus", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = shared_useForwardPropsEmits.useForwardPropsEmits(props, emits);
    shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Menu_MenuSubContent._sfc_main), vue.mergeProps(vue.unref(forwarded), { style: {
        "--reka-context-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
        "--reka-context-menu-content-available-width": "var(--reka-popper-available-width)",
        "--reka-context-menu-content-available-height": "var(--reka-popper-available-height)",
        "--reka-context-menu-trigger-width": "var(--reka-popper-anchor-width)",
        "--reka-context-menu-trigger-height": "var(--reka-popper-anchor-height)"
      } }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ContextMenuSubContent.cjs.map
