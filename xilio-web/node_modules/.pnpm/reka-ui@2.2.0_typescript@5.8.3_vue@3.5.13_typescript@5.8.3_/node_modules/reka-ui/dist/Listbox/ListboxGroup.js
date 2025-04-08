import { defineComponent, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { u as useId } from '../shared/useId.js';
import { c as createContext } from '../shared/createContext.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const [injectListboxGroupContext, provideListboxGroupContext] = createContext("ListboxGroup");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ListboxGroup",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const id = useId(void 0, "reka-listbox-group");
    provideListboxGroupContext({ id });
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

export { _sfc_main as _, injectListboxGroupContext as i };
//# sourceMappingURL=ListboxGroup.js.map
