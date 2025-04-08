'use strict';

const vue = require('vue');
const Menu_MenuItemImpl = require('./MenuItemImpl.cjs');
const Menu_utils = require('./utils.cjs');
const Menu_MenuAnchor = require('./MenuAnchor.cjs');
const shared_useId = require('../shared/useId.cjs');
const Menu_MenuRoot = require('./MenuRoot.cjs');
const Menu_MenuSub = require('./MenuSub.cjs');
const Menu_MenuContentImpl = require('./MenuContentImpl.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "MenuSubTrigger",
  props: {
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const menuContext = Menu_MenuRoot.injectMenuContext();
    const rootContext = Menu_MenuRoot.injectMenuRootContext();
    const subContext = Menu_MenuSub.injectMenuSubContext();
    const contentContext = Menu_MenuContentImpl.injectMenuContentContext();
    const openTimerRef = vue.ref(null);
    subContext.triggerId ||= shared_useId.useId(void 0, "reka-menu-sub-trigger");
    function clearOpenTimer() {
      if (openTimerRef.value)
        window.clearTimeout(openTimerRef.value);
      openTimerRef.value = null;
    }
    vue.onUnmounted(() => {
      clearOpenTimer();
    });
    function handlePointerMove(event) {
      if (!Menu_utils.isMouseEvent(event))
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
      if (!Menu_utils.isMouseEvent(event))
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
      if (Menu_utils.SUB_OPEN_KEYS[rootContext.dir.value].includes(event.key)) {
        menuContext.onOpenChange(true);
        await vue.nextTick();
        menuContext.content.value?.focus();
        event.preventDefault();
      }
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(Menu_MenuAnchor._sfc_main, { "as-child": "" }, {
        default: vue.withCtx(() => [
          vue.createVNode(Menu_MenuItemImpl._sfc_main, vue.mergeProps(props, {
            id: vue.unref(subContext).triggerId,
            ref: (vnode) => {
              vue.unref(subContext)?.onTriggerChange(vnode?.$el);
              return void 0;
            },
            "aria-haspopup": "menu",
            "aria-expanded": vue.unref(menuContext).open.value,
            "aria-controls": vue.unref(subContext).contentId,
            "data-state": vue.unref(Menu_utils.getOpenState)(vue.unref(menuContext).open.value),
            onClick: _cache[0] || (_cache[0] = async (event) => {
              if (props.disabled || event.defaultPrevented) return;
              event.currentTarget.focus();
              if (!vue.unref(menuContext).open.value) vue.unref(menuContext).onOpenChange(true);
            }),
            onPointermove: handlePointerMove,
            onPointerleave: handlePointerLeave,
            onKeydown: handleKeyDown
          }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["id", "aria-expanded", "aria-controls", "data-state"])
        ]),
        _: 3
      });
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=MenuSubTrigger.cjs.map
