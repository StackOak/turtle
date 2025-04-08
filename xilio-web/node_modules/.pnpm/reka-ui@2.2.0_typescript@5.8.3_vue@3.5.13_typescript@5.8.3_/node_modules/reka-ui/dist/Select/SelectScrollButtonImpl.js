import { defineComponent, ref, watchEffect, onBeforeUnmount, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { u as useCollection } from '../Collection/Collection.js';
import { g as getActiveElement } from '../shared/getActiveElement.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectSelectContentContext } from './SelectContentImpl.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SelectScrollButtonImpl",
  emits: ["autoScroll"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const { getItems } = useCollection();
    const contentContext = injectSelectContentContext();
    const autoScrollTimerRef = ref(null);
    function clearAutoScrollTimer() {
      if (autoScrollTimerRef.value !== null) {
        window.clearInterval(autoScrollTimerRef.value);
        autoScrollTimerRef.value = null;
      }
    }
    watchEffect(() => {
      const activeItem = getItems().map((i) => i.ref).find(
        (item) => item === getActiveElement()
      );
      activeItem?.scrollIntoView({ block: "nearest" });
    });
    function handlePointerDown() {
      if (autoScrollTimerRef.value === null) {
        autoScrollTimerRef.value = window.setInterval(() => {
          emits("autoScroll");
        }, 50);
      }
    }
    function handlePointerMove() {
      contentContext.onItemLeave?.();
      if (autoScrollTimerRef.value === null) {
        autoScrollTimerRef.value = window.setInterval(() => {
          emits("autoScroll");
        }, 50);
      }
    }
    onBeforeUnmount(() => clearAutoScrollTimer());
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps({
        "aria-hidden": "true",
        style: {
          flexShrink: 0
        }
      }, _ctx.$parent?.$props, {
        onPointerdown: handlePointerDown,
        onPointermove: handlePointerMove,
        onPointerleave: _cache[0] || (_cache[0] = () => {
          clearAutoScrollTimer();
        })
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=SelectScrollButtonImpl.js.map
