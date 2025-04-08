import { defineComponent, createBlock, openBlock, unref, mergeProps, withKeys, withCtx, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from '../Menu/MenuSubContent.js';
import { w as wrapArray } from '../shared/useTypeahead.js';
import { u as useCollection } from '../Collection/Collection.js';
import { u as useForwardPropsEmits } from '../shared/useForwardPropsEmits.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { i as injectMenubarRootContext } from './MenubarRoot.js';
import { i as injectMenubarMenuContext } from './MenubarMenu.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
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
    const forwarded = useForwardPropsEmits(props, emits);
    useForwardExpose();
    const { getItems } = useCollection({ key: "Menubar" });
    const rootContext = injectMenubarRootContext();
    const menuContext = injectMenubarMenuContext();
    function handleArrowNavigation(event) {
      const target = event.target;
      const targetIsSubTrigger = target.hasAttribute(
        "data-reka-menubar-subtrigger"
      );
      if (targetIsSubTrigger)
        return;
      let candidateValues = getItems().filter((i) => i.ref.dataset.disabled !== "").map((i) => i.ref.dataset.value);
      const currentIndex = candidateValues.indexOf(menuContext.value);
      candidateValues = rootContext.loop.value ? wrapArray(candidateValues, currentIndex + 1) : candidateValues.slice(currentIndex + 1);
      const [nextValue] = candidateValues;
      if (nextValue)
        rootContext.onMenuOpen(nextValue);
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), mergeProps(unref(forwarded), {
        "data-reka-menubar-content": "",
        style: {
          "--reka-menubar-content-transform-origin": "var(--reka-popper-transform-origin)",
          "--reka-menubar-content-available-width": "var(--reka-popper-available-width)",
          "--reka-menubar-content-available-height": "var(--reka-popper-available-height)",
          "--reka-menubar-trigger-width": "var(--reka-popper-anchor-width)",
          "--reka-menubar-trigger-height": "var(--reka-popper-anchor-height)"
        },
        onKeydown: withKeys(handleArrowNavigation, ["arrow-right"])
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=MenubarSubContent.js.map
