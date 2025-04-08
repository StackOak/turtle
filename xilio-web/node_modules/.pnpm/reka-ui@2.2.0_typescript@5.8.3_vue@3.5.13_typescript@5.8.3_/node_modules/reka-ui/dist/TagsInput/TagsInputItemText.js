import { defineComponent, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot, createTextVNode, toDisplayString } from 'vue';
import { i as injectTagsInputItemContext } from './TagsInputItem.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { u as useId } from '../shared/useId.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TagsInputItemText",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const props = __props;
    const itemContext = injectTagsInputItemContext();
    useForwardExpose();
    itemContext.textId ||= useId(void 0, "reka-tags-input-item-text");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        id: unref(itemContext).textId
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(unref(itemContext).displayValue.value), 1)
          ])
        ]),
        _: 3
      }, 16, ["id"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=TagsInputItemText.js.map
