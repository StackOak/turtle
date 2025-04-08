import { defineComponent, createBlock, openBlock, unref, withCtx, renderSlot } from 'vue';
import { i as injectSwitchRootContext } from './SwitchRoot.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SwitchThumb",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const rootContext = injectSwitchRootContext();
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        "data-state": unref(rootContext).modelValue?.value ? "checked" : "unchecked",
        "data-disabled": unref(rootContext).disabled.value ? "" : void 0,
        "as-child": _ctx.asChild,
        as: _ctx.as
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["data-state", "data-disabled", "as-child", "as"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=SwitchThumb.js.map
