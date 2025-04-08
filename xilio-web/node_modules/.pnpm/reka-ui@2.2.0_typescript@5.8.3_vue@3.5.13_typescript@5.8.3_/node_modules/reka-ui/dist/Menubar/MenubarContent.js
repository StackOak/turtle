import { defineComponent, ref, createBlock, openBlock, unref, mergeProps, withKeys, withCtx, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from '../Menu/MenuContent.js';
import { w as wrapArray } from '../shared/useTypeahead.js';
import { u as useCollection } from '../Collection/Collection.js';
import { u as useForwardPropsEmits } from '../shared/useForwardPropsEmits.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { u as useId } from '../shared/useId.js';
import { i as injectMenubarRootContext } from './MenubarRoot.js';
import { i as injectMenubarMenuContext } from './MenubarMenu.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MenubarContent",
  props: {
    forceMount: { type: Boolean },
    loop: { type: Boolean },
    side: {},
    sideOffset: {},
    align: { default: "start" },
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
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    useForwardExpose();
    const rootContext = injectMenubarRootContext();
    const menuContext = injectMenubarMenuContext();
    menuContext.contentId ||= useId(void 0, "reka-menubar-content");
    const { getItems } = useCollection({ key: "Menubar" });
    const hasInteractedOutsideRef = ref(false);
    function handleArrowNavigation(event) {
      const target = event.target;
      const targetIsSubTrigger = target.hasAttribute(
        "data-reka-menubar-subtrigger"
      );
      const prevMenuKey = rootContext.dir.value === "rtl" ? "ArrowRight" : "ArrowLeft";
      const isPrevKey = prevMenuKey === event.key;
      const isNextKey = !isPrevKey;
      if (isNextKey && targetIsSubTrigger)
        return;
      let candidateValues = getItems().filter((i) => i.ref.dataset.disabled !== "").map((i) => i.ref.dataset.value);
      if (isPrevKey)
        candidateValues.reverse();
      const currentIndex = candidateValues.indexOf(menuContext.value);
      candidateValues = rootContext.loop.value ? wrapArray(candidateValues, currentIndex + 1) : candidateValues.slice(currentIndex + 1);
      const [nextValue] = candidateValues;
      if (nextValue)
        rootContext.onMenuOpen(nextValue);
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), mergeProps(unref(forwarded), {
        id: unref(menuContext).contentId,
        "data-reka-menubar-content": "",
        "aria-labelledby": unref(menuContext).triggerId,
        style: {
          "--reka-menubar-content-transform-origin": "var(--reka-popper-transform-origin)",
          "--reka-menubar-content-available-width": "var(--reka-popper-available-width)",
          "--reka-menubar-content-available-height": "var(--reka-popper-available-height)",
          "--reka-menubar-trigger-width": "var(--reka-popper-anchor-width)",
          "--reka-menubar-trigger-height": "var(--reka-popper-anchor-height)"
        },
        onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
          const menubarOpen = Boolean(unref(rootContext).modelValue.value);
          if (!menubarOpen && !hasInteractedOutsideRef.value) {
            unref(menuContext).triggerElement.value?.focus();
          }
          hasInteractedOutsideRef.value = false;
          event.preventDefault();
        }),
        onFocusOutside: _cache[1] || (_cache[1] = (event) => {
          const target = event.target;
          const isMenubarTrigger = unref(getItems)().filter((i) => i.ref.dataset.disabled !== "").some((i) => i.ref.contains(target));
          if (isMenubarTrigger) event.preventDefault();
        }),
        onInteractOutside: _cache[2] || (_cache[2] = (event) => {
          hasInteractedOutsideRef.value = true;
        }),
        onEntryFocus: _cache[3] || (_cache[3] = (event) => {
          if (!unref(menuContext).wasKeyboardTriggerOpenRef.value) event.preventDefault();
        }),
        onKeydown: withKeys(handleArrowNavigation, ["arrow-right", "arrow-left"])
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["id", "aria-labelledby"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=MenubarContent.js.map
