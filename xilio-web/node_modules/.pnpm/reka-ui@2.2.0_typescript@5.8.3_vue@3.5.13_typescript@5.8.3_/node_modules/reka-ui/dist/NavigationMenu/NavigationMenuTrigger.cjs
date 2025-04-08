'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const NavigationMenu_utils = require('./utils.cjs');
const Collection_Collection = require('../Collection/Collection.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const VisuallyHidden_VisuallyHidden = require('../VisuallyHidden/VisuallyHidden.cjs');
const NavigationMenu_NavigationMenuRoot = require('./NavigationMenuRoot.cjs');
const NavigationMenu_NavigationMenuItem = require('./NavigationMenuItem.cjs');

const _hoisted_1 = ["aria-owns"];
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "NavigationMenuTrigger",
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const menuContext = NavigationMenu_NavigationMenuRoot.injectNavigationMenuContext();
    const itemContext = NavigationMenu_NavigationMenuItem.injectNavigationMenuItemContext();
    const { CollectionItem } = Collection_Collection.useCollection({ key: "NavigationMenu" });
    const { forwardRef, currentElement: triggerElement } = shared_useForwardExpose.useForwardExpose();
    const triggerId = vue.ref("");
    const contentId = vue.ref("");
    const hasPointerMoveOpenedRef = core.refAutoReset(false, 300);
    const wasClickCloseRef = vue.ref(false);
    const open = vue.computed(() => itemContext.value === menuContext.modelValue.value);
    vue.onMounted(() => {
      itemContext.triggerRef = triggerElement;
      triggerId.value = NavigationMenu_utils.makeTriggerId(menuContext.baseId, itemContext.value);
      contentId.value = NavigationMenu_utils.makeContentId(menuContext.baseId, itemContext.value);
    });
    function handlePointerEnter() {
      if (menuContext.disableHoverTrigger.value)
        return;
      wasClickCloseRef.value = false;
      itemContext.wasEscapeCloseRef.value = false;
    }
    function handlePointerMove(ev) {
      if (menuContext.disableHoverTrigger.value)
        return;
      if (ev.pointerType === "mouse") {
        if (props.disabled || wasClickCloseRef.value || itemContext.wasEscapeCloseRef.value || hasPointerMoveOpenedRef.value) {
          return;
        }
        menuContext.onTriggerEnter(itemContext.value);
        hasPointerMoveOpenedRef.value = true;
      }
    }
    function handlePointerLeave(ev) {
      if (menuContext.disableHoverTrigger.value)
        return;
      if (ev.pointerType === "mouse") {
        if (props.disabled)
          return;
        menuContext.onTriggerLeave();
        hasPointerMoveOpenedRef.value = false;
      }
    }
    function handleClick(event) {
      if (event.pointerType === "mouse" && menuContext.disableClickTrigger.value)
        return;
      if (hasPointerMoveOpenedRef.value)
        return;
      if (open.value)
        menuContext.onItemSelect("");
      else menuContext.onItemSelect(itemContext.value);
      wasClickCloseRef.value = open.value;
    }
    function handleKeydown(ev) {
      const verticalEntryKey = menuContext.dir.value === "rtl" ? "ArrowLeft" : "ArrowRight";
      const entryKey = { horizontal: "ArrowDown", vertical: verticalEntryKey }[menuContext.orientation];
      if (open.value && ev.key === entryKey) {
        itemContext.onEntryKeyDown();
        ev.preventDefault();
        ev.stopPropagation();
      }
    }
    function setFocusProxyRef(node) {
      itemContext.focusProxyRef.value = core.unrefElement(node);
      return void 0;
    }
    function handleVisuallyHiddenFocus(ev) {
      const content = document.getElementById(itemContext.contentId);
      const prevFocusedElement = ev.relatedTarget;
      const wasTriggerFocused = prevFocusedElement === triggerElement.value;
      const wasFocusFromContent = content?.contains(prevFocusedElement);
      if (wasTriggerFocused || !wasFocusFromContent)
        itemContext.onFocusProxyEnter(wasTriggerFocused ? "start" : "end");
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
        vue.createVNode(vue.unref(CollectionItem), null, {
          default: vue.withCtx(() => [
            vue.createVNode(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({
              id: triggerId.value,
              ref: vue.unref(forwardRef),
              disabled: _ctx.disabled,
              "data-disabled": _ctx.disabled ? "" : void 0,
              "data-state": vue.unref(NavigationMenu_utils.getOpenState)(open.value),
              "data-navigation-menu-trigger": "",
              "aria-expanded": open.value,
              "aria-controls": contentId.value,
              "as-child": props.asChild,
              as: _ctx.as
            }, _ctx.$attrs, {
              onPointerenter: handlePointerEnter,
              onPointermove: handlePointerMove,
              onPointerleave: handlePointerLeave,
              onClick: handleClick,
              onKeydown: handleKeydown
            }), {
              default: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "default")
              ]),
              _: 3
            }, 16, ["id", "disabled", "data-disabled", "data-state", "aria-expanded", "aria-controls", "as-child", "as"])
          ]),
          _: 3
        }),
        open.value ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
          vue.createVNode(vue.unref(VisuallyHidden_VisuallyHidden._sfc_main), {
            ref: setFocusProxyRef,
            "aria-hidden": "true",
            tabindex: 0,
            onFocus: handleVisuallyHiddenFocus
          }),
          vue.unref(menuContext).viewport ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 0,
            "aria-owns": contentId.value
          }, null, 8, _hoisted_1)) : vue.createCommentVNode("", true)
        ], 64)) : vue.createCommentVNode("", true)
      ], 64);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=NavigationMenuTrigger.cjs.map
