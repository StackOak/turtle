'use strict';

const vue = require('vue');
const utils_constants = require('../utils/constants.cjs');
const Splitter_SplitterGroup = require('./SplitterGroup.cjs');
const shared_useId = require('../shared/useId.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const panelGroupContext = Splitter_SplitterGroup.injectPanelGroupContext();
    if (panelGroupContext === null) {
      throw new Error(
        "SplitterPanel components must be rendered within a SplitterGroup container"
      );
    }
    const { collapsePanel, expandPanel, getPanelSize, getPanelStyle, isPanelCollapsed, resizePanel, groupId, reevaluatePanelConstraints, registerPanel, unregisterPanel } = panelGroupContext;
    const panelId = shared_useId.useId(props.id, "reka-splitter-panel");
    const panelDataRef = vue.computed(() => ({
      callbacks: {
        onCollapse: () => emits("collapse"),
        onExpand: () => emits("expand"),
        onResize: (...args) => emits("resize", ...args)
      },
      constraints: {
        collapsedSize: props.collapsedSize && Number.parseFloat(props.collapsedSize.toFixed(utils_constants.PRECISION)),
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
    vue.watch(() => panelDataRef.value.constraints, (constraints, prevConstraints) => {
      if (prevConstraints.collapsedSize !== constraints.collapsedSize || prevConstraints.collapsible !== constraints.collapsible || prevConstraints.maxSize !== constraints.maxSize || prevConstraints.minSize !== constraints.minSize) {
        reevaluatePanelConstraints(panelDataRef.value, prevConstraints);
      }
    }, { deep: true });
    vue.onMounted(() => {
      const panelData = panelDataRef.value;
      registerPanel(panelData);
      vue.onUnmounted(() => {
        unregisterPanel(panelData);
      });
    });
    const style = vue.computed(() => getPanelStyle(panelDataRef.value, props.defaultSize));
    const isCollapsed = vue.computed(() => isPanelCollapsed(panelDataRef.value));
    const isExpanded = vue.computed(() => !isCollapsed.value);
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
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        id: vue.unref(panelId),
        style: vue.normalizeStyle(style.value),
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "data-panel": "",
        "data-panel-collapsible": _ctx.collapsible || void 0,
        "data-panel-group-id": vue.unref(groupId),
        "data-panel-id": vue.unref(panelId),
        "data-panel-size": Number.parseFloat(`${style.value.flexGrow}`).toFixed(1),
        "data-state": _ctx.collapsible ? isCollapsed.value ? "collapsed" : "expanded" : void 0
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {
            isCollapsed: isCollapsed.value,
            isExpanded: isExpanded.value
          })
        ]),
        _: 3
      }, 8, ["id", "style", "as", "as-child", "data-panel-collapsible", "data-panel-group-id", "data-panel-id", "data-panel-size", "data-state"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=SplitterPanel.cjs.map
