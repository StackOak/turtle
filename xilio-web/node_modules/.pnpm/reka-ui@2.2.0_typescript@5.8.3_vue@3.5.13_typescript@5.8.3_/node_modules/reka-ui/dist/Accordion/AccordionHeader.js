import { defineComponent, createBlock, openBlock, unref, withCtx, renderSlot } from 'vue';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectAccordionRootContext } from './AccordionRoot.js';
import { i as injectAccordionItemContext } from './AccordionItem.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AccordionHeader",
  props: {
    asChild: { type: Boolean },
    as: { default: "h3" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectAccordionRootContext();
    const itemContext = injectAccordionItemContext();
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        as: props.as,
        "as-child": props.asChild,
        "data-orientation": unref(rootContext).orientation,
        "data-state": unref(itemContext).dataState.value,
        "data-disabled": unref(itemContext).dataDisabled.value
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as", "as-child", "data-orientation", "data-state", "data-disabled"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=AccordionHeader.js.map
