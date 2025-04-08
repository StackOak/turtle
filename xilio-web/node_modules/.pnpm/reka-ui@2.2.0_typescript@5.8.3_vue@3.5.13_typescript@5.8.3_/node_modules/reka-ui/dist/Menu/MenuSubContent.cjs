'use strict';

const vue = require('vue');
const Menu_MenuContentImpl = require('./MenuContentImpl.cjs');
const Menu_utils = require('./utils.cjs');
const shared_useForwardPropsEmits = require('../shared/useForwardPropsEmits.cjs');
const Menu_MenuSub = require('./MenuSub.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useId = require('../shared/useId.cjs');
const Presence_Presence = require('../Presence/Presence.cjs');
const Menu_MenuRoot = require('./MenuRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "MenuSubContent",
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
    prioritizePosition: { type: Boolean, default: true },
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
    const menuSubContext = Menu_MenuSub.injectMenuSubContext();
    const { forwardRef, currentElement: subContentElement } = shared_useForwardExpose.useForwardExpose();
    menuSubContext.contentId ||= shared_useId.useId(void 0, "reka-menu-sub-content");
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Presence_Presence.Presence), {
        present: _ctx.forceMount || vue.unref(menuContext).open.value
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(Menu_MenuContentImpl._sfc_main, vue.mergeProps(vue.unref(forwarded), {
            id: vue.unref(menuSubContext).contentId,
            ref: vue.unref(forwardRef),
            "aria-labelledby": vue.unref(menuSubContext).triggerId,
            align: "start",
            side: vue.unref(rootContext).dir.value === "rtl" ? "left" : "right",
            "disable-outside-pointer-events": false,
            "disable-outside-scroll": false,
            "trap-focus": false,
            onOpenAutoFocus: _cache[0] || (_cache[0] = vue.withModifiers((event) => {
              if (vue.unref(rootContext).isUsingKeyboardRef.value) vue.unref(subContentElement)?.focus();
            }, ["prevent"])),
            onCloseAutoFocus: _cache[1] || (_cache[1] = vue.withModifiers(() => {
            }, ["prevent"])),
            onFocusOutside: _cache[2] || (_cache[2] = (event) => {
              if (event.defaultPrevented) return;
              if (event.target !== vue.unref(menuSubContext).trigger.value)
                vue.unref(menuContext).onOpenChange(false);
            }),
            onEscapeKeyDown: _cache[3] || (_cache[3] = (event) => {
              vue.unref(rootContext).onClose();
              event.preventDefault();
            }),
            onKeydown: _cache[4] || (_cache[4] = (event) => {
              const isKeyDownInside = event.currentTarget?.contains(event.target);
              const isCloseKey = vue.unref(Menu_utils.SUB_CLOSE_KEYS)[vue.unref(rootContext).dir.value].includes(event.key);
              if (isKeyDownInside && isCloseKey) {
                vue.unref(menuContext).onOpenChange(false);
                vue.unref(menuSubContext).trigger.value?.focus();
                event.preventDefault();
              }
            })
          }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["id", "aria-labelledby", "side"])
        ]),
        _: 3
      }, 8, ["present"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=MenuSubContent.cjs.map
