'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const vue$1 = require('@floating-ui/vue');
const Popper_utils = require('./utils.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useSize = require('../shared/useSize.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Popper_PopperRoot = require('./PopperRoot.cjs');

const PopperContentPropsDefaultValue = {
  side: "bottom",
  sideOffset: 0,
  align: "center",
  alignOffset: 0,
  arrowPadding: 0,
  avoidCollisions: true,
  collisionBoundary: () => [],
  collisionPadding: 0,
  sticky: "partial",
  hideWhenDetached: false,
  positionStrategy: "fixed",
  updatePositionStrategy: "optimized",
  prioritizePosition: false
};
const [injectPopperContentContext, providePopperContentContext] = shared_createContext.createContext("PopperContent");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "PopperContent",
  props: /* @__PURE__ */ vue.mergeDefaults({
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    positionStrategy: {},
    updatePositionStrategy: {},
    disableUpdateOnLayoutShift: { type: Boolean },
    prioritizePosition: { type: Boolean },
    reference: {},
    asChild: { type: Boolean },
    as: {}
  }, {
    ...PopperContentPropsDefaultValue
  }),
  emits: ["placed"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = Popper_PopperRoot.injectPopperRootContext();
    const { forwardRef, currentElement: contentElement } = shared_useForwardExpose.useForwardExpose();
    const floatingRef = vue.ref();
    const arrow = vue.ref();
    const { width: arrowWidth, height: arrowHeight } = shared_useSize.useSize(arrow);
    const desiredPlacement = vue.computed(
      () => props.side + (props.align !== "center" ? `-${props.align}` : "")
    );
    const collisionPadding = vue.computed(() => {
      return typeof props.collisionPadding === "number" ? props.collisionPadding : { top: 0, right: 0, bottom: 0, left: 0, ...props.collisionPadding };
    });
    const boundary = vue.computed(() => {
      return Array.isArray(props.collisionBoundary) ? props.collisionBoundary : [props.collisionBoundary];
    });
    const detectOverflowOptions = vue.computed(() => {
      return {
        padding: collisionPadding.value,
        boundary: boundary.value.filter(Popper_utils.isNotNull),
        // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
        altBoundary: boundary.value.length > 0
      };
    });
    const computedMiddleware = core.computedEager(() => {
      return [
        vue$1.offset({
          mainAxis: props.sideOffset + arrowHeight.value,
          alignmentAxis: props.alignOffset
        }),
        props.prioritizePosition && props.avoidCollisions && vue$1.flip({
          ...detectOverflowOptions.value
        }),
        props.avoidCollisions && vue$1.shift({
          mainAxis: true,
          crossAxis: !!props.prioritizePosition,
          limiter: props.sticky === "partial" ? vue$1.limitShift() : void 0,
          ...detectOverflowOptions.value
        }),
        !props.prioritizePosition && props.avoidCollisions && vue$1.flip({
          ...detectOverflowOptions.value
        }),
        vue$1.size({
          ...detectOverflowOptions.value,
          apply: ({ elements, rects, availableWidth, availableHeight }) => {
            const { width: anchorWidth, height: anchorHeight } = rects.reference;
            const contentStyle = elements.floating.style;
            contentStyle.setProperty(
              "--reka-popper-available-width",
              `${availableWidth}px`
            );
            contentStyle.setProperty(
              "--reka-popper-available-height",
              `${availableHeight}px`
            );
            contentStyle.setProperty(
              "--reka-popper-anchor-width",
              `${anchorWidth}px`
            );
            contentStyle.setProperty(
              "--reka-popper-anchor-height",
              `${anchorHeight}px`
            );
          }
        }),
        arrow.value && vue$1.arrow({ element: arrow.value, padding: props.arrowPadding }),
        Popper_utils.transformOrigin({
          arrowWidth: arrowWidth.value,
          arrowHeight: arrowHeight.value
        }),
        props.hideWhenDetached && vue$1.hide({ strategy: "referenceHidden", ...detectOverflowOptions.value })
      ];
    });
    const reference = vue.computed(() => props.reference ?? rootContext.anchor.value);
    const { floatingStyles, placement, isPositioned, middlewareData, update } = vue$1.useFloating(
      reference,
      floatingRef,
      {
        strategy: props.positionStrategy,
        placement: desiredPlacement,
        whileElementsMounted: (...args) => {
          const cleanup = vue$1.autoUpdate(...args, {
            layoutShift: !props.disableUpdateOnLayoutShift,
            animationFrame: props.updatePositionStrategy === "always"
          });
          return cleanup;
        },
        middleware: computedMiddleware
      }
    );
    const placedSide = vue.computed(
      () => Popper_utils.getSideAndAlignFromPlacement(placement.value)[0]
    );
    const placedAlign = vue.computed(
      () => Popper_utils.getSideAndAlignFromPlacement(placement.value)[1]
    );
    vue.watchPostEffect(() => {
      if (isPositioned.value)
        emits("placed");
    });
    const cannotCenterArrow = vue.computed(
      () => middlewareData.value.arrow?.centerOffset !== 0
    );
    const contentZIndex = vue.ref("");
    vue.watchEffect(() => {
      if (contentElement.value)
        contentZIndex.value = window.getComputedStyle(contentElement.value).zIndex;
    });
    const arrowX = vue.computed(() => middlewareData.value.arrow?.x ?? 0);
    const arrowY = vue.computed(() => middlewareData.value.arrow?.y ?? 0);
    providePopperContentContext({
      placedSide,
      onArrowChange: (element) => arrow.value = element,
      arrowX,
      arrowY,
      shouldHideArrow: cannotCenterArrow
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", {
        ref_key: "floatingRef",
        ref: floatingRef,
        "data-reka-popper-content-wrapper": "",
        style: vue.normalizeStyle({
          ...vue.unref(floatingStyles),
          transform: vue.unref(isPositioned) ? vue.unref(floatingStyles).transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: contentZIndex.value,
          ["--reka-popper-transform-origin"]: [
            vue.unref(middlewareData).transformOrigin?.x,
            vue.unref(middlewareData).transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...vue.unref(middlewareData).hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        })
      }, [
        vue.createVNode(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({ ref: vue.unref(forwardRef) }, _ctx.$attrs, {
          "as-child": props.asChild,
          as: _ctx.as,
          "data-side": placedSide.value,
          "data-align": placedAlign.value,
          style: {
            // if the PopperContent hasn't been placed yet (not all measurements done)
            // we prevent animations so that users's animation don't kick in too early referring wrong sides
            animation: !vue.unref(isPositioned) ? "none" : void 0
          }
        }), {
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 16, ["as-child", "as", "data-side", "data-align", "style"])
      ], 4);
    };
  }
});

exports.PopperContentPropsDefaultValue = PopperContentPropsDefaultValue;
exports._sfc_main = _sfc_main;
exports.injectPopperContentContext = injectPopperContentContext;
//# sourceMappingURL=PopperContent.cjs.map
