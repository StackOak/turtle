'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const DismissableLayer_utils = require('./utils.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const context = vue.reactive({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
});
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: { type: Boolean, default: false },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { forwardRef, currentElement: layerElement } = shared_useForwardExpose.useForwardExpose();
    const ownerDocument = vue.computed(
      () => layerElement.value?.ownerDocument ?? globalThis.document
    );
    const layers = vue.computed(() => context.layersRoot);
    const index = vue.computed(() => {
      return layerElement.value ? Array.from(layers.value).indexOf(layerElement.value) : -1;
    });
    const isBodyPointerEventsDisabled = vue.computed(() => {
      return context.layersWithOutsidePointerEventsDisabled.size > 0;
    });
    const isPointerEventsEnabled = vue.computed(() => {
      const localLayers = Array.from(layers.value);
      const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1);
      const highestLayerWithOutsidePointerEventsDisabledIndex = localLayers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
      return index.value >= highestLayerWithOutsidePointerEventsDisabledIndex;
    });
    const pointerDownOutside = DismissableLayer_utils.usePointerDownOutside(async (event) => {
      const isPointerDownOnBranch = [...context.branches].some(
        (branch) => branch?.contains(event.target)
      );
      if (!isPointerEventsEnabled.value || isPointerDownOnBranch)
        return;
      emits("pointerDownOutside", event);
      emits("interactOutside", event);
      await vue.nextTick();
      if (!event.defaultPrevented)
        emits("dismiss");
    }, layerElement);
    const focusOutside = DismissableLayer_utils.useFocusOutside((event) => {
      const isFocusInBranch = [...context.branches].some(
        (branch) => branch?.contains(event.target)
      );
      if (isFocusInBranch)
        return;
      emits("focusOutside", event);
      emits("interactOutside", event);
      if (!event.defaultPrevented)
        emits("dismiss");
    }, layerElement);
    core.onKeyStroke("Escape", (event) => {
      const isHighestLayer = index.value === layers.value.size - 1;
      if (!isHighestLayer)
        return;
      emits("escapeKeyDown", event);
      if (!event.defaultPrevented)
        emits("dismiss");
    });
    let originalBodyPointerEvents;
    vue.watchEffect((cleanupFn) => {
      if (!layerElement.value)
        return;
      if (props.disableOutsidePointerEvents) {
        if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
          originalBodyPointerEvents = ownerDocument.value.body.style.pointerEvents;
          ownerDocument.value.body.style.pointerEvents = "none";
        }
        context.layersWithOutsidePointerEventsDisabled.add(layerElement.value);
      }
      layers.value.add(layerElement.value);
      cleanupFn(() => {
        if (props.disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1) {
          ownerDocument.value.body.style.pointerEvents = originalBodyPointerEvents;
        }
      });
    });
    vue.watchEffect((cleanupFn) => {
      cleanupFn(() => {
        if (!layerElement.value)
          return;
        layers.value.delete(layerElement.value);
        context.layersWithOutsidePointerEventsDisabled.delete(layerElement.value);
      });
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        ref: vue.unref(forwardRef),
        "as-child": _ctx.asChild,
        as: _ctx.as,
        "data-dismissable-layer": "",
        style: vue.normalizeStyle({
          pointerEvents: isBodyPointerEventsDisabled.value ? isPointerEventsEnabled.value ? "auto" : "none" : void 0
        }),
        onFocusCapture: vue.unref(focusOutside).onFocusCapture,
        onBlurCapture: vue.unref(focusOutside).onBlurCapture,
        onPointerdownCapture: vue.unref(pointerDownOutside).onPointerDownCapture
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as-child", "as", "style", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.context = context;
//# sourceMappingURL=DismissableLayer.cjs.map
