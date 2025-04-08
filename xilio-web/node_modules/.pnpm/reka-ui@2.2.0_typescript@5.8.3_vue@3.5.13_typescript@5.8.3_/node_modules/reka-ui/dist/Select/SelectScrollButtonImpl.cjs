'use strict';

const vue = require('vue');
const Collection_Collection = require('../Collection/Collection.cjs');
const shared_getActiveElement = require('../shared/getActiveElement.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Select_SelectContentImpl = require('./SelectContentImpl.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "SelectScrollButtonImpl",
  emits: ["autoScroll"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const { getItems } = Collection_Collection.useCollection();
    const contentContext = Select_SelectContentImpl.injectSelectContentContext();
    const autoScrollTimerRef = vue.ref(null);
    function clearAutoScrollTimer() {
      if (autoScrollTimerRef.value !== null) {
        window.clearInterval(autoScrollTimerRef.value);
        autoScrollTimerRef.value = null;
      }
    }
    vue.watchEffect(() => {
      const activeItem = getItems().map((i) => i.ref).find(
        (item) => item === shared_getActiveElement.getActiveElement()
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
    vue.onBeforeUnmount(() => clearAutoScrollTimer());
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({
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
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=SelectScrollButtonImpl.cjs.map
