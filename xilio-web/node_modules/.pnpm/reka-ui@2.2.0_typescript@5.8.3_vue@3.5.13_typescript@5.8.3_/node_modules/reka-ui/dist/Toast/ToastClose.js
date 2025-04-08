import { defineComponent, createBlock, openBlock, withCtx, createVNode, unref, mergeProps, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from './ToastAnnounceExclude.js';
import { i as injectToastRootContext } from './ToastRootImpl.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ToastClose",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectToastRootContext();
    const { forwardRef } = useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, { "as-child": "" }, {
        default: withCtx(() => [
          createVNode(unref(Primitive), mergeProps(props, {
            ref: unref(forwardRef),
            type: _ctx.as === "button" ? "button" : void 0,
            onClick: unref(rootContext).onClose
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["type", "onClick"])
        ]),
        _: 3
      });
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ToastClose.js.map
