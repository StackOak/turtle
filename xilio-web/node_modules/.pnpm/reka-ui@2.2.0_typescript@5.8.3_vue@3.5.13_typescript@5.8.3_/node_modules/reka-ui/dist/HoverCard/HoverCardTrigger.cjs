'use strict';

const vue = require('vue');
const Popper_PopperAnchor = require('../Popper/PopperAnchor.cjs');
const HoverCard_utils = require('./utils.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const HoverCard_HoverCardRoot = require('./HoverCardRoot.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "HoverCardTrigger",
  props: {
    reference: {},
    asChild: { type: Boolean },
    as: { default: "a" }
  },
  setup(__props) {
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    const rootContext = HoverCard_HoverCardRoot.injectHoverCardRootContext();
    rootContext.triggerElement = currentElement;
    function handleLeave() {
      setTimeout(() => {
        if (!rootContext.isPointerInTransitRef.value && !rootContext.open.value) {
          rootContext.onClose();
        }
      }, 0);
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Popper_PopperAnchor._sfc_main), {
        "as-child": "",
        reference: _ctx.reference
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), {
            ref: vue.unref(forwardRef),
            "as-child": _ctx.asChild,
            as: _ctx.as,
            "data-state": vue.unref(rootContext).open.value ? "open" : "closed",
            "data-grace-area-trigger": "",
            onPointerenter: _cache[0] || (_cache[0] = ($event) => vue.unref(HoverCard_utils.excludeTouch)(vue.unref(rootContext).onOpen)($event)),
            onPointerleave: _cache[1] || (_cache[1] = ($event) => vue.unref(HoverCard_utils.excludeTouch)(handleLeave)($event)),
            onFocus: _cache[2] || (_cache[2] = ($event) => vue.unref(rootContext).onOpen()),
            onBlur: _cache[3] || (_cache[3] = ($event) => vue.unref(rootContext).onClose())
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["as-child", "as", "data-state"])
        ]),
        _: 3
      }, 8, ["reference"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=HoverCardTrigger.cjs.map
