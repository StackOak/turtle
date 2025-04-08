'use strict';

const vue = require('vue');
const RovingFocus_utils = require('./utils.cjs');
const Collection_Collection = require('../Collection/Collection.cjs');
const RovingFocus_RovingFocusGroup = require('./RovingFocusGroup.cjs');
const shared_useId = require('../shared/useId.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const context = RovingFocus_RovingFocusGroup.injectRovingFocusGroupContext();
    const randomId = shared_useId.useId();
    const id = vue.computed(() => props.tabStopId || randomId);
    const isCurrentTabStop = vue.computed(
      () => context.currentTabStopId.value === id.value
    );
    const { getItems, CollectionItem } = Collection_Collection.useCollection();
    vue.onMounted(() => {
      if (props.focusable)
        context.onFocusableItemAdd();
    });
    vue.onUnmounted(() => {
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
      const focusIntent = RovingFocus_utils.getFocusIntent(
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
          candidateNodes = context.loop.value ? RovingFocus_utils.wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
        }
        vue.nextTick(() => RovingFocus_utils.focusFirst(candidateNodes));
      }
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(CollectionItem), null, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), {
            tabindex: isCurrentTabStop.value ? 0 : -1,
            "data-orientation": vue.unref(context).orientation.value,
            "data-active": _ctx.active ? "" : void 0,
            "data-disabled": !_ctx.focusable ? "" : void 0,
            as: _ctx.as,
            "as-child": _ctx.asChild,
            onMousedown: _cache[0] || (_cache[0] = (event) => {
              if (!_ctx.focusable) event.preventDefault();
              else vue.unref(context).onItemFocus(id.value);
            }),
            onFocus: _cache[1] || (_cache[1] = ($event) => vue.unref(context).onItemFocus(id.value)),
            onKeydown: handleKeydown
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["tabindex", "data-orientation", "data-active", "data-disabled", "as", "as-child"])
        ]),
        _: 3
      });
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=RovingFocusItem.cjs.map
