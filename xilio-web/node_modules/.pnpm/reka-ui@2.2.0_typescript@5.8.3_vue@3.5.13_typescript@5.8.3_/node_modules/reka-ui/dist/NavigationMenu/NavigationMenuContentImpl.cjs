'use strict';

const vue = require('vue');
const NavigationMenu_utils = require('./utils.cjs');
const DismissableLayer_DismissableLayer = require('../DismissableLayer/DismissableLayer.cjs');
const Collection_Collection = require('../Collection/Collection.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const NavigationMenu_NavigationMenuItem = require('./NavigationMenuItem.cjs');
const shared_getActiveElement = require('../shared/getActiveElement.cjs');
const shared_useArrowNavigation = require('../shared/useArrowNavigation.cjs');
const NavigationMenu_NavigationMenuRoot = require('./NavigationMenuRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "NavigationMenuContentImpl",
  props: {
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { getItems } = Collection_Collection.useCollection({ key: "NavigationMenu" });
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    const menuContext = NavigationMenu_NavigationMenuRoot.injectNavigationMenuContext();
    const itemContext = NavigationMenu_NavigationMenuItem.injectNavigationMenuItemContext();
    const triggerId = NavigationMenu_utils.makeTriggerId(menuContext.baseId, itemContext.value);
    const contentId = NavigationMenu_utils.makeContentId(menuContext.baseId, itemContext.value);
    const prevMotionAttributeRef = vue.ref(null);
    const motionAttribute = vue.computed(() => {
      const values = getItems().map((i) => i.ref.id.split("trigger-")[1]);
      if (menuContext.dir.value === "rtl")
        values.reverse();
      const index = values.indexOf(menuContext.modelValue.value);
      const prevIndex = values.indexOf(menuContext.previousValue.value);
      const isSelected = itemContext.value === menuContext.modelValue.value;
      const wasSelected = prevIndex === values.indexOf(itemContext.value);
      if (!isSelected && !wasSelected)
        return prevMotionAttributeRef.value;
      const attribute = (() => {
        if (index !== prevIndex) {
          if (isSelected && prevIndex !== -1)
            return index > prevIndex ? "from-end" : "from-start";
          if (wasSelected && index !== -1)
            return index > prevIndex ? "to-start" : "to-end";
        }
        return null;
      })();
      prevMotionAttributeRef.value = attribute;
      return attribute;
    });
    function handleFocusOutside(ev) {
      emits("focusOutside", ev);
      emits("interactOutside", ev);
      const target = ev.detail.originalEvent.target;
      if (target.hasAttribute("data-navigation-menu-trigger"))
        ev.preventDefault();
      if (!ev.defaultPrevented) {
        itemContext.onContentFocusOutside();
        const target2 = ev.target;
        if (menuContext.rootNavigationMenu?.value?.contains(target2))
          ev.preventDefault();
      }
    }
    function handlePointerDownOutside(ev) {
      emits("pointerDownOutside", ev);
      if (!ev.defaultPrevented) {
        const target = ev.target;
        const isTrigger = getItems().some(
          (i) => i.ref.contains(target)
        );
        const isRootViewport = menuContext.isRootMenu && menuContext.viewport.value?.contains(target);
        if (isTrigger || isRootViewport || !menuContext.isRootMenu)
          ev.preventDefault();
      }
    }
    vue.watchEffect((cleanupFn) => {
      const content = currentElement.value;
      if (menuContext.isRootMenu && content) {
        const handleClose = () => {
          menuContext.onItemDismiss();
          itemContext.onRootContentClose();
          if (content.contains(shared_getActiveElement.getActiveElement()))
            itemContext.triggerRef.value?.focus();
        };
        content.addEventListener(NavigationMenu_utils.EVENT_ROOT_CONTENT_DISMISS, handleClose);
        cleanupFn(
          () => content.removeEventListener(NavigationMenu_utils.EVENT_ROOT_CONTENT_DISMISS, handleClose)
        );
      }
    });
    function handleEscapeKeyDown(ev) {
      emits("escapeKeyDown", ev);
      if (!ev.defaultPrevented) {
        menuContext.onItemDismiss();
        itemContext.triggerRef?.value?.focus();
        itemContext.wasEscapeCloseRef.value = true;
      }
    }
    function handleKeydown(ev) {
      if (ev.target.closest("[data-reka-navigation-menu]") !== menuContext.rootNavigationMenu.value)
        return;
      const isMetaKey = ev.altKey || ev.ctrlKey || ev.metaKey;
      const isTabKey = ev.key === "Tab" && !isMetaKey;
      const candidates = NavigationMenu_utils.getTabbableCandidates(ev.currentTarget);
      if (isTabKey) {
        const focusedElement = shared_getActiveElement.getActiveElement();
        const index = candidates.findIndex(
          (candidate) => candidate === focusedElement
        );
        const isMovingBackwards = ev.shiftKey;
        const nextCandidates = isMovingBackwards ? candidates.slice(0, index).reverse() : candidates.slice(index + 1, candidates.length);
        if (NavigationMenu_utils.focusFirst(nextCandidates)) {
          ev.preventDefault();
        } else {
          itemContext.focusProxyRef.value?.focus();
          return;
        }
      }
      const newSelectedElement = shared_useArrowNavigation.useArrowNavigation(
        ev,
        shared_getActiveElement.getActiveElement(),
        void 0,
        { itemsArray: candidates, loop: false, enableIgnoredElement: true }
      );
      newSelectedElement?.focus();
    }
    function handleDismiss() {
      const rootContentDismissEvent = new Event(NavigationMenu_utils.EVENT_ROOT_CONTENT_DISMISS, {
        bubbles: true,
        cancelable: true
      });
      currentElement.value?.dispatchEvent(rootContentDismissEvent);
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(DismissableLayer_DismissableLayer._sfc_main), vue.mergeProps({
        id: vue.unref(contentId),
        ref: vue.unref(forwardRef),
        "aria-labelledby": vue.unref(triggerId),
        "data-motion": motionAttribute.value,
        "data-state": vue.unref(NavigationMenu_utils.getOpenState)(vue.unref(menuContext).modelValue.value === vue.unref(itemContext).value),
        "data-orientation": vue.unref(menuContext).orientation
      }, props, {
        onKeydown: handleKeydown,
        onEscapeKeyDown: handleEscapeKeyDown,
        onPointerDownOutside: handlePointerDownOutside,
        onFocusOutside: handleFocusOutside,
        onDismiss: handleDismiss
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["id", "aria-labelledby", "data-motion", "data-state", "data-orientation"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=NavigationMenuContentImpl.cjs.map
