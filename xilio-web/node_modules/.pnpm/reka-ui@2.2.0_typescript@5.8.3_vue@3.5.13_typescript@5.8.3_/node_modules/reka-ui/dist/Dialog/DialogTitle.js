import { defineComponent, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectDialogRootContext } from './DialogRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DialogTitle",
  props: {
    asChild: { type: Boolean },
    as: { default: "h2" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectDialogRootContext();
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        id: unref(rootContext).titleId
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
//# sourceMappingURL=DialogTitle.js.map
