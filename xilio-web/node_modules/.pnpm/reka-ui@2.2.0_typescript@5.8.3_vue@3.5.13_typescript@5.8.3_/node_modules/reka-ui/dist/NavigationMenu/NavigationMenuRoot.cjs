'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const Collection_Collection = require('../Collection/Collection.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useDirection = require('../shared/useDirection.cjs');
const shared_useId = require('../shared/useId.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const [injectNavigationMenuContext, provideNavigationMenuContext] = shared_createContext.createContext(["NavigationMenuRoot", "NavigationMenuSub"], "NavigationMenuContext");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const modelValue = core.useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue ?? "",
      passive: props.modelValue === void 0
    });
    const previousValue = vue.ref("");
    const { forwardRef, currentElement: rootNavigationMenu } = shared_useForwardExpose.useForwardExpose();
    const indicatorTrack = vue.ref();
    const viewport = vue.ref();
    const activeTrigger = vue.ref();
    const { getItems, CollectionSlot } = Collection_Collection.useCollection({ key: "NavigationMenu", isProvider: true });
    const { delayDuration, skipDelayDuration, dir: propDir, disableClickTrigger, disableHoverTrigger, unmountOnHide } = vue.toRefs(props);
    const dir = shared_useDirection.useDirection(propDir);
    const isDelaySkipped = core.refAutoReset(false, skipDelayDuration);
    const computedDelay = vue.computed(() => {
      const isOpen = modelValue.value !== "";
      if (isOpen || isDelaySkipped.value)
        return 150;
      else return delayDuration.value;
    });
    const debouncedFn = core.useDebounceFn((val) => {
      if (typeof val === "string") {
        previousValue.value = modelValue.value;
        modelValue.value = val;
      }
    }, computedDelay);
    vue.watchEffect(() => {
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
      baseId: shared_useId.useId(void 0, "reka-navigation-menu"),
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
      return vue.openBlock(), vue.createBlock(vue.unref(CollectionSlot), null, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), {
            ref: vue.unref(forwardRef),
            "aria-label": "Main",
            as: _ctx.as,
            "as-child": _ctx.asChild,
            "data-orientation": _ctx.orientation,
            dir: vue.unref(dir),
            "data-reka-navigation-menu": ""
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default", { modelValue: vue.unref(modelValue) })
            ]),
            _: 3
          }, 8, ["as", "as-child", "data-orientation", "dir"])
        ]),
        _: 3
      });
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectNavigationMenuContext = injectNavigationMenuContext;
exports.provideNavigationMenuContext = provideNavigationMenuContext;
//# sourceMappingURL=NavigationMenuRoot.cjs.map
