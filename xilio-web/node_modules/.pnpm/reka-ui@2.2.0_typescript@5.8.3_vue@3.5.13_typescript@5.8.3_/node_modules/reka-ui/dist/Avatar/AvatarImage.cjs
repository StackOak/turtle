'use strict';

const vue = require('vue');
const Avatar_utils = require('./utils.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Avatar_AvatarRoot = require('./AvatarRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const { src, referrerPolicy } = vue.toRefs(props);
    shared_useForwardExpose.useForwardExpose();
    const rootContext = Avatar_AvatarRoot.injectAvatarRootContext();
    const imageLoadingStatus = Avatar_utils.useImageLoadingStatus(src, referrerPolicy);
    vue.watch(
      imageLoadingStatus,
      (newValue) => {
        emits("loadingStatusChange", newValue);
        if (newValue !== "idle")
          rootContext.imageLoadingStatus.value = newValue;
      },
      { immediate: true }
    );
    return (_ctx, _cache) => {
      return vue.withDirectives((vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        role: "img",
        "as-child": _ctx.asChild,
        as: _ctx.as,
        src: vue.unref(src),
        "referrer-policy": vue.unref(referrerPolicy)
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as-child", "as", "src", "referrer-policy"])), [
        [vue.vShow, vue.unref(imageLoadingStatus) === "loaded"]
      ]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=AvatarImage.cjs.map
