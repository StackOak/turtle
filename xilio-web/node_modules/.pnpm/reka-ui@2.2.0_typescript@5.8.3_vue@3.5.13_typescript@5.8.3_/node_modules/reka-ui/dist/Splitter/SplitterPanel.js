import { defineComponent, computed, watch, onMounted, onUnmounted, createBlock, openBlock, unref, normalizeStyle, withCtx, renderSlot } from 'vue';
import { P as PRECISION } from '../utils/constants.js';
import { i as injectPanelGroupContext } from './SplitterGroup.js';
import { u as useId } from '../shared/useId.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SplitterPanel",
  props: {
    collapsedSize: {},
    collapsible: { type: Boolean },
    defaultSize: {},
    id: {},
    maxSize: {},
    minSize: {},
    order: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["collapse", "expand", "resize"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const panelGroupContext = injectPanelGroupContext();
    if (panelGroupContext === null) {
      throw new Error(
        "SplitterPanel components must be rendered within a SplitterGroup container"
      );
    }
    const { collapsePanel, expandPanel, getPanelSize, getPanelStyle, isPanelCollapsed, resizePanel, groupId, reevaluatePanelConstraints, registerPanel, unregisterPanel } = panelGroupContext;
    const panelId = useId(props.id, "reka-splitter-panel");
    const panelDataRef = computed(() => ({
      callbacks: {
        onCollapse: () => emits("collapse"),
        onExpand: () => emits("expand"),
        onResize: (...args) => emits("resize", ...args)
      },
      constraints: {
        collapsedSize: props.collapsedSize && Number.parseFloat(props.collapsedSize.toFixed(PRECISION)),
        collapsible: props.collapsible,
        defaultSize: props.defaultSize,
        /** Panel id (unique within group); falls back to useId when not provided */
        /** Panel id (unique within group); falls back to useId when not provided */
        maxSize: props.maxSize,
        minSize: props.minSize
      },
      id: panelId,
      idIsFromProps: props.id !== void 0,
      order: props.order
    }));
    watch(() => panelDataRef.value.constraints, (constraints, prevConstraints) => {
      if (prevConstraints.collapsedSize !== constraints.collapsedSize || prevConstraints.collapsible !== constraints.collapsible || prevConstraints.maxSize !== constraints.maxSize || prevConstraints.minSize !== constraints.minSize) {
        reevaluatePanelConstraints(panelDataRef.value, prevConstraints);
      }
    }, { deep: true });
    onMounted(() => {
      const panelData = panelDataRef.value;
      registerPanel(panelData);
      onUnmounted(() => {
        unregisterPanel(panelData);
      });
    });
    const style = computed(() => getPanelStyle(panelDataRef.value, props.defaultSize));
    const isCollapsed = computed(() => isPanelCollapsed(panelDataRef.value));
    const isExpanded = computed(() => !isCollapsed.value);
    __expose({
      /** If panel is `collapsible`, collapse it fully. */
      collapse: () => {
        collapsePanel(panelDataRef.value);
      },
      /** If panel is currently collapsed, expand it to its most recent size. */
      expand: () => {
        expandPanel(panelDataRef.value);
      },
      /** Gets the current size of the panel as a percentage (1 - 100). */
      getSize() {
        return getPanelSize(panelDataRef.value);
      },
      /** Resize panel to the specified percentage (1 - 100). */
      resize: (size) => {
        resizePanel(panelDataRef.value, size);
      },
      /** Returns `true` if the panel is currently collapsed */
      isCollapsed,
      /** Returns `true` if the panel is currently not collapsed */
      isExpanded
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        id: unref(panelId),
        style: normalizeStyle(style.value),
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "data-panel": "",
        "data-panel-collapsible": _ctx.collapsible || void 0,
        "data-panel-group-id": unref(groupId),
        "data-panel-id": unref(panelId),
        "data-panel-size": Number.parseFloat(`${style.value.flexGrow}`).toFixed(1),
        "data-state": _ctx.collapsible ? isCollapsed.value ? "collapsed" : "expanded" : void 0
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {
            isCollapsed: isCollapsed.value,
            isExpanded: isExpanded.value
          })
        ]),
        _: 3
      }, 8, ["id", "style", "as", "as-child", "data-panel-collapsible", "data-panel-group-id", "data-panel-id", "data-panel-size", "data-state"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=SplitterPanel.js.map
