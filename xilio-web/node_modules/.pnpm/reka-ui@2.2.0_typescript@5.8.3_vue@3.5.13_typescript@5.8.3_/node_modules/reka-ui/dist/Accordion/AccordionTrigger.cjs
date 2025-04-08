'use strict';

const vue = require('vue');
const shared_useId = require('../shared/useId.cjs');
const Collapsible_CollapsibleTrigger = require('../Collapsible/CollapsibleTrigger.cjs');
const Accordion_AccordionRoot = require('./AccordionRoot.cjs');
const Accordion_AccordionItem = require('./AccordionItem.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "AccordionTrigger",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const rootContext = Accordion_AccordionRoot.injectAccordionRootContext();
    const itemContext = Accordion_AccordionItem.injectAccordionItemContext();
    itemContext.triggerId ||= shared_useId.useId(void 0, "reka-accordion-trigger");
    function changeItem() {
      const triggerDisabled = rootContext.isSingle.value && itemContext.open.value && !rootContext.collapsible;
      if (itemContext.disabled.value || triggerDisabled)
        return;
      rootContext.changeModelValue(itemContext.value.value);
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Collapsible_CollapsibleTrigger._sfc_main), {
        id: vue.unref(itemContext).triggerId,
        ref: vue.unref(itemContext).currentRef,
        "data-reka-collection-item": "",
        as: props.as,
        "as-child": props.asChild,
        "aria-disabled": vue.unref(itemContext).disabled.value || void 0,
        "aria-expanded": vue.unref(itemContext).open.value || false,
        "data-disabled": vue.unref(itemContext).dataDisabled.value,
        "data-orientation": vue.unref(rootContext).orientation,
        "data-state": vue.unref(itemContext).dataState.value,
        disabled: vue.unref(itemContext).disabled.value,
        onClick: changeItem
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["id", "as", "as-child", "aria-disabled", "aria-expanded", "data-disabled", "data-orientation", "data-state", "disabled"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=AccordionTrigger.cjs.map
