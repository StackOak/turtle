'use strict';

const vue = require('vue');
const Menu_MenuContentImpl = require('./MenuContentImpl.cjs');
const shared_useForwardPropsEmits = require('../shared/useForwardPropsEmits.cjs');
const Menu_MenuRoot = require('./MenuRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "MenuRootContentNonModal",
  props: {
    loop: { type: Boolean },
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
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "entryFocus", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = shared_useForwardPropsEmits.useForwardPropsEmits(props, emits);
    const menuContext = Menu_MenuRoot.injectMenuContext();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(Menu_MenuContentImpl._sfc_main, vue.mergeProps(vue.unref(forwarded), {
        "trap-focus": false,
        "disable-outside-pointer-events": false,
        "disable-outside-scroll": false,
        onDismiss: _cache[0] || (_cache[0] = ($event) => vue.unref(menuContext).onOpenChange(false))
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
//# sourceMappingURL=MenuRootContentNonModal.cjs.map
