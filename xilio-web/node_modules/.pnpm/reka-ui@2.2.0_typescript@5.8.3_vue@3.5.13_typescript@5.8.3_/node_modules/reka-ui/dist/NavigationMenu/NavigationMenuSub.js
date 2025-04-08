import { defineComponent, ref, watchEffect, createBlock, openBlock, unref, withCtx, createVNode, renderSlot } from 'vue';
import { useVModel } from '@vueuse/core';
import { u as useCollection } from '../Collection/Collection.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { i as injectNavigationMenuContext, p as provideNavigationMenuContext } from './NavigationMenuRoot.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "NavigationMenuSub",
  props: {
    modelValue: {},
    defaultValue: {},
    orientation: { default: "horizontal" },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue ?? "",
      passive: props.modelValue === void 0
    });
    const previousValue = ref("");
    const menuContext = injectNavigationMenuContext();
    const { forwardRef, currentElement } = useForwardExpose();
    const indicatorTrack = ref();
    const viewport = ref();
    const activeTrigger = ref();
    const { getItems, CollectionSlot } = useCollection({ key: "NavigationMenu", isProvider: true });
    watchEffect(() => {
      if (!modelValue.value)
        return;
      const items = getItems().map((i) => i.ref);
      activeTrigger.value = items.find(
        (item) => item.id.includes(modelValue.value)
      );
    });
    provideNavigationMenuContext({
      ...menuContext,
      isRootMenu: false,
      modelValue,
      previousValue,
      activeTrigger,
      orientation: props.orientation,
      rootNavigationMenu: currentElement,
      indicatorTrack,
      onIndicatorTrackChange: (val) => {
        indicatorTrack.value = val;
      },
      viewport,
      onViewportChange: (val) => {
        viewport.value = val;
      },
      onTriggerEnter: (val) => {
        modelValue.value = val;
      },
      onTriggerLeave: () => {
      },
      onContentEnter: () => {
      },
      onContentLeave: () => {
      },
      onItemSelect: (val) => {
        modelValue.value = val;
      },
      onItemDismiss: () => {
        modelValue.value = "";
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(CollectionSlot), null, {
        default: withCtx(() => [
          createVNode(unref(Primitive), {
            ref: unref(forwardRef),
            "data-orientation": _ctx.orientation,
            "as-child": props.asChild,
            as: _ctx.as,
            "data-reka-navigation-menu": ""
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })
            ]),
            _: 3
          }, 8, ["data-orientation", "as-child", "as"])
        ]),
        _: 3
      });
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=NavigationMenuSub.js.map
