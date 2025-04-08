import { defineComponent, computed, onMounted, onUnmounted, createBlock, openBlock, unref, withCtx, createVNode, mergeProps, renderSlot } from 'vue';
import { useMounted } from '@vueuse/core';
import { u as useCollection } from '../Collection/Collection.js';
import { i as injectSliderOrientationContext, c as convertValueToPercentage, d as getLabel, e as getThumbInBoundsOffset } from './utils.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { u as useSize } from '../shared/useSize.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectSliderRootContext } from './SliderRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "SliderThumbImpl",
  props: {
    index: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectSliderRootContext();
    const orientation = injectSliderOrientationContext();
    const { forwardRef, currentElement: thumbElement } = useForwardExpose();
    const { CollectionItem } = useCollection();
    const value = computed(() => rootContext.modelValue?.value?.[props.index]);
    const percent = computed(() => value.value === void 0 ? 0 : convertValueToPercentage(value.value, rootContext.min.value ?? 0, rootContext.max.value ?? 100));
    const label = computed(() => getLabel(props.index, rootContext.modelValue?.value?.length ?? 0));
    const size = useSize(thumbElement);
    const orientationSize = computed(() => size[orientation.size].value);
    const thumbInBoundsOffset = computed(() => {
      if (rootContext.thumbAlignment.value === "overflow" || !orientationSize.value) {
        return 0;
      } else {
        return getThumbInBoundsOffset(orientationSize.value, percent.value, orientation.direction);
      }
    });
    const isMounted = useMounted();
    onMounted(() => {
      rootContext.thumbElements.value.push(thumbElement.value);
    });
    onUnmounted(() => {
      const i = rootContext.thumbElements.value.findIndex((i2) => i2 === thumbElement.value) ?? -1;
      rootContext.thumbElements.value.splice(i, 1);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(CollectionItem), null, {
        default: withCtx(() => [
          createVNode(unref(Primitive), mergeProps(_ctx.$attrs, {
            ref: unref(forwardRef),
            role: "slider",
            tabindex: unref(rootContext).disabled.value ? void 0 : 0,
            "aria-label": _ctx.$attrs["aria-label"] || label.value,
            "data-disabled": unref(rootContext).disabled.value ? "" : void 0,
            "data-orientation": unref(rootContext).orientation.value,
            "aria-valuenow": value.value,
            "aria-valuemin": unref(rootContext).min.value,
            "aria-valuemax": unref(rootContext).max.value,
            "aria-orientation": unref(rootContext).orientation.value,
            "as-child": _ctx.asChild,
            as: _ctx.as,
            style: {
              transform: "var(--reka-slider-thumb-transform)",
              position: "absolute",
              [unref(orientation).startEdge]: `calc(${percent.value}% + ${thumbInBoundsOffset.value}px)`,
              /**
               * There will be no value on initial render while we work out the index so we hide thumbs
               * without a value, otherwise SSR will render them in the wrong position before they
               * snap into the correct position during hydration which would be visually jarring for
               * slower connections.
               */
              display: !unref(isMounted) && value.value === void 0 ? "none" : void 0
            },
            onFocus: _cache[0] || (_cache[0] = () => {
              unref(rootContext).valueIndexToChangeRef.value = _ctx.index;
            })
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["tabindex", "aria-label", "data-disabled", "data-orientation", "aria-valuenow", "aria-valuemin", "aria-valuemax", "aria-orientation", "as-child", "as", "style"])
        ]),
        _: 3
      });
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=SliderThumbImpl.js.map
