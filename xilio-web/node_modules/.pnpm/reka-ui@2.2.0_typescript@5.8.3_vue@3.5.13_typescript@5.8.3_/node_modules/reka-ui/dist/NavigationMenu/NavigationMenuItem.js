import { defineComponent, ref, createBlock, openBlock, unref, withKeys, withCtx, renderSlot } from 'vue';
import { a as makeContentId, b as getTabbableCandidates, f as focusFirst, r as removeFromTabOrder } from './utils.js';
import { u as useCollection } from '../Collection/Collection.js';
import { c as createContext } from '../shared/createContext.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { i as injectNavigationMenuContext } from './NavigationMenuRoot.js';
import { u as useId } from '../shared/useId.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { g as getActiveElement } from '../shared/getActiveElement.js';
import { u as useArrowNavigation } from '../shared/useArrowNavigation.js';

const [injectNavigationMenuItemContext, provideNavigationMenuItemContext] = createContext("NavigationMenuItem");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "NavigationMenuItem",
  props: {
    value: {},
    asChild: { type: Boolean },
    as: { default: "li" }
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    const { getItems } = useCollection({ key: "NavigationMenu" });
    const context = injectNavigationMenuContext();
    const value = useId(props.value);
    const triggerRef = ref();
    const focusProxyRef = ref();
    const contentId = makeContentId(context.baseId, value);
    let restoreContentTabOrderRef = () => ({});
    const wasEscapeCloseRef = ref(false);
    async function handleContentEntry(side = "start") {
      const el = document.getElementById(contentId);
      if (el) {
        restoreContentTabOrderRef();
        const candidates = getTabbableCandidates(el);
        if (candidates.length)
          focusFirst(side === "start" ? candidates : candidates.reverse());
      }
    }
    function handleContentExit() {
      const el = document.getElementById(contentId);
      if (el) {
        const candidates = getTabbableCandidates(el);
        if (candidates.length)
          restoreContentTabOrderRef = removeFromTabOrder(candidates);
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
      const currentFocus = getActiveElement();
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
      const newSelectedElement = useArrowNavigation(ev, currentFocus, void 0, {
        itemsArray,
        loop: false
      });
      if (newSelectedElement)
        newSelectedElement?.focus();
      ev.preventDefault();
      ev.stopPropagation();
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        "as-child": _ctx.asChild,
        as: _ctx.as,
        "data-menu-item": "",
        onKeydown: withKeys(handleKeydown, ["up", "down", "left", "right", "home", "end", "space"])
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as-child", "as"]);
    };
  }
});

export { _sfc_main as _, injectNavigationMenuItemContext as i };
//# sourceMappingURL=NavigationMenuItem.js.map
