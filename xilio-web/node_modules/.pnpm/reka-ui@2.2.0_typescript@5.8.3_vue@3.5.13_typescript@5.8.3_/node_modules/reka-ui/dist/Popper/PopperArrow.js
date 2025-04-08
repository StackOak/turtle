import { defineComponent, computed, createElementBlock, openBlock, normalizeStyle, unref, createVNode, mergeProps, withCtx, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from '../component/Arrow.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { i as injectPopperContentContext } from './PopperContent.js';

const OPPOSITE_SIDE = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
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
    const { forwardRef } = useForwardExpose();
    const contentContext = injectPopperContentContext();
    const baseSide = computed(() => OPPOSITE_SIDE[contentContext.placedSide.value]);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("span", {
        ref: (el) => {
          unref(contentContext).onArrowChange(el);
          return void 0;
        },
        style: normalizeStyle({
          position: "absolute",
          left: unref(contentContext).arrowX?.value ? `${unref(contentContext).arrowX?.value}px` : void 0,
          top: unref(contentContext).arrowY?.value ? `${unref(contentContext).arrowY?.value}px` : void 0,
          [baseSide.value]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[unref(contentContext).placedSide.value],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: `rotate(180deg)`,
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[unref(contentContext).placedSide.value],
          visibility: unref(contentContext).shouldHideArrow.value ? "hidden" : void 0
        })
      }, [
        createVNode(_sfc_main$1, mergeProps(_ctx.$attrs, {
          ref: unref(forwardRef),
          style: {
            display: "block"
          },
          as: _ctx.as,
          "as-child": _ctx.asChild,
          rounded: _ctx.rounded,
          width: _ctx.width,
          height: _ctx.height
        }), {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 16, ["as", "as-child", "rounded", "width", "height"])
      ], 4);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=PopperArrow.js.map
