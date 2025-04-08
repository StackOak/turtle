import { defineComponent, toRefs, ref, watch, watchEffect, createBlock, openBlock, unref, withCtx, renderSlot } from 'vue';
import { d as registerResizeHandle } from '../utils/registry.js';
import { a as assert } from '../utils/assert.js';
import { u as useWindowSplitterResizeHandlerBehavior } from '../composables/useWindowSplitterBehavior.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { u as useId } from '../shared/useId.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectPanelGroupContext } from './SplitterGroup.js';
import { i as isBrowser } from '../shared/browser.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
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
    const { forwardRef, currentElement } = useForwardExpose();
    const { disabled } = toRefs(props);
    const panelGroupContext = injectPanelGroupContext();
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
    const resizeHandleId = useId(props.id, "reka-splitter-resize-handle");
    const state = ref("inactive");
    const isFocused = ref(false);
    const resizeHandler = ref(null);
    watch(disabled, () => {
      if (!isBrowser)
        return;
      if (disabled.value)
        resizeHandler.value = null;
      else
        resizeHandler.value = registerResizeHandleWithParentGroup(resizeHandleId);
    }, { immediate: true });
    watchEffect((onCleanup) => {
      if (disabled.value || resizeHandler.value === null)
        return;
      const element = currentElement.value;
      if (!element)
        return;
      assert(element);
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
      onCleanup(registerResizeHandle(
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
    useWindowSplitterResizeHandlerBehavior({
      disabled,
      resizeHandler,
      handleId: resizeHandleId,
      panelGroupElement
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        id: unref(resizeHandleId),
        ref: unref(forwardRef),
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
        "data-disabled": unref(disabled) ? "" : void 0,
        "data-orientation": unref(direction),
        "data-panel-group-id": unref(groupId),
        "data-resize-handle-active": state.value === "drag" ? "pointer" : isFocused.value ? "keyboard" : void 0,
        "data-resize-handle-state": state.value,
        "data-panel-resize-handle-enabled": !unref(disabled),
        "data-panel-resize-handle-id": unref(resizeHandleId),
        onBlur: _cache[0] || (_cache[0] = ($event) => isFocused.value = false),
        onFocus: _cache[1] || (_cache[1] = ($event) => isFocused.value = false)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["id", "as", "as-child", "tabindex", "data-state", "data-disabled", "data-orientation", "data-panel-group-id", "data-resize-handle-active", "data-resize-handle-state", "data-panel-resize-handle-enabled", "data-panel-resize-handle-id"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=SplitterResizeHandle.js.map
