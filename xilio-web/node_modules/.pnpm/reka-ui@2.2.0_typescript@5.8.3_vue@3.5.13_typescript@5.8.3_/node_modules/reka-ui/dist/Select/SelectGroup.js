import { defineComponent, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { c as createContext } from '../shared/createContext.js';
import { u as useId } from '../shared/useId.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const [injectSelectGroupContext, provideSelectGroupContext] = createContext("SelectGroup");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SelectGroup",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const id = useId(void 0, "reka-select-group");
    provideSelectGroupContext({ id });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps({ role: "group" }, props, { "aria-labelledby": unref(id) }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["aria-labelledby"]);
    };
  }
});

export { _sfc_main as _, injectSelectGroupContext as i };
//# sourceMappingURL=SelectGroup.js.map
