'use strict';

const vue = require('vue');
const Toast_ToastAnnounceExclude = require('./ToastAnnounceExclude.cjs');
const Toast_ToastClose = require('./ToastClose.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return _ctx.altText ? (vue.openBlock(), vue.createBlock(Toast_ToastAnnounceExclude._sfc_main, {
        key: 0,
        "alt-text": _ctx.altText,
        "as-child": ""
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(Toast_ToastClose._sfc_main, {
            ref: vue.unref(forwardRef),
            as: _ctx.as,
            "as-child": _ctx.asChild
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["as", "as-child"])
        ]),
        _: 3
      }, 8, ["alt-text"])) : vue.createCommentVNode("", true);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ToastAction.cjs.map
