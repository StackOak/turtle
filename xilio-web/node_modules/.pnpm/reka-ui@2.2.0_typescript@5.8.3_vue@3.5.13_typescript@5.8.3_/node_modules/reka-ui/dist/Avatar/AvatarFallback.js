import { defineComponent, ref, watch, createBlock, createCommentVNode, unref, openBlock, withCtx, renderSlot } from 'vue';
import { i as injectAvatarRootContext } from './AvatarRoot.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AvatarFallback",
  props: {
    delayMs: { default: 0 },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectAvatarRootContext();
    useForwardExpose();
    const canRender = ref(false);
    let timeout;
    watch(rootContext.imageLoadingStatus, (value) => {
      if (value === "loading") {
        canRender.value = false;
        if (props.delayMs) {
          timeout = setTimeout(() => {
            canRender.value = true;
            clearTimeout(timeout);
          }, props.delayMs);
        } else {
          canRender.value = true;
        }
      }
    }, { immediate: true });
    return (_ctx, _cache) => {
      return canRender.value && unref(rootContext).imageLoadingStatus.value !== "loaded" ? (openBlock(), createBlock(unref(Primitive), {
        key: 0,
        "as-child": _ctx.asChild,
        as: _ctx.as
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as-child", "as"])) : createCommentVNode("", true);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=AvatarFallback.js.map
