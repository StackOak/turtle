import { defineComponent, watchPostEffect, createBlock, openBlock, unref, withCtx, renderSlot } from 'vue';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { i as injectPopperRootContext } from './PopperRoot.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PopperAnchor",
  props: {
    reference: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const { forwardRef, currentElement } = useForwardExpose();
    const rootContext = injectPopperRootContext();
    watchPostEffect(() => {
      rootContext.onAnchorChange(props.reference ?? currentElement.value);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        ref: unref(forwardRef),
        as: _ctx.as,
        "as-child": _ctx.asChild
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as", "as-child"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=PopperAnchor.js.map
