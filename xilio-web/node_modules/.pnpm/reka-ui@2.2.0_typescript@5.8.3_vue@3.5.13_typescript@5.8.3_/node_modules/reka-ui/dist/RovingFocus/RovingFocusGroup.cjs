'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const RovingFocus_utils = require('./utils.cjs');
const Collection_Collection = require('../Collection/Collection.cjs');
const shared_useDirection = require('../shared/useDirection.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const [injectRovingFocusGroupContext, provideRovingFocusGroupContext] = shared_createContext.createContext("RovingFocusGroup");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const { loop, orientation, dir: propDir } = vue.toRefs(props);
    const dir = shared_useDirection.useDirection(propDir);
    const currentTabStopId = core.useVModel(props, "currentTabStopId", emits, {
      defaultValue: props.defaultCurrentTabStopId,
      passive: props.currentTabStopId === void 0
    });
    const isTabbingBackOut = vue.ref(false);
    const isClickFocus = vue.ref(false);
    const focusableItemsCount = vue.ref(0);
    const { getItems, CollectionSlot } = Collection_Collection.useCollection({ isProvider: true });
    function handleFocus(event) {
      const isKeyboardFocus = !isClickFocus.value;
      if (event.currentTarget && event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut.value) {
        const entryFocusEvent = new CustomEvent(RovingFocus_utils.ENTRY_FOCUS, RovingFocus_utils.EVENT_OPTIONS);
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
          RovingFocus_utils.focusFirst(candidateItems, props.preventScrollOnEntryFocus);
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
      return vue.openBlock(), vue.createBlock(vue.unref(CollectionSlot), null, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), {
            tabindex: isTabbingBackOut.value || focusableItemsCount.value === 0 ? -1 : 0,
            "data-orientation": vue.unref(orientation),
            as: _ctx.as,
            "as-child": _ctx.asChild,
            dir: vue.unref(dir),
            style: { "outline": "none" },
            onMousedown: _cache[0] || (_cache[0] = ($event) => isClickFocus.value = true),
            onMouseup: handleMouseUp,
            onFocus: handleFocus,
            onBlur: _cache[1] || (_cache[1] = ($event) => isTabbingBackOut.value = false)
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["tabindex", "data-orientation", "as", "as-child", "dir"])
        ]),
        _: 3
      });
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectRovingFocusGroupContext = injectRovingFocusGroupContext;
//# sourceMappingURL=RovingFocusGroup.cjs.map
