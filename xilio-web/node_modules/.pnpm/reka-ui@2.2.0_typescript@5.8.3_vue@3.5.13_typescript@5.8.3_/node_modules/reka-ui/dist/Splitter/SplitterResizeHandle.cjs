'use strict';

const vue = require('vue');
const utils_registry = require('../utils/registry.cjs');
const utils_assert = require('../utils/assert.cjs');
const composables_useWindowSplitterBehavior = require('../composables/useWindowSplitterBehavior.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useId = require('../shared/useId.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Splitter_SplitterGroup = require('./SplitterGroup.cjs');
const shared_browser = require('../shared/browser.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "SplitterResizeHandle",
  props: {
    id: {},
    hitAreaMargins: {},
    tabindex: { default: 0 },
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["dragging"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    const { disabled } = vue.toRefs(props);
    const panelGroupContext = Splitter_SplitterGroup.injectPanelGroupContext();
    if (panelGroupContext === null) {
      throw new Error(
        "PanelResizeHandle components must be rendered within a PanelGroup container"
      );
    }
    const {
      direction,
      groupId,
      registerResizeHandle: registerResizeHandleWithParentGroup,
      startDragging,
      stopDragging,
      panelGroupElement
    } = panelGroupContext;
    const resizeHandleId = shared_useId.useId(props.id, "reka-splitter-resize-handle");
    const state = vue.ref("inactive");
    const isFocused = vue.ref(false);
    const resizeHandler = vue.ref(null);
    vue.watch(disabled, () => {
      if (!shared_browser.isBrowser)
        return;
      if (disabled.value)
        resizeHandler.value = null;
      else
        resizeHandler.value = registerResizeHandleWithParentGroup(resizeHandleId);
    }, { immediate: true });
    vue.watchEffect((onCleanup) => {
      if (disabled.value || resizeHandler.value === null)
        return;
      const element = currentElement.value;
      if (!element)
        return;
      utils_assert.assert(element);
      const setResizeHandlerState = (action, isActive, event) => {
        if (isActive) {
          switch (action) {
            case "down": {
              state.value = "drag";
              startDragging(resizeHandleId, event);
              emits("dragging", true);
              break;
            }
            case "move": {
              if (state.value !== "drag")
                state.value = "hover";
              resizeHandler.value?.(event);
              break;
            }
            case "up": {
              state.value = "hover";
              stopDragging();
              emits("dragging", false);
              break;
            }
          }
        } else {
          state.value = "inactive";
        }
      };
      onCleanup(utils_registry.registerResizeHandle(
        resizeHandleId,
        element,
        direction,
        {
          // Coarse inputs (e.g. finger/touch)
          coarse: props.hitAreaMargins?.coarse ?? 15,
          // Fine inputs (e.g. mouse)
          fine: props.hitAreaMargins?.fine ?? 5
        },
        setResizeHandlerState
      ));
    });
    composables_useWindowSplitterBehavior.useWindowSplitterResizeHandlerBehavior({
      disabled,
      resizeHandler,
      handleId: resizeHandleId,
      panelGroupElement
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        id: vue.unref(resizeHandleId),
        ref: vue.unref(forwardRef),
        style: {
          touchAction: "none",
          userSelect: "none"
        },
        as: _ctx.as,
        "as-child": _ctx.asChild,
        role: "separator",
        "data-resize-handle": "",
        tabindex: _ctx.tabindex,
        "data-state": state.value,
        "data-disabled": vue.unref(disabled) ? "" : void 0,
        "data-orientation": vue.unref(direction),
        "data-panel-group-id": vue.unref(groupId),
        "data-resize-handle-active": state.value === "drag" ? "pointer" : isFocused.value ? "keyboard" : void 0,
        "data-resize-handle-state": state.value,
        "data-panel-resize-handle-enabled": !vue.unref(disabled),
        "data-panel-resize-handle-id": vue.unref(resizeHandleId),
        onBlur: _cache[0] || (_cache[0] = ($event) => isFocused.value = false),
        onFocus: _cache[1] || (_cache[1] = ($event) => isFocused.value = false)
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["id", "as", "as-child", "tabindex", "data-state", "data-disabled", "data-orientation", "data-panel-group-id", "data-resize-handle-active", "data-resize-handle-state", "data-panel-resize-handle-enabled", "data-panel-resize-handle-id"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=SplitterResizeHandle.cjs.map
