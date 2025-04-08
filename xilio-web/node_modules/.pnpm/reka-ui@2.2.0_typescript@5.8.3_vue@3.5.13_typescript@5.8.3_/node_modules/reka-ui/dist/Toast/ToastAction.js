import { defineComponent, createBlock, createCommentVNode, openBlock, withCtx, createVNode, unref, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from './ToastAnnounceExclude.js';
import { _ as _sfc_main$2 } from './ToastClose.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ToastAction",
  props: {
    altText: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    if (!props.altText)
      throw new Error("Missing prop `altText` expected on `ToastAction`");
    const { forwardRef } = useForwardExpose();
    return (_ctx, _cache) => {
      return _ctx.altText ? (openBlock(), createBlock(_sfc_main$1, {
        key: 0,
        "alt-text": _ctx.altText,
        "as-child": ""
      }, {
        default: withCtx(() => [
          createVNode(_sfc_main$2, {
            ref: unref(forwardRef),
            as: _ctx.as,
            "as-child": _ctx.asChild
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["as", "as-child"])
        ]),
        _: 3
      }, 8, ["alt-text"])) : createCommentVNode("", true);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ToastAction.js.map
