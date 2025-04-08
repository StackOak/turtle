import { defineComponent, computed, onMounted, onUnmounted, createBlock, openBlock, unref, withCtx, createVNode, renderSlot, nextTick } from 'vue';
import { g as getFocusIntent, w as wrapArray, f as focusFirst } from './utils.js';
import { u as useCollection } from '../Collection/Collection.js';
import { i as injectRovingFocusGroupContext } from './RovingFocusGroup.js';
import { u as useId } from '../shared/useId.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RovingFocusItem",
  props: {
    tabStopId: {},
    focusable: { type: Boolean, default: true },
    active: { type: Boolean },
    allowShiftKey: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const props = __props;
    const context = injectRovingFocusGroupContext();
    const randomId = useId();
    const id = computed(() => props.tabStopId || randomId);
    const isCurrentTabStop = computed(
      () => context.currentTabStopId.value === id.value
    );
    const { getItems, CollectionItem } = useCollection();
    onMounted(() => {
      if (props.focusable)
        context.onFocusableItemAdd();
    });
    onUnmounted(() => {
      if (props.focusable)
        context.onFocusableItemRemove();
    });
    function handleKeydown(event) {
      if (event.key === "Tab" && event.shiftKey) {
        context.onItemShiftTab();
        return;
      }
      if (event.target !== event.currentTarget)
        return;
      const focusIntent = getFocusIntent(
        event,
        context.orientation.value,
        context.dir.value
      );
      if (focusIntent !== void 0) {
        if (event.metaKey || event.ctrlKey || event.altKey || (props.allowShiftKey ? false : event.shiftKey))
          return;
        event.preventDefault();
        let candidateNodes = [...getItems().map((i) => i.ref).filter((i) => i.dataset.disabled !== "")];
        if (focusIntent === "last") {
          candidateNodes.reverse();
        } else if (focusIntent === "prev" || focusIntent === "next") {
          if (focusIntent === "prev")
            candidateNodes.reverse();
          const currentIndex = candidateNodes.indexOf(
            event.currentTarget
          );
          candidateNodes = context.loop.value ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
        }
        nextTick(() => focusFirst(candidateNodes));
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(CollectionItem), null, {
        default: withCtx(() => [
          createVNode(unref(Primitive), {
            tabindex: isCurrentTabStop.value ? 0 : -1,
            "data-orientation": unref(context).orientation.value,
            "data-active": _ctx.active ? "" : void 0,
            "data-disabled": !_ctx.focusable ? "" : void 0,
            as: _ctx.as,
            "as-child": _ctx.asChild,
            onMousedown: _cache[0] || (_cache[0] = (event) => {
              if (!_ctx.focusable) event.preventDefault();
              else unref(context).onItemFocus(id.value);
            }),
            onFocus: _cache[1] || (_cache[1] = ($event) => unref(context).onItemFocus(id.value)),
            onKeydown: handleKeydown
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["tabindex", "data-orientation", "data-active", "data-disabled", "as", "as-child"])
        ]),
        _: 3
      });
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=RovingFocusItem.js.map
