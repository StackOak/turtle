'use strict';

const vue = require('vue');
const ContextMenu_utils = require('./utils.cjs');
const Menu_MenuAnchor = require('../Menu/MenuAnchor.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const ContextMenu_ContextMenuRoot = require('./ContextMenuRoot.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "ContextMenuTrigger",
  props: {
    disabled: { type: Boolean, default: false },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const props = __props;
    const { disabled } = vue.toRefs(props);
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    const rootContext = ContextMenu_ContextMenuRoot.injectContextMenuRootContext();
    const point = vue.ref({ x: 0, y: 0 });
    const virtualEl = vue.computed(() => ({
      getBoundingClientRect: () => ({
        width: 0,
        height: 0,
        left: point.value.x,
        right: point.value.x,
        top: point.value.y,
        bottom: point.value.y,
        ...point.value
      })
    }));
    const longPressTimer = vue.ref(0);
    function clearLongPress() {
      window.clearTimeout(longPressTimer.value);
    }
    function handleOpen(event) {
      point.value = { x: event.clientX, y: event.clientY };
      rootContext.onOpenChange(true);
    }
    async function handleContextMenu(event) {
      if (!disabled.value) {
        await vue.nextTick();
        if (!event.defaultPrevented) {
          clearLongPress();
          handleOpen(event);
          event.preventDefault();
        }
      }
    }
    async function handlePointerDown(event) {
      if (!disabled.value) {
        await vue.nextTick();
        if (ContextMenu_utils.isTouchOrPen(event) && !event.defaultPrevented) {
          clearLongPress();
          longPressTimer.value = window.setTimeout(() => handleOpen(event), 700);
        }
      }
    }
    async function handlePointerEvent(event) {
      if (!disabled.value) {
        await vue.nextTick();
        if (ContextMenu_utils.isTouchOrPen(event) && !event.defaultPrevented)
          clearLongPress();
      }
    }
    vue.onMounted(() => {
      if (currentElement.value) {
        rootContext.triggerElement.value = currentElement.value;
      }
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
        vue.createVNode(vue.unref(Menu_MenuAnchor._sfc_main), {
          as: "template",
          reference: virtualEl.value
        }, null, 8, ["reference"]),
        vue.createVNode(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({
          ref: vue.unref(forwardRef),
          as: _ctx.as,
          "as-child": _ctx.asChild,
          "data-state": vue.unref(rootContext).open.value ? "open" : "closed",
          "data-disabled": vue.unref(disabled) ? "" : void 0,
          style: {
            WebkitTouchCallout: "none",
            pointerEvents: "auto"
          }
        }, _ctx.$attrs, {
          onContextmenu: handleContextMenu,
          onPointerdown: handlePointerDown,
          onPointermove: handlePointerEvent,
          onPointercancel: handlePointerEvent,
          onPointerup: handlePointerEvent
        }), {
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 16, ["as", "as-child", "data-state", "data-disabled"])
      ], 64);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ContextMenuTrigger.cjs.map
