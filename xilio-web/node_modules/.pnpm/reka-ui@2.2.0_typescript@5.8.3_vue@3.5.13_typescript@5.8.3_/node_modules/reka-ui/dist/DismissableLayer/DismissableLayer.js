import { defineComponent, computed, reactive, watchEffect, createBlock, openBlock, unref, normalizeStyle, withCtx, renderSlot, nextTick } from 'vue';
import { onKeyStroke } from '@vueuse/core';
import { u as usePointerDownOutside, a as useFocusOutside } from './utils.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const context = reactive({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
});
const _sfc_main = /* @__PURE__ */ defineComponent({
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
    const { forwardRef, currentElement: layerElement } = useForwardExpose();
    const ownerDocument = computed(
      () => layerElement.value?.ownerDocument ?? globalThis.document
    );
    const layers = computed(() => context.layersRoot);
    const index = computed(() => {
      return layerElement.value ? Array.from(layers.value).indexOf(layerElement.value) : -1;
    });
    const isBodyPointerEventsDisabled = computed(() => {
      return context.layersWithOutsidePointerEventsDisabled.size > 0;
    });
    const isPointerEventsEnabled = computed(() => {
      const localLayers = Array.from(layers.value);
      const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1);
      const highestLayerWithOutsidePointerEventsDisabledIndex = localLayers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
      return index.value >= highestLayerWithOutsidePointerEventsDisabledIndex;
    });
    const pointerDownOutside = usePointerDownOutside(async (event) => {
      const isPointerDownOnBranch = [...context.branches].some(
        (branch) => branch?.contains(event.target)
      );
      if (!isPointerEventsEnabled.value || isPointerDownOnBranch)
        return;
      emits("pointerDownOutside", event);
      emits("interactOutside", event);
      await nextTick();
      if (!event.defaultPrevented)
        emits("dismiss");
    }, layerElement);
    const focusOutside = useFocusOutside((event) => {
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
    onKeyStroke("Escape", (event) => {
      const isHighestLayer = index.value === layers.value.size - 1;
      if (!isHighestLayer)
        return;
      emits("escapeKeyDown", event);
      if (!event.defaultPrevented)
        emits("dismiss");
    });
    let originalBodyPointerEvents;
    watchEffect((cleanupFn) => {
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
    watchEffect((cleanupFn) => {
      cleanupFn(() => {
        if (!layerElement.value)
          return;
        layers.value.delete(layerElement.value);
        context.layersWithOutsidePointerEventsDisabled.delete(layerElement.value);
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        ref: unref(forwardRef),
        "as-child": _ctx.asChild,
        as: _ctx.as,
        "data-dismissable-layer": "",
        style: normalizeStyle({
          pointerEvents: isBodyPointerEventsDisabled.value ? isPointerEventsEnabled.value ? "auto" : "none" : void 0
        }),
        onFocusCapture: unref(focusOutside).onFocusCapture,
        onBlurCapture: unref(focusOutside).onBlurCapture,
        onPointerdownCapture: unref(pointerDownOutside).onPointerDownCapture
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as-child", "as", "style", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]);
    };
  }
});

export { _sfc_main as _, context as c };
//# sourceMappingURL=DismissableLayer.js.map
