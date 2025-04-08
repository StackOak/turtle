'use strict';

const vue = require('vue');
const component_Arrow = require('../component/Arrow.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Popper_PopperContent = require('./PopperContent.cjs');

const OPPOSITE_SIDE = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "PopperArrow",
  props: {
    width: {},
    height: {},
    rounded: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "svg" }
  },
  setup(__props) {
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    const contentContext = Popper_PopperContent.injectPopperContentContext();
    const baseSide = vue.computed(() => OPPOSITE_SIDE[contentContext.placedSide.value]);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("span", {
        ref: (el) => {
          vue.unref(contentContext).onArrowChange(el);
          return void 0;
        },
        style: vue.normalizeStyle({
          position: "absolute",
          left: vue.unref(contentContext).arrowX?.value ? `${vue.unref(contentContext).arrowX?.value}px` : void 0,
          top: vue.unref(contentContext).arrowY?.value ? `${vue.unref(contentContext).arrowY?.value}px` : void 0,
          [baseSide.value]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[vue.unref(contentContext).placedSide.value],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: `rotate(180deg)`,
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[vue.unref(contentContext).placedSide.value],
          visibility: vue.unref(contentContext).shouldHideArrow.value ? "hidden" : void 0
        })
      }, [
        vue.createVNode(component_Arrow._sfc_main, vue.mergeProps(_ctx.$attrs, {
          ref: vue.unref(forwardRef),
          style: {
            display: "block"
          },
          as: _ctx.as,
          "as-child": _ctx.asChild,
          rounded: _ctx.rounded,
          width: _ctx.width,
          height: _ctx.height
        }), {
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 16, ["as", "as-child", "rounded", "width", "height"])
      ], 4);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=PopperArrow.cjs.map
