import { defineComponent, ref, createBlock, openBlock, unref, withCtx, renderSlot } from 'vue';
import { c as createContext } from '../shared/createContext.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const [injectAvatarRootContext, provideAvatarRootContext] = createContext("AvatarRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AvatarRoot",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    useForwardExpose();
    provideAvatarRootContext({
      imageLoadingStatus: ref("loading")
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        "as-child": _ctx.asChild,
        as: _ctx.as
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as-child", "as"]);
    };
  }
});

export { _sfc_main as _, injectAvatarRootContext as i };
//# sourceMappingURL=AvatarRoot.js.map
