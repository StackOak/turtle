'use strict';

require('@vueuse/core');
const vue = require('vue');
const Accordion_AccordionItem = require('./AccordionItem.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Collapsible_CollapsibleContent = require('../Collapsible/CollapsibleContent.cjs');
const Accordion_AccordionRoot = require('./AccordionRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "AccordionContent",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const rootContext = Accordion_AccordionRoot.injectAccordionRootContext();
    const itemContext = Accordion_AccordionItem.injectAccordionItemContext();
    shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Collapsible_CollapsibleContent._sfc_main), {
        role: "region",
        "as-child": props.asChild,
        as: _ctx.as,
        "force-mount": props.forceMount,
        "aria-labelledby": vue.unref(itemContext).triggerId,
        "data-state": vue.unref(itemContext).dataState.value,
        "data-disabled": vue.unref(itemContext).dataDisabled.value,
        "data-orientation": vue.unref(rootContext).orientation,
        style: { "--reka-accordion-content-width": "var(--reka-collapsible-content-width)", "--reka-accordion-content-height": "var(--reka-collapsible-content-height)" },
        onContentFound: _cache[0] || (_cache[0] = ($event) => vue.unref(rootContext).changeModelValue(vue.unref(itemContext).value.value))
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as-child", "as", "force-mount", "aria-labelledby", "data-state", "data-disabled", "data-orientation"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=AccordionContent.cjs.map
