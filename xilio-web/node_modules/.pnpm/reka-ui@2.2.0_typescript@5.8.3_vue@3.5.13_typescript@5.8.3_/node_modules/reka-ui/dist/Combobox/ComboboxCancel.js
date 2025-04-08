import { defineComponent, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectComboboxRootContext } from './ComboboxRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ComboboxCancel",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    const rootContext = injectComboboxRootContext();
    function handleClick() {
      if (rootContext.inputElement.value) {
        rootContext.inputElement.value.value = "";
        rootContext.inputElement.value.focus();
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps({
        type: _ctx.as === "button" ? "button" : void 0
      }, props, {
        tabindex: "-1",
        onClick: handleClick
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["type"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ComboboxCancel.js.map
