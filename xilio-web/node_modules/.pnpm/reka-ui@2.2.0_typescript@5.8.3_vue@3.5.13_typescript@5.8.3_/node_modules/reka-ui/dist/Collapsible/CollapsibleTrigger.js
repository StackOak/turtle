import { defineComponent, createBlock, openBlock, unref, withCtx, renderSlot } from 'vue';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { i as injectCollapsibleRootContext } from './CollapsibleRoot.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CollapsibleTrigger",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    const rootContext = injectCollapsibleRootContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        type: _ctx.as === "button" ? "button" : void 0,
        as: _ctx.as,
        "as-child": props.asChild,
        "aria-controls": unref(rootContext).contentId,
        "aria-expanded": unref(rootContext).open.value,
        "data-state": unref(rootContext).open.value ? "open" : "closed",
        "data-disabled": unref(rootContext).disabled?.value ? "" : void 0,
        disabled: unref(rootContext).disabled?.value,
        onClick: unref(rootContext).onOpenToggle
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["type", "as", "as-child", "aria-controls", "aria-expanded", "data-state", "data-disabled", "disabled", "onClick"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=CollapsibleTrigger.js.map
