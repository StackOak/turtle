'use strict';

const vue = require('vue');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Accordion_AccordionRoot = require('./AccordionRoot.cjs');
const Accordion_AccordionItem = require('./AccordionItem.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "AccordionHeader",
  props: {
    asChild: { type: Boolean },
    as: { default: "h3" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = Accordion_AccordionRoot.injectAccordionRootContext();
    const itemContext = Accordion_AccordionItem.injectAccordionItemContext();
    shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        as: props.as,
        "as-child": props.asChild,
        "data-orientation": vue.unref(rootContext).orientation,
        "data-state": vue.unref(itemContext).dataState.value,
        "data-disabled": vue.unref(itemContext).dataDisabled.value
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as", "as-child", "data-orientation", "data-state", "data-disabled"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=AccordionHeader.cjs.map
