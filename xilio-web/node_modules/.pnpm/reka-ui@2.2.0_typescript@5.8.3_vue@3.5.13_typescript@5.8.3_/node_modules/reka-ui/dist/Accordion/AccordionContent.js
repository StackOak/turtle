import '@vueuse/core';
import { defineComponent, createBlock, openBlock, unref, withCtx, renderSlot } from 'vue';
import { i as injectAccordionItemContext } from './AccordionItem.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { _ as _sfc_main$1 } from '../Collapsible/CollapsibleContent.js';
import { i as injectAccordionRootContext } from './AccordionRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AccordionContent",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectAccordionRootContext();
    const itemContext = injectAccordionItemContext();
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), {
        role: "region",
        "as-child": props.asChild,
        as: _ctx.as,
        "force-mount": props.forceMount,
        "aria-labelledby": unref(itemContext).triggerId,
        "data-state": unref(itemContext).dataState.value,
        "data-disabled": unref(itemContext).dataDisabled.value,
        "data-orientation": unref(rootContext).orientation,
        style: { "--reka-accordion-content-width": "var(--reka-collapsible-content-width)", "--reka-accordion-content-height": "var(--reka-collapsible-content-height)" },
        onContentFound: _cache[0] || (_cache[0] = ($event) => unref(rootContext).changeModelValue(unref(itemContext).value.value))
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as-child", "as", "force-mount", "aria-labelledby", "data-state", "data-disabled", "data-orientation"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=AccordionContent.js.map
