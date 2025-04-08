'use strict';

const vue = require('vue');
const shared_createContext = require('../shared/createContext.cjs');
const Accordion_AccordionRoot = require('./AccordionRoot.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Collapsible_CollapsibleRoot = require('../Collapsible/CollapsibleRoot.cjs');
const shared_useArrowNavigation = require('../shared/useArrowNavigation.cjs');

const [injectAccordionItemContext, provideAccordionItemContext] = shared_createContext.createContext("AccordionItem");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const rootContext = Accordion_AccordionRoot.injectAccordionRootContext();
    const open = vue.computed(
      () => rootContext.isSingle.value ? props.value === rootContext.modelValue.value : Array.isArray(rootContext.modelValue.value) && rootContext.modelValue.value.includes(props.value)
    );
    const disabled = vue.computed(() => {
      return rootContext.disabled.value || props.disabled;
    });
    const dataDisabled = vue.computed(() => disabled.value ? "" : void 0);
    const dataState = vue.computed(
      () => open.value ? "open" /* Open */ : "closed" /* Closed */
    );
    __expose({ open, dataDisabled });
    const { currentRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    provideAccordionItemContext({
      open,
      dataState,
      disabled,
      dataDisabled,
      triggerId: "",
      currentRef,
      currentElement,
      value: vue.computed(() => props.value)
    });
    function handleArrowKey(e) {
      const target = e.target;
      const allCollectionItems = Array.from(rootContext.parentElement.value?.querySelectorAll("[data-reka-collection-item]") ?? []);
      const collectionItemIndex = allCollectionItems.findIndex((item) => item === target);
      if (collectionItemIndex === -1)
        return null;
      shared_useArrowNavigation.useArrowNavigation(
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
      return vue.openBlock(), vue.createBlock(vue.unref(Collapsible_CollapsibleRoot._sfc_main), {
        "data-orientation": vue.unref(rootContext).orientation,
        "data-disabled": dataDisabled.value,
        "data-state": dataState.value,
        disabled: disabled.value,
        open: open.value,
        as: props.as,
        "as-child": props.asChild,
        "unmount-on-hide": vue.unref(rootContext).unmountOnHide.value,
        onKeydown: vue.withKeys(handleArrowKey, ["up", "down", "left", "right", "home", "end"])
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", { open: open.value })
        ]),
        _: 3
      }, 8, ["data-orientation", "data-disabled", "data-state", "disabled", "open", "as", "as-child", "unmount-on-hide"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectAccordionItemContext = injectAccordionItemContext;
//# sourceMappingURL=AccordionItem.cjs.map
