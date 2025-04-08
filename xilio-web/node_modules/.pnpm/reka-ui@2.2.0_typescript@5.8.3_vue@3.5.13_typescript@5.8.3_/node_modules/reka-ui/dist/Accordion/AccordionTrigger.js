import { defineComponent, createBlock, openBlock, unref, withCtx, renderSlot } from 'vue';
import { u as useId } from '../shared/useId.js';
import { _ as _sfc_main$1 } from '../Collapsible/CollapsibleTrigger.js';
import { i as injectAccordionRootContext } from './AccordionRoot.js';
import { i as injectAccordionItemContext } from './AccordionItem.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AccordionTrigger",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectAccordionRootContext();
    const itemContext = injectAccordionItemContext();
    itemContext.triggerId ||= useId(void 0, "reka-accordion-trigger");
    function changeItem() {
      const triggerDisabled = rootContext.isSingle.value && itemContext.open.value && !rootContext.collapsible;
      if (itemContext.disabled.value || triggerDisabled)
        return;
      rootContext.changeModelValue(itemContext.value.value);
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), {
        id: unref(itemContext).triggerId,
        ref: unref(itemContext).currentRef,
        "data-reka-collection-item": "",
        as: props.as,
        "as-child": props.asChild,
        "aria-disabled": unref(itemContext).disabled.value || void 0,
        "aria-expanded": unref(itemContext).open.value || false,
        "data-disabled": unref(itemContext).dataDisabled.value,
        "data-orientation": unref(rootContext).orientation,
        "data-state": unref(itemContext).dataState.value,
        disabled: unref(itemContext).disabled.value,
        onClick: changeItem
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["id", "as", "as-child", "aria-disabled", "aria-expanded", "data-disabled", "data-orientation", "data-state", "disabled"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=AccordionTrigger.js.map
