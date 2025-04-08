import { defineComponent, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectTagsInputRootContext } from './TagsInputRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TagsInputClear",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    const context = injectTagsInputRootContext();
    function handleCancel() {
      if (context.disabled.value)
        return;
      context.modelValue.value = [];
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        type: _ctx.as === "button" ? "button" : void 0,
        "data-disabled": unref(context).disabled.value ? "" : void 0,
        onClick: handleCancel
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["type", "data-disabled"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=TagsInputClear.js.map
