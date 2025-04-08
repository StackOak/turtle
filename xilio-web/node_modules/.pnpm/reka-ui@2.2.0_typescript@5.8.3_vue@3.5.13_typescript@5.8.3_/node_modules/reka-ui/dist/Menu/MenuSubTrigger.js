import { defineComponent, ref, onUnmounted, createBlock, openBlock, withCtx, createVNode, mergeProps, unref, renderSlot, nextTick } from 'vue';
import { _ as _sfc_main$2 } from './MenuItemImpl.js';
import { g as getOpenState, c as isMouseEvent, e as SUB_OPEN_KEYS } from './utils.js';
import { _ as _sfc_main$1 } from './MenuAnchor.js';
import { u as useId } from '../shared/useId.js';
import { i as injectMenuContext, a as injectMenuRootContext } from './MenuRoot.js';
import { i as injectMenuSubContext } from './MenuSub.js';
import { i as injectMenuContentContext } from './MenuContentImpl.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MenuSubTrigger",
  props: {
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const menuContext = injectMenuContext();
    const rootContext = injectMenuRootContext();
    const subContext = injectMenuSubContext();
    const contentContext = injectMenuContentContext();
    const openTimerRef = ref(null);
    subContext.triggerId ||= useId(void 0, "reka-menu-sub-trigger");
    function clearOpenTimer() {
      if (openTimerRef.value)
        window.clearTimeout(openTimerRef.value);
      openTimerRef.value = null;
    }
    onUnmounted(() => {
      clearOpenTimer();
    });
    function handlePointerMove(event) {
      if (!isMouseEvent(event))
        return;
      const defaultPrevented = contentContext.onItemEnter(event);
      if (defaultPrevented)
        return;
      if (!props.disabled && !menuContext.open.value && !openTimerRef.value) {
        contentContext.onPointerGraceIntentChange(null);
        openTimerRef.value = window.setTimeout(() => {
          menuContext.onOpenChange(true);
          clearOpenTimer();
        }, 100);
      }
    }
    async function handlePointerLeave(event) {
      if (!isMouseEvent(event))
        return;
      clearOpenTimer();
      const contentRect = menuContext.content.value?.getBoundingClientRect();
      if (contentRect?.width) {
        const side = menuContext.content.value?.dataset.side;
        const rightSide = side === "right";
        const bleed = rightSide ? -5 : 5;
        const contentNearEdge = contentRect[rightSide ? "left" : "right"];
        const contentFarEdge = contentRect[rightSide ? "right" : "left"];
        contentContext.onPointerGraceIntentChange({
          area: [
            // Apply a bleed on clientX to ensure that our exit point is
            // consistently within polygon bounds
            { x: event.clientX + bleed, y: event.clientY },
            { x: contentNearEdge, y: contentRect.top },
            { x: contentFarEdge, y: contentRect.top },
            { x: contentFarEdge, y: contentRect.bottom },
            { x: contentNearEdge, y: contentRect.bottom }
          ],
          side
        });
        window.clearTimeout(contentContext.pointerGraceTimerRef.value);
        contentContext.pointerGraceTimerRef.value = window.setTimeout(
          () => contentContext.onPointerGraceIntentChange(null),
          300
        );
      } else {
        const defaultPrevented = contentContext.onTriggerLeave(event);
        if (defaultPrevented)
          return;
        contentContext.onPointerGraceIntentChange(null);
      }
    }
    async function handleKeyDown(event) {
      const isTypingAhead = contentContext.searchRef.value !== "";
      if (props.disabled || isTypingAhead && event.key === " ")
        return;
      if (SUB_OPEN_KEYS[rootContext.dir.value].includes(event.key)) {
        menuContext.onOpenChange(true);
        await nextTick();
        menuContext.content.value?.focus();
        event.preventDefault();
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, { "as-child": "" }, {
        default: withCtx(() => [
          createVNode(_sfc_main$2, mergeProps(props, {
            id: unref(subContext).triggerId,
            ref: (vnode) => {
              unref(subContext)?.onTriggerChange(vnode?.$el);
              return void 0;
            },
            "aria-haspopup": "menu",
            "aria-expanded": unref(menuContext).open.value,
            "aria-controls": unref(subContext).contentId,
            "data-state": unref(getOpenState)(unref(menuContext).open.value),
            onClick: _cache[0] || (_cache[0] = async (event) => {
              if (props.disabled || event.defaultPrevented) return;
              event.currentTarget.focus();
              if (!unref(menuContext).open.value) unref(menuContext).onOpenChange(true);
            }),
            onPointermove: handlePointerMove,
            onPointerleave: handlePointerLeave,
            onKeydown: handleKeyDown
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["id", "aria-expanded", "aria-controls", "data-state"])
        ]),
        _: 3
      });
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=MenuSubTrigger.js.map
