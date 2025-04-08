'use strict';

const vue = require('vue');
const NavigationMenu_utils = require('./utils.cjs');
const shared = require('@vueuse/shared');
const NavigationMenu_NavigationMenuContentImpl = require('./NavigationMenuContentImpl.cjs');
const shared_useForwardPropsEmits = require('../shared/useForwardPropsEmits.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Presence_Presence = require('../Presence/Presence.cjs');
const NavigationMenu_NavigationMenuRoot = require('./NavigationMenuRoot.cjs');
const NavigationMenu_NavigationMenuItem = require('./NavigationMenuItem.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "NavigationMenuContent",
  props: {
    forceMount: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = shared_useForwardPropsEmits.useForwardPropsEmits(shared.reactiveOmit(props, "forceMount"), emits);
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    const menuContext = NavigationMenu_NavigationMenuRoot.injectNavigationMenuContext();
    const itemContext = NavigationMenu_NavigationMenuItem.injectNavigationMenuItemContext();
    const open = vue.computed(() => itemContext.value === menuContext.modelValue.value);
    const isLastActiveValue = vue.computed(() => {
      if (menuContext.viewport.value) {
        if (!menuContext.modelValue.value && menuContext.previousValue.value)
          return menuContext.previousValue.value === itemContext.value;
      }
      return false;
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.Teleport, {
        to: vue.unref(shared.isClient) && vue.unref(menuContext).viewport.value ? vue.unref(menuContext).viewport.value : "body",
        disabled: vue.unref(shared.isClient) && vue.unref(menuContext).viewport.value ? !vue.unref(menuContext).viewport.value : true
      }, [
        vue.createVNode(vue.unref(Presence_Presence.Presence), {
          present: _ctx.forceMount || open.value || isLastActiveValue.value,
          "force-mount": !vue.unref(menuContext).unmountOnHide.value
        }, {
          default: vue.withCtx(({ present }) => [
            vue.createVNode(NavigationMenu_NavigationMenuContentImpl._sfc_main, vue.mergeProps({
              ref: vue.unref(forwardRef),
              "data-state": vue.unref(NavigationMenu_utils.getOpenState)(open.value),
              style: {
                pointerEvents: !open.value && vue.unref(menuContext).isRootMenu ? "none" : void 0
              }
            }, { ..._ctx.$attrs, ...vue.unref(forwarded) }, {
              hidden: !present,
              onPointerenter: _cache[0] || (_cache[0] = ($event) => vue.unref(menuContext).onContentEnter(vue.unref(itemContext).value)),
              onPointerleave: _cache[1] || (_cache[1] = ($event) => vue.unref(NavigationMenu_utils.whenMouse)(() => vue.unref(menuContext).onContentLeave())($event)),
              onPointerDownOutside: _cache[2] || (_cache[2] = ($event) => emits("pointerDownOutside", $event)),
              onFocusOutside: _cache[3] || (_cache[3] = ($event) => emits("focusOutside", $event)),
              onInteractOutside: _cache[4] || (_cache[4] = ($event) => emits("interactOutside", $event))
            }), {
              default: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "default")
              ]),
              _: 2
            }, 1040, ["data-state", "style", "hidden"])
          ]),
          _: 3
        }, 8, ["present", "force-mount"])
      ], 8, ["to", "disabled"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=NavigationMenuContent.cjs.map
