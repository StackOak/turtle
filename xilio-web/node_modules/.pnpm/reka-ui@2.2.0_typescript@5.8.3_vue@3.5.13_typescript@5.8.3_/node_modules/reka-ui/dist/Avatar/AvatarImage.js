import { defineComponent, toRefs, watch, withDirectives, createBlock, openBlock, unref, withCtx, renderSlot, vShow } from 'vue';
import { u as useImageLoadingStatus } from './utils.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectAvatarRootContext } from './AvatarRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AvatarImage",
  props: {
    src: {},
    referrerPolicy: {},
    asChild: { type: Boolean },
    as: { default: "img" }
  },
  emits: ["loadingStatusChange"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { src, referrerPolicy } = toRefs(props);
    useForwardExpose();
    const rootContext = injectAvatarRootContext();
    const imageLoadingStatus = useImageLoadingStatus(src, referrerPolicy);
    watch(
      imageLoadingStatus,
      (newValue) => {
        emits("loadingStatusChange", newValue);
        if (newValue !== "idle")
          rootContext.imageLoadingStatus.value = newValue;
      },
      { immediate: true }
    );
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createBlock(unref(Primitive), {
        role: "img",
        "as-child": _ctx.asChild,
        as: _ctx.as,
        src: unref(src),
        "referrer-policy": unref(referrerPolicy)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as-child", "as", "src", "referrer-policy"])), [
        [vShow, unref(imageLoadingStatus) === "loaded"]
      ]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=AvatarImage.js.map
