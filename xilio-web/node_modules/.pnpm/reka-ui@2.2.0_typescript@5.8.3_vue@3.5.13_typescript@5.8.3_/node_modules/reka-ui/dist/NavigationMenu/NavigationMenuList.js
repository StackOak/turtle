import { defineComponent, onMounted, createBlock, openBlock, unref, withCtx, createVNode, mergeProps, renderSlot } from 'vue';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectNavigationMenuContext } from './NavigationMenuRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "NavigationMenuList",
  props: {
    asChild: { type: Boolean },
    as: { default: "ul" }
  },
  setup(__props) {
    const props = __props;
    const menuContext = injectNavigationMenuContext();
    const { forwardRef, currentElement } = useForwardExpose();
    onMounted(() => {
      menuContext.onIndicatorTrackChange(currentElement.value);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        ref: unref(forwardRef),
        style: { "position": "relative" }
      }, {
        default: withCtx(() => [
          createVNode(unref(Primitive), mergeProps(_ctx.$attrs, {
            "as-child": props.asChild,
            as: _ctx.as,
            "data-orientation": unref(menuContext).orientation
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["as-child", "as", "data-orientation"])
        ]),
        _: 3
      }, 512);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=NavigationMenuList.js.map
