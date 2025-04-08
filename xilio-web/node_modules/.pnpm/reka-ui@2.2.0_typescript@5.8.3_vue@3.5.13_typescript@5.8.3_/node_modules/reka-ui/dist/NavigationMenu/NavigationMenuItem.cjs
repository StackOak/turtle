'use strict';

const vue = require('vue');
const NavigationMenu_utils = require('./utils.cjs');
const Collection_Collection = require('../Collection/Collection.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const NavigationMenu_NavigationMenuRoot = require('./NavigationMenuRoot.cjs');
const shared_useId = require('../shared/useId.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const shared_getActiveElement = require('../shared/getActiveElement.cjs');
const shared_useArrowNavigation = require('../shared/useArrowNavigation.cjs');

const [injectNavigationMenuItemContext, provideNavigationMenuItemContext] = shared_createContext.createContext("NavigationMenuItem");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "NavigationMenuItem",
  props: {
    value: {},
    asChild: { type: Boolean },
    as: { default: "li" }
  },
  setup(__props) {
    const props = __props;
    shared_useForwardExpose.useForwardExpose();
    const { getItems } = Collection_Collection.useCollection({ key: "NavigationMenu" });
    const context = NavigationMenu_NavigationMenuRoot.injectNavigationMenuContext();
    const value = shared_useId.useId(props.value);
    const triggerRef = vue.ref();
    const focusProxyRef = vue.ref();
    const contentId = NavigationMenu_utils.makeContentId(context.baseId, value);
    let restoreContentTabOrderRef = () => ({});
    const wasEscapeCloseRef = vue.ref(false);
    async function handleContentEntry(side = "start") {
      const el = document.getElementById(contentId);
      if (el) {
        restoreContentTabOrderRef();
        const candidates = NavigationMenu_utils.getTabbableCandidates(el);
        if (candidates.length)
          NavigationMenu_utils.focusFirst(side === "start" ? candidates : candidates.reverse());
      }
    }
    function handleContentExit() {
      const el = document.getElementById(contentId);
      if (el) {
        const candidates = NavigationMenu_utils.getTabbableCandidates(el);
        if (candidates.length)
          restoreContentTabOrderRef = NavigationMenu_utils.removeFromTabOrder(candidates);
      }
    }
    provideNavigationMenuItemContext({
      value,
      contentId,
      triggerRef,
      focusProxyRef,
      wasEscapeCloseRef,
      onEntryKeyDown: handleContentEntry,
      onFocusProxyEnter: handleContentEntry,
      onContentFocusOutside: handleContentExit,
      onRootContentClose: handleContentExit
    });
    function handleClose() {
      context.onItemDismiss();
      triggerRef.value?.focus();
    }
    function handleKeydown(ev) {
      const currentFocus = shared_getActiveElement.getActiveElement();
      if (ev.keyCode === 32 || ev.key === "Enter") {
        if (context.modelValue.value === value) {
          handleClose();
          ev.preventDefault();
          return;
        } else {
          ev.target.click();
          ev.preventDefault();
          return;
        }
      }
      const itemsArray = getItems().filter(
        (i) => i.ref.parentElement?.hasAttribute("data-menu-item")
      ).map((i) => i.ref);
      if (!itemsArray.includes(currentFocus))
        return;
      const newSelectedElement = shared_useArrowNavigation.useArrowNavigation(ev, currentFocus, void 0, {
        itemsArray,
        loop: false
      });
      if (newSelectedElement)
        newSelectedElement?.focus();
      ev.preventDefault();
      ev.stopPropagation();
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        "as-child": _ctx.asChild,
        as: _ctx.as,
        "data-menu-item": "",
        onKeydown: vue.withKeys(handleKeydown, ["up", "down", "left", "right", "home", "end", "space"])
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as-child", "as"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectNavigationMenuItemContext = injectNavigationMenuItemContext;
//# sourceMappingURL=NavigationMenuItem.cjs.map
