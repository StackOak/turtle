import { defineComponent, createBlock, createCommentVNode, unref, openBlock, mergeProps, withCtx, renderSlot } from 'vue';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { i as injectListboxItemContext } from './ListboxItem.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ListboxItemIndicator",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    const itemContext = injectListboxItemContext();
    return (_ctx, _cache) => {
      return unref(itemContext).isSelected.value ? (openBlock(), createBlock(unref(Primitive), mergeProps({
        key: 0,
        "aria-hidden": "true"
      }, props), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16)) : createCommentVNode("", true);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ListboxItemIndicator.js.map
