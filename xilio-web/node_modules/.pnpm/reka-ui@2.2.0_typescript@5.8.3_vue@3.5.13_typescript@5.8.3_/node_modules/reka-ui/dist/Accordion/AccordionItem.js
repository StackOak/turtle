import { defineComponent, computed, createBlock, openBlock, unref, withKeys, withCtx, renderSlot } from 'vue';
import { c as createContext } from '../shared/createContext.js';
import { i as injectAccordionRootContext } from './AccordionRoot.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { _ as _sfc_main$1 } from '../Collapsible/CollapsibleRoot.js';
import { u as useArrowNavigation } from '../shared/useArrowNavigation.js';

const [injectAccordionItemContext, provideAccordionItemContext] = createContext("AccordionItem");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AccordionItem",
  props: {
    disabled: { type: Boolean },
    value: {},
    unmountOnHide: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const rootContext = injectAccordionRootContext();
    const open = computed(
      () => rootContext.isSingle.value ? props.value === rootContext.modelValue.value : Array.isArray(rootContext.modelValue.value) && rootContext.modelValue.value.includes(props.value)
    );
    const disabled = computed(() => {
      return rootContext.disabled.value || props.disabled;
    });
    const dataDisabled = computed(() => disabled.value ? "" : void 0);
    const dataState = computed(
      () => open.value ? "open" /* Open */ : "closed" /* Closed */
    );
    __expose({ open, dataDisabled });
    const { currentRef, currentElement } = useForwardExpose();
    provideAccordionItemContext({
      open,
      dataState,
      disabled,
      dataDisabled,
      triggerId: "",
      currentRef,
      currentElement,
      value: computed(() => props.value)
    });
    function handleArrowKey(e) {
      const target = e.target;
      const allCollectionItems = Array.from(rootContext.parentElement.value?.querySelectorAll("[data-reka-collection-item]") ?? []);
      const collectionItemIndex = allCollectionItems.findIndex((item) => item === target);
      if (collectionItemIndex === -1)
        return null;
      useArrowNavigation(
        e,
        currentElement.value,
        rootContext.parentElement.value,
        {
          arrowKeyOptions: rootContext.orientation,
          dir: rootContext.direction.value,
          focus: true
        }
      );
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), {
        "data-orientation": unref(rootContext).orientation,
        "data-disabled": dataDisabled.value,
        "data-state": dataState.value,
        disabled: disabled.value,
        open: open.value,
        as: props.as,
        "as-child": props.asChild,
        "unmount-on-hide": unref(rootContext).unmountOnHide.value,
        onKeydown: withKeys(handleArrowKey, ["up", "down", "left", "right", "home", "end"])
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", { open: open.value })
        ]),
        _: 3
      }, 8, ["data-orientation", "data-disabled", "data-state", "disabled", "open", "as", "as-child", "unmount-on-hide"]);
    };
  }
});

export { _sfc_main as _, injectAccordionItemContext as i };
//# sourceMappingURL=AccordionItem.js.map
