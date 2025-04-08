import { defineComponent, createBlock, createCommentVNode, unref, openBlock, mergeProps, withCtx, renderSlot } from 'vue';
import { i as injectSelectItemContext } from './SelectItem.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SelectItemIndicator",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const props = __props;
    const itemContext = injectSelectItemContext();
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
//# sourceMappingURL=SelectItemIndicator.js.map
