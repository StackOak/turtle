'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const Collection_Collection = require('../Collection/Collection.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const NavigationMenu_NavigationMenuRoot = require('./NavigationMenuRoot.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const modelValue = core.useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue ?? "",
      passive: props.modelValue === void 0
    });
    const previousValue = vue.ref("");
    const menuContext = NavigationMenu_NavigationMenuRoot.injectNavigationMenuContext();
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    const indicatorTrack = vue.ref();
    const viewport = vue.ref();
    const activeTrigger = vue.ref();
    const { getItems, CollectionSlot } = Collection_Collection.useCollection({ key: "NavigationMenu", isProvider: true });
    vue.watchEffect(() => {
      if (!modelValue.value)
        return;
      const items = getItems().map((i) => i.ref);
      activeTrigger.value = items.find(
        (item) => item.id.includes(modelValue.value)
      );
    });
    NavigationMenu_NavigationMenuRoot.provideNavigationMenuContext({
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
      return vue.openBlock(), vue.createBlock(vue.unref(CollectionSlot), null, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), {
            ref: vue.unref(forwardRef),
            "data-orientation": _ctx.orientation,
            "as-child": props.asChild,
            as: _ctx.as,
            "data-reka-navigation-menu": ""
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default", { modelValue: vue.unref(modelValue) })
            ]),
            _: 3
          }, 8, ["data-orientation", "as-child", "as"])
        ]),
        _: 3
      });
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=NavigationMenuSub.cjs.map
