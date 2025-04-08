'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const Collection_Collection = require('../Collection/Collection.cjs');
const Slider_utils = require('./utils.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useSize = require('../shared/useSize.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Slider_SliderRoot = require('./SliderRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const rootContext = Slider_SliderRoot.injectSliderRootContext();
    const orientation = Slider_utils.injectSliderOrientationContext();
    const { forwardRef, currentElement: thumbElement } = shared_useForwardExpose.useForwardExpose();
    const { CollectionItem } = Collection_Collection.useCollection();
    const value = vue.computed(() => rootContext.modelValue?.value?.[props.index]);
    const percent = vue.computed(() => value.value === void 0 ? 0 : Slider_utils.convertValueToPercentage(value.value, rootContext.min.value ?? 0, rootContext.max.value ?? 100));
    const label = vue.computed(() => Slider_utils.getLabel(props.index, rootContext.modelValue?.value?.length ?? 0));
    const size = shared_useSize.useSize(thumbElement);
    const orientationSize = vue.computed(() => size[orientation.size].value);
    const thumbInBoundsOffset = vue.computed(() => {
      if (rootContext.thumbAlignment.value === "overflow" || !orientationSize.value) {
        return 0;
      } else {
        return Slider_utils.getThumbInBoundsOffset(orientationSize.value, percent.value, orientation.direction);
      }
    });
    const isMounted = core.useMounted();
    vue.onMounted(() => {
      rootContext.thumbElements.value.push(thumbElement.value);
    });
    vue.onUnmounted(() => {
      const i = rootContext.thumbElements.value.findIndex((i2) => i2 === thumbElement.value) ?? -1;
      rootContext.thumbElements.value.splice(i, 1);
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(CollectionItem), null, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(_ctx.$attrs, {
            ref: vue.unref(forwardRef),
            role: "slider",
            tabindex: vue.unref(rootContext).disabled.value ? void 0 : 0,
            "aria-label": _ctx.$attrs["aria-label"] || label.value,
            "data-disabled": vue.unref(rootContext).disabled.value ? "" : void 0,
            "data-orientation": vue.unref(rootContext).orientation.value,
            "aria-valuenow": value.value,
            "aria-valuemin": vue.unref(rootContext).min.value,
            "aria-valuemax": vue.unref(rootContext).max.value,
            "aria-orientation": vue.unref(rootContext).orientation.value,
            "as-child": _ctx.asChild,
            as: _ctx.as,
            style: {
              transform: "var(--reka-slider-thumb-transform)",
              position: "absolute",
              [vue.unref(orientation).startEdge]: `calc(${percent.value}% + ${thumbInBoundsOffset.value}px)`,
              /**
               * There will be no value on initial render while we work out the index so we hide thumbs
               * without a value, otherwise SSR will render them in the wrong position before they
               * snap into the correct position during hydration which would be visually jarring for
               * slower connections.
               */
              display: !vue.unref(isMounted) && value.value === void 0 ? "none" : void 0
            },
            onFocus: _cache[0] || (_cache[0] = () => {
              vue.unref(rootContext).valueIndexToChangeRef.value = _ctx.index;
            })
          }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["tabindex", "aria-label", "data-disabled", "data-orientation", "aria-valuenow", "aria-valuemin", "aria-valuemax", "aria-orientation", "as-child", "as", "style"])
        ]),
        _: 3
      });
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=SliderThumbImpl.cjs.map
