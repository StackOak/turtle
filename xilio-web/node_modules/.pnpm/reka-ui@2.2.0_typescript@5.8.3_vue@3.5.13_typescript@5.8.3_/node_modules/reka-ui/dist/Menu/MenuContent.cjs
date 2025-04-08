'use strict';

const vue = require('vue');
const Menu_MenuRootContentModal = require('./MenuRootContentModal.cjs');
const Menu_MenuRootContentNonModal = require('./MenuRootContentNonModal.cjs');
const shared_useForwardPropsEmits = require('../shared/useForwardPropsEmits.cjs');
const Presence_Presence = require('../Presence/Presence.cjs');
const Menu_MenuRoot = require('./MenuRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "MenuContent",
  props: {
    forceMount: { type: Boolean },
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
    const rootContext = Menu_MenuRoot.injectMenuRootContext();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Presence_Presence.Presence), {
        present: _ctx.forceMount || vue.unref(menuContext).open.value
      }, {
        default: vue.withCtx(() => [
          vue.unref(rootContext).modal.value ? (vue.openBlock(), vue.createBlock(Menu_MenuRootContentModal._sfc_main, vue.normalizeProps(vue.mergeProps({ key: 0 }, { ..._ctx.$attrs, ...vue.unref(forwarded) })), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16)) : (vue.openBlock(), vue.createBlock(Menu_MenuRootContentNonModal._sfc_main, vue.normalizeProps(vue.mergeProps({ key: 1 }, { ..._ctx.$attrs, ...vue.unref(forwarded) })), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16))
        ]),
        _: 3
      }, 8, ["present"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=MenuContent.cjs.map
