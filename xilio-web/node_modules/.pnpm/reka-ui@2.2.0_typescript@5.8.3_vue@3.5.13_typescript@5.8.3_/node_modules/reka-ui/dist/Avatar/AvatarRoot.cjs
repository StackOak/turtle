'use strict';

const vue = require('vue');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const [injectAvatarRootContext, provideAvatarRootContext] = shared_createContext.createContext("AvatarRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "AvatarRoot",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    shared_useForwardExpose.useForwardExpose();
    provideAvatarRootContext({
      imageLoadingStatus: vue.ref("loading")
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        "as-child": _ctx.asChild,
        as: _ctx.as
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as-child", "as"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectAvatarRootContext = injectAvatarRootContext;
//# sourceMappingURL=AvatarRoot.cjs.map
