import { defineComponent, toRefs, ref, createBlock, openBlock, unref, withCtx, createVNode, renderSlot } from 'vue';
import { useVModel } from '@vueuse/core';
import { f as focusFirst, E as ENTRY_FOCUS, a as EVENT_OPTIONS } from './utils.js';
import { u as useCollection } from '../Collection/Collection.js';
import { u as useDirection } from '../shared/useDirection.js';
import { c as createContext } from '../shared/createContext.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const [injectRovingFocusGroupContext, provideRovingFocusGroupContext] = createContext("RovingFocusGroup");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RovingFocusGroup",
  props: {
    orientation: { default: void 0 },
    dir: {},
    loop: { type: Boolean, default: false },
    currentTabStopId: {},
    defaultCurrentTabStopId: {},
    preventScrollOnEntryFocus: { type: Boolean, default: false },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["entryFocus", "update:currentTabStopId"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { loop, orientation, dir: propDir } = toRefs(props);
    const dir = useDirection(propDir);
    const currentTabStopId = useVModel(props, "currentTabStopId", emits, {
      defaultValue: props.defaultCurrentTabStopId,
      passive: props.currentTabStopId === void 0
    });
    const isTabbingBackOut = ref(false);
    const isClickFocus = ref(false);
    const focusableItemsCount = ref(0);
    const { getItems, CollectionSlot } = useCollection({ isProvider: true });
    function handleFocus(event) {
      const isKeyboardFocus = !isClickFocus.value;
      if (event.currentTarget && event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut.value) {
        const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
        event.currentTarget.dispatchEvent(entryFocusEvent);
        emits("entryFocus", entryFocusEvent);
        if (!entryFocusEvent.defaultPrevented) {
          const items = getItems().map((i) => i.ref).filter((i) => i.dataset.disabled !== "");
          const activeItem = items.find((item) => item.getAttribute("data-active") === "");
          const currentItem = items.find(
            (item) => item.id === currentTabStopId.value
          );
          const candidateItems = [activeItem, currentItem, ...items].filter(
            Boolean
          );
          focusFirst(candidateItems, props.preventScrollOnEntryFocus);
        }
      }
      isClickFocus.value = false;
    }
    function handleMouseUp() {
      setTimeout(() => {
        isClickFocus.value = false;
      }, 1);
    }
    __expose({
      getItems
    });
    provideRovingFocusGroupContext({
      loop,
      dir,
      orientation,
      currentTabStopId,
      onItemFocus: (tabStopId) => {
        currentTabStopId.value = tabStopId;
      },
      onItemShiftTab: () => {
        isTabbingBackOut.value = true;
      },
      onFocusableItemAdd: () => {
        focusableItemsCount.value++;
      },
      onFocusableItemRemove: () => {
        focusableItemsCount.value--;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(CollectionSlot), null, {
        default: withCtx(() => [
          createVNode(unref(Primitive), {
            tabindex: isTabbingBackOut.value || focusableItemsCount.value === 0 ? -1 : 0,
            "data-orientation": unref(orientation),
            as: _ctx.as,
            "as-child": _ctx.asChild,
            dir: unref(dir),
            style: { "outline": "none" },
            onMousedown: _cache[0] || (_cache[0] = ($event) => isClickFocus.value = true),
            onMouseup: handleMouseUp,
            onFocus: handleFocus,
            onBlur: _cache[1] || (_cache[1] = ($event) => isTabbingBackOut.value = false)
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["tabindex", "data-orientation", "as", "as-child", "dir"])
        ]),
        _: 3
      });
    };
  }
});

export { _sfc_main as _, injectRovingFocusGroupContext as i };
//# sourceMappingURL=RovingFocusGroup.js.map
