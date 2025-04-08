import { defineComponent, mergeDefaults, ref, computed, watchPostEffect, watchEffect, createElementBlock, openBlock, normalizeStyle, unref, createVNode, mergeProps, withCtx, renderSlot } from 'vue';
import { computedEager } from '@vueuse/core';
import { offset, flip, shift, size, arrow, hide, limitShift, useFloating, autoUpdate } from '@floating-ui/vue';
import { i as isNotNull, t as transformOrigin, g as getSideAndAlignFromPlacement } from './utils.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { u as useSize } from '../shared/useSize.js';
import { c as createContext } from '../shared/createContext.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectPopperRootContext } from './PopperRoot.js';

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
const [injectPopperContentContext, providePopperContentContext] = createContext("PopperContent");
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "PopperContent",
  props: /* @__PURE__ */ mergeDefaults({
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
    const rootContext = injectPopperRootContext();
    const { forwardRef, currentElement: contentElement } = useForwardExpose();
    const floatingRef = ref();
    const arrow$1 = ref();
    const { width: arrowWidth, height: arrowHeight } = useSize(arrow$1);
    const desiredPlacement = computed(
      () => props.side + (props.align !== "center" ? `-${props.align}` : "")
    );
    const collisionPadding = computed(() => {
      return typeof props.collisionPadding === "number" ? props.collisionPadding : { top: 0, right: 0, bottom: 0, left: 0, ...props.collisionPadding };
    });
    const boundary = computed(() => {
      return Array.isArray(props.collisionBoundary) ? props.collisionBoundary : [props.collisionBoundary];
    });
    const detectOverflowOptions = computed(() => {
      return {
        padding: collisionPadding.value,
        boundary: boundary.value.filter(isNotNull),
        // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
        altBoundary: boundary.value.length > 0
      };
    });
    const computedMiddleware = computedEager(() => {
      return [
        offset({
          mainAxis: props.sideOffset + arrowHeight.value,
          alignmentAxis: props.alignOffset
        }),
        props.prioritizePosition && props.avoidCollisions && flip({
          ...detectOverflowOptions.value
        }),
        props.avoidCollisions && shift({
          mainAxis: true,
          crossAxis: !!props.prioritizePosition,
          limiter: props.sticky === "partial" ? limitShift() : void 0,
          ...detectOverflowOptions.value
        }),
        !props.prioritizePosition && props.avoidCollisions && flip({
          ...detectOverflowOptions.value
        }),
        size({
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
        arrow$1.value && arrow({ element: arrow$1.value, padding: props.arrowPadding }),
        transformOrigin({
          arrowWidth: arrowWidth.value,
          arrowHeight: arrowHeight.value
        }),
        props.hideWhenDetached && hide({ strategy: "referenceHidden", ...detectOverflowOptions.value })
      ];
    });
    const reference = computed(() => props.reference ?? rootContext.anchor.value);
    const { floatingStyles, placement, isPositioned, middlewareData, update } = useFloating(
      reference,
      floatingRef,
      {
        strategy: props.positionStrategy,
        placement: desiredPlacement,
        whileElementsMounted: (...args) => {
          const cleanup = autoUpdate(...args, {
            layoutShift: !props.disableUpdateOnLayoutShift,
            animationFrame: props.updatePositionStrategy === "always"
          });
          return cleanup;
        },
        middleware: computedMiddleware
      }
    );
    const placedSide = computed(
      () => getSideAndAlignFromPlacement(placement.value)[0]
    );
    const placedAlign = computed(
      () => getSideAndAlignFromPlacement(placement.value)[1]
    );
    watchPostEffect(() => {
      if (isPositioned.value)
        emits("placed");
    });
    const cannotCenterArrow = computed(
      () => middlewareData.value.arrow?.centerOffset !== 0
    );
    const contentZIndex = ref("");
    watchEffect(() => {
      if (contentElement.value)
        contentZIndex.value = window.getComputedStyle(contentElement.value).zIndex;
    });
    const arrowX = computed(() => middlewareData.value.arrow?.x ?? 0);
    const arrowY = computed(() => middlewareData.value.arrow?.y ?? 0);
    providePopperContentContext({
      placedSide,
      onArrowChange: (element) => arrow$1.value = element,
      arrowX,
      arrowY,
      shouldHideArrow: cannotCenterArrow
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "floatingRef",
        ref: floatingRef,
        "data-reka-popper-content-wrapper": "",
        style: normalizeStyle({
          ...unref(floatingStyles),
          transform: unref(isPositioned) ? unref(floatingStyles).transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: contentZIndex.value,
          ["--reka-popper-transform-origin"]: [
            unref(middlewareData).transformOrigin?.x,
            unref(middlewareData).transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...unref(middlewareData).hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        })
      }, [
        createVNode(unref(Primitive), mergeProps({ ref: unref(forwardRef) }, _ctx.$attrs, {
          "as-child": props.asChild,
          as: _ctx.as,
          "data-side": placedSide.value,
          "data-align": placedAlign.value,
          style: {
            // if the PopperContent hasn't been placed yet (not all measurements done)
            // we prevent animations so that users's animation don't kick in too early referring wrong sides
            animation: !unref(isPositioned) ? "none" : void 0
          }
        }), {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 16, ["as-child", "as", "data-side", "data-align", "style"])
      ], 4);
    };
  }
});

export { PopperContentPropsDefaultValue as P, _sfc_main as _, injectPopperContentContext as i };
//# sourceMappingURL=PopperContent.js.map
