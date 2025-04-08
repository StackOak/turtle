import { defineComponent, ref, toRefs, computed, watchEffect, createBlock, openBlock, unref, withCtx, createVNode, renderSlot } from 'vue';
import { useVModel, refAutoReset, useDebounceFn } from '@vueuse/core';
import { u as useCollection } from '../Collection/Collection.js';
import { c as createContext } from '../shared/createContext.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { u as useDirection } from '../shared/useDirection.js';
import { u as useId } from '../shared/useId.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const [injectNavigationMenuContext, provideNavigationMenuContext] = createContext(["NavigationMenuRoot", "NavigationMenuSub"], "NavigationMenuContext");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "NavigationMenuRoot",
  props: {
    modelValue: { default: void 0 },
    defaultValue: {},
    dir: {},
    orientation: { default: "horizontal" },
    delayDuration: { default: 200 },
    skipDelayDuration: { default: 300 },
    disableClickTrigger: { type: Boolean, default: false },
    disableHoverTrigger: { type: Boolean, default: false },
    disablePointerLeaveClose: { type: Boolean },
    unmountOnHide: { type: Boolean, default: true },
    asChild: { type: Boolean },
    as: { default: "nav" }
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
    const { forwardRef, currentElement: rootNavigationMenu } = useForwardExpose();
    const indicatorTrack = ref();
    const viewport = ref();
    const activeTrigger = ref();
    const { getItems, CollectionSlot } = useCollection({ key: "NavigationMenu", isProvider: true });
    const { delayDuration, skipDelayDuration, dir: propDir, disableClickTrigger, disableHoverTrigger, unmountOnHide } = toRefs(props);
    const dir = useDirection(propDir);
    const isDelaySkipped = refAutoReset(false, skipDelayDuration);
    const computedDelay = computed(() => {
      const isOpen = modelValue.value !== "";
      if (isOpen || isDelaySkipped.value)
        return 150;
      else return delayDuration.value;
    });
    const debouncedFn = useDebounceFn((val) => {
      if (typeof val === "string") {
        previousValue.value = modelValue.value;
        modelValue.value = val;
      }
    }, computedDelay);
    watchEffect(() => {
      if (!modelValue.value)
        return;
      const items = getItems().map((i) => i.ref);
      activeTrigger.value = items.find(
        (item) => item.id.includes(modelValue.value)
      );
    });
    provideNavigationMenuContext({
      isRootMenu: true,
      modelValue,
      previousValue,
      baseId: useId(void 0, "reka-navigation-menu"),
      disableClickTrigger,
      disableHoverTrigger,
      dir,
      unmountOnHide,
      orientation: props.orientation,
      rootNavigationMenu,
      indicatorTrack,
      activeTrigger,
      onIndicatorTrackChange: (val) => {
        indicatorTrack.value = val;
      },
      viewport,
      onViewportChange: (val) => {
        viewport.value = val;
      },
      onTriggerEnter: (val) => {
        debouncedFn(val);
      },
      onTriggerLeave: () => {
        isDelaySkipped.value = true;
        debouncedFn("");
      },
      onContentEnter: () => {
        debouncedFn();
      },
      onContentLeave: () => {
        if (!props.disablePointerLeaveClose)
          debouncedFn("");
      },
      onItemSelect: (val) => {
        previousValue.value = modelValue.value;
        modelValue.value = val;
      },
      onItemDismiss: () => {
        previousValue.value = modelValue.value;
        modelValue.value = "";
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(CollectionSlot), null, {
        default: withCtx(() => [
          createVNode(unref(Primitive), {
            ref: unref(forwardRef),
            "aria-label": "Main",
            as: _ctx.as,
            "as-child": _ctx.asChild,
            "data-orientation": _ctx.orientation,
            dir: unref(dir),
            "data-reka-navigation-menu": ""
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })
            ]),
            _: 3
          }, 8, ["as", "as-child", "data-orientation", "dir"])
        ]),
        _: 3
      });
    };
  }
});

export { _sfc_main as _, injectNavigationMenuContext as i, provideNavigationMenuContext as p };
//# sourceMappingURL=NavigationMenuRoot.js.map
