import { defineComponent, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { i as injectSelectGroupContext } from './SelectGroup.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SelectLabel",
  props: {
    for: {},
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(__props) {
    const props = __props;
    const groupContext = injectSelectGroupContext({ id: "" });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        id: unref(groupContext).id
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["id"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=SelectLabel.js.map
