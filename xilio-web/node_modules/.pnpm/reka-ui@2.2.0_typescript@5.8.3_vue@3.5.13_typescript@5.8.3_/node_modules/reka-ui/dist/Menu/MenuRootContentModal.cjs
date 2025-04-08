'use strict';

const vue = require('vue');
const Menu_MenuContentImpl = require('./MenuContentImpl.cjs');
const shared_useForwardPropsEmits = require('../shared/useForwardPropsEmits.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useHideOthers = require('../shared/useHideOthers.cjs');
const Menu_MenuRoot = require('./MenuRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "MenuRootContentModal",
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
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    shared_useHideOthers.useHideOthers(currentElement);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(Menu_MenuContentImpl._sfc_main, vue.mergeProps(vue.unref(forwarded), {
        ref: vue.unref(forwardRef),
        "trap-focus": vue.unref(menuContext).open.value,
        "disable-outside-pointer-events": vue.unref(menuContext).open.value,
        "disable-outside-scroll": true,
        onDismiss: _cache[0] || (_cache[0] = ($event) => vue.unref(menuContext).onOpenChange(false)),
        onFocusOutside: _cache[1] || (_cache[1] = vue.withModifiers(($event) => emits("focusOutside", $event), ["prevent"]))
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["trap-focus", "disable-outside-pointer-events"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=MenuRootContentModal.cjs.map
