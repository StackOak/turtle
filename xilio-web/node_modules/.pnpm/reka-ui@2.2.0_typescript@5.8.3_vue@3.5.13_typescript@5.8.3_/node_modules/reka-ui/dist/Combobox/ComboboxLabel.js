import { defineComponent, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { i as injectComboboxGroupContext } from './ComboboxGroup.js';
import { u as useId } from '../shared/useId.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ComboboxLabel",
  props: {
    for: {},
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    const groupContext = injectComboboxGroupContext({ id: "", labelId: "" });
    groupContext.labelId ||= useId(void 0, "reka-combobox-group-label");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        id: unref(groupContext).labelId
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
//# sourceMappingURL=ComboboxLabel.js.map
