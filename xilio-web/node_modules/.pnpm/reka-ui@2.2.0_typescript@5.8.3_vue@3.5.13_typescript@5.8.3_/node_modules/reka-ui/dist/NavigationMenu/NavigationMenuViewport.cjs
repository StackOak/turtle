'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const NavigationMenu_utils = require('./utils.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Presence_Presence = require('../Presence/Presence.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const NavigationMenu_NavigationMenuRoot = require('./NavigationMenuRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "NavigationMenuViewport",
  props: {
    forceMount: { type: Boolean },
    align: { default: "center" },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    const menuContext = NavigationMenu_NavigationMenuRoot.injectNavigationMenuContext();
    const { activeTrigger, rootNavigationMenu, modelValue } = menuContext;
    const size = vue.ref();
    const position = vue.ref();
    const open = vue.computed(() => !!menuContext.modelValue.value);
    vue.watch(currentElement, () => {
      menuContext.onViewportChange(currentElement.value);
    });
    const content = vue.ref();
    vue.watch([modelValue, open], () => {
      if (!currentElement.value)
        return;
      requestAnimationFrame(() => {
        const el = currentElement.value?.querySelector("[data-state=open]");
        content.value = el;
      });
    }, { immediate: true, flush: "post" });
    function updatePosition() {
      if (content.value && activeTrigger.value && rootNavigationMenu.value) {
        const bodyWidth = document.documentElement.offsetWidth;
        const bodyHeight = document.documentElement.offsetHeight;
        const rootRect = rootNavigationMenu.value.getBoundingClientRect();
        const rect = activeTrigger.value.getBoundingClientRect();
        const { offsetWidth, offsetHeight } = content.value;
        const startPositionLeft = rect.left - rootRect.left;
        const startPositionTop = rect.top - rootRect.top;
        let posLeft = null;
        let posTop = null;
        switch (props.align) {
          case "start":
            posLeft = startPositionLeft;
            posTop = startPositionTop;
            break;
          case "end":
            posLeft = startPositionLeft - offsetWidth + rect.width;
            posTop = startPositionTop - offsetHeight + rect.height;
            break;
          default:
            posLeft = startPositionLeft - offsetWidth / 2 + rect.width / 2;
            posTop = startPositionTop - offsetHeight / 2 + rect.height / 2;
        }
        const screenOffset = 10;
        if (posLeft + rootRect.left < screenOffset) {
          posLeft = screenOffset - rootRect.left;
        }
        const rightOffset = posLeft + rootRect.left + offsetWidth;
        if (rightOffset > bodyWidth - screenOffset) {
          posLeft -= rightOffset - bodyWidth + screenOffset;
          if (posLeft < screenOffset - rootRect.left) {
            posLeft = screenOffset - rootRect.left;
          }
        }
        if (posTop + rootRect.top < screenOffset) {
          posTop = screenOffset - rootRect.top;
        }
        const bottomOffset = posTop + rootRect.top + offsetHeight;
        if (bottomOffset > bodyHeight - screenOffset) {
          posTop -= bottomOffset - bodyHeight + screenOffset;
          if (posTop < screenOffset - rootRect.top) {
            posTop = screenOffset - rootRect.top;
          }
        }
        posLeft = Math.round(posLeft);
        posTop = Math.round(posTop);
        position.value = {
          left: posLeft,
          top: posTop
        };
      }
    }
    core.useResizeObserver(content, () => {
      if (content.value) {
        size.value = {
          width: content.value.offsetWidth,
          height: content.value.offsetHeight
        };
        updatePosition();
      }
    });
    core.useResizeObserver([globalThis.document?.body, rootNavigationMenu], () => {
      updatePosition();
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Presence_Presence.Presence), {
        present: _ctx.forceMount || open.value,
        "force-mount": !vue.unref(menuContext).unmountOnHide.value,
        onAfterLeave: _cache[2] || (_cache[2] = () => {
          size.value = void 0;
          position.value = void 0;
        })
      }, {
        default: vue.withCtx(({ present }) => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(_ctx.$attrs, {
            ref: vue.unref(forwardRef),
            as: _ctx.as,
            "as-child": _ctx.asChild,
            "data-state": vue.unref(NavigationMenu_utils.getOpenState)(open.value),
            "data-orientation": vue.unref(menuContext).orientation,
            style: {
              // Prevent interaction when animating out
              pointerEvents: !open.value && vue.unref(menuContext).isRootMenu ? "none" : void 0,
              ["--reka-navigation-menu-viewport-width"]: size.value ? `${size.value?.width}px` : void 0,
              ["--reka-navigation-menu-viewport-height"]: size.value ? `${size.value?.height}px` : void 0,
              ["--reka-navigation-menu-viewport-left"]: position.value ? `${position.value?.left}px` : void 0,
              ["--reka-navigation-menu-viewport-top"]: position.value ? `${position.value?.top}px` : void 0
            },
            hidden: !present,
            onPointerenter: _cache[0] || (_cache[0] = ($event) => vue.unref(menuContext).onContentEnter(vue.unref(menuContext).modelValue.value)),
            onPointerleave: _cache[1] || (_cache[1] = ($event) => vue.unref(NavigationMenu_utils.whenMouse)(() => vue.unref(menuContext).onContentLeave())($event))
          }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 2
          }, 1040, ["as", "as-child", "data-state", "data-orientation", "style", "hidden"])
        ]),
        _: 3
      }, 8, ["present", "force-mount"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=NavigationMenuViewport.cjs.map
