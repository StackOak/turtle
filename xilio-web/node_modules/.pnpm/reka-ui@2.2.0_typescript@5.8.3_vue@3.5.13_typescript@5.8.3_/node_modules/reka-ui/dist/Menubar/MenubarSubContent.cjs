'use strict';

const vue = require('vue');
const Menu_MenuSubContent = require('../Menu/MenuSubContent.cjs');
const shared_useTypeahead = require('../shared/useTypeahead.cjs');
const Collection_Collection = require('../Collection/Collection.cjs');
const shared_useForwardPropsEmits = require('../shared/useForwardPropsEmits.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Menubar_MenubarRoot = require('./MenubarRoot.cjs');
const Menubar_MenubarMenu = require('./MenubarMenu.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "MenubarSubContent",
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
    shared_useForwardExpose.useForwardExpose();
    const { getItems } = Collection_Collection.useCollection({ key: "Menubar" });
    const rootContext = Menubar_MenubarRoot.injectMenubarRootContext();
    const menuContext = Menubar_MenubarMenu.injectMenubarMenuContext();
    function handleArrowNavigation(event) {
      const target = event.target;
      const targetIsSubTrigger = target.hasAttribute(
        "data-reka-menubar-subtrigger"
      );
      if (targetIsSubTrigger)
        return;
      let candidateValues = getItems().filter((i) => i.ref.dataset.disabled !== "").map((i) => i.ref.dataset.value);
      const currentIndex = candidateValues.indexOf(menuContext.value);
      candidateValues = rootContext.loop.value ? shared_useTypeahead.wrapArray(candidateValues, currentIndex + 1) : candidateValues.slice(currentIndex + 1);
      const [nextValue] = candidateValues;
      if (nextValue)
        rootContext.onMenuOpen(nextValue);
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Menu_MenuSubContent._sfc_main), vue.mergeProps(vue.unref(forwarded), {
        "data-reka-menubar-content": "",
        style: {
          "--reka-menubar-content-transform-origin": "var(--reka-popper-transform-origin)",
          "--reka-menubar-content-available-width": "var(--reka-popper-available-width)",
          "--reka-menubar-content-available-height": "var(--reka-popper-available-height)",
          "--reka-menubar-trigger-width": "var(--reka-popper-anchor-width)",
          "--reka-menubar-trigger-height": "var(--reka-popper-anchor-height)"
        },
        onKeydown: vue.withKeys(handleArrowNavigation, ["arrow-right"])
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=MenubarSubContent.cjs.map
