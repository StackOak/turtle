'use strict';

const vue = require('vue');
const Menu_MenuContent = require('../Menu/MenuContent.cjs');
const shared_useTypeahead = require('../shared/useTypeahead.cjs');
const Collection_Collection = require('../Collection/Collection.cjs');
const shared_useForwardPropsEmits = require('../shared/useForwardPropsEmits.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useId = require('../shared/useId.cjs');
const Menubar_MenubarRoot = require('./MenubarRoot.cjs');
const Menubar_MenubarMenu = require('./MenubarMenu.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const forwarded = shared_useForwardPropsEmits.useForwardPropsEmits(props, emits);
    shared_useForwardExpose.useForwardExpose();
    const rootContext = Menubar_MenubarRoot.injectMenubarRootContext();
    const menuContext = Menubar_MenubarMenu.injectMenubarMenuContext();
    menuContext.contentId ||= shared_useId.useId(void 0, "reka-menubar-content");
    const { getItems } = Collection_Collection.useCollection({ key: "Menubar" });
    const hasInteractedOutsideRef = vue.ref(false);
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
      candidateValues = rootContext.loop.value ? shared_useTypeahead.wrapArray(candidateValues, currentIndex + 1) : candidateValues.slice(currentIndex + 1);
      const [nextValue] = candidateValues;
      if (nextValue)
        rootContext.onMenuOpen(nextValue);
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Menu_MenuContent._sfc_main), vue.mergeProps(vue.unref(forwarded), {
        id: vue.unref(menuContext).contentId,
        "data-reka-menubar-content": "",
        "aria-labelledby": vue.unref(menuContext).triggerId,
        style: {
          "--reka-menubar-content-transform-origin": "var(--reka-popper-transform-origin)",
          "--reka-menubar-content-available-width": "var(--reka-popper-available-width)",
          "--reka-menubar-content-available-height": "var(--reka-popper-available-height)",
          "--reka-menubar-trigger-width": "var(--reka-popper-anchor-width)",
          "--reka-menubar-trigger-height": "var(--reka-popper-anchor-height)"
        },
        onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
          const menubarOpen = Boolean(vue.unref(rootContext).modelValue.value);
          if (!menubarOpen && !hasInteractedOutsideRef.value) {
            vue.unref(menuContext).triggerElement.value?.focus();
          }
          hasInteractedOutsideRef.value = false;
          event.preventDefault();
        }),
        onFocusOutside: _cache[1] || (_cache[1] = (event) => {
          const target = event.target;
          const isMenubarTrigger = vue.unref(getItems)().filter((i) => i.ref.dataset.disabled !== "").some((i) => i.ref.contains(target));
          if (isMenubarTrigger) event.preventDefault();
        }),
        onInteractOutside: _cache[2] || (_cache[2] = (event) => {
          hasInteractedOutsideRef.value = true;
        }),
        onEntryFocus: _cache[3] || (_cache[3] = (event) => {
          if (!vue.unref(menuContext).wasKeyboardTriggerOpenRef.value) event.preventDefault();
        }),
        onKeydown: vue.withKeys(handleArrowNavigation, ["arrow-right", "arrow-left"])
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["id", "aria-labelledby"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=MenubarContent.cjs.map
