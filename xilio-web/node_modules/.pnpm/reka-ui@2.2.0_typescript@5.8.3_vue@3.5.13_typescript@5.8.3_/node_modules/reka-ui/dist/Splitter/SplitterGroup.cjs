'use strict';

const vue = require('vue');
const utils_registry = require('../utils/registry.cjs');
const utils_layout = require('../utils/layout.cjs');
const utils_assert = require('../utils/assert.cjs');
const utils_calculate = require('../utils/calculate.cjs');
const utils_callPanelCallbacks = require('../utils/callPanelCallbacks.cjs');
const utils_style = require('../utils/style.cjs');
const utils_debounce = require('../utils/debounce.cjs');
const utils_pivot = require('../utils/pivot.cjs');
const utils_dom = require('../utils/dom.cjs');
const utils_events = require('../utils/events.cjs');
const utils_validation = require('../utils/validation.cjs');
const utils_storage = require('../utils/storage.cjs');
const composables_useWindowSplitterPanelGroupBehavior = require('../composables/useWindowSplitterPanelGroupBehavior.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useId = require('../shared/useId.cjs');
const shared_useDirection = require('../shared/useDirection.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_arrays = require('../shared/arrays.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const LOCAL_STORAGE_DEBOUNCE_INTERVAL = 100;
const defaultStorage = {
  getItem: (name) => {
    utils_storage.initializeDefaultStorage(defaultStorage);
    return defaultStorage.getItem(name);
  },
  setItem: (name, value) => {
    utils_storage.initializeDefaultStorage(defaultStorage);
    defaultStorage.setItem(name, value);
  }
};
const [injectPanelGroupContext, providePanelGroupContext] = shared_createContext.createContext("PanelGroup");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "SplitterGroup",
  props: {
    id: {},
    autoSaveId: { default: null },
    direction: {},
    keyboardResizeBy: { default: 10 },
    storage: { default: () => defaultStorage },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["layout"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const debounceMap = {};
    const { direction } = vue.toRefs(props);
    const groupId = shared_useId.useId(props.id, "reka-splitter-group");
    const dir = shared_useDirection.useDirection();
    const { forwardRef, currentElement: panelGroupElementRef } = shared_useForwardExpose.useForwardExpose();
    const dragState = vue.ref(null);
    const layout = vue.ref([]);
    const panelIdToLastNotifiedSizeMapRef = vue.ref({});
    const panelSizeBeforeCollapseRef = vue.ref(/* @__PURE__ */ new Map());
    const prevDeltaRef = vue.ref(0);
    const committedValuesRef = vue.computed(() => ({
      autoSaveId: props.autoSaveId,
      direction: props.direction,
      dragState: dragState.value,
      id: groupId,
      keyboardResizeBy: props.keyboardResizeBy,
      storage: props.storage
    }));
    const eagerValuesRef = vue.ref({
      layout: layout.value,
      panelDataArray: [],
      panelDataArrayChanged: false
    });
    const setLayout = (val) => layout.value = val;
    composables_useWindowSplitterPanelGroupBehavior.useWindowSplitterPanelGroupBehavior({
      eagerValuesRef,
      groupId,
      layout,
      panelDataArray: eagerValuesRef.value.panelDataArray,
      setLayout,
      panelGroupElement: panelGroupElementRef
    });
    vue.watchEffect(() => {
      const { panelDataArray } = eagerValuesRef.value;
      const { autoSaveId } = props;
      if (autoSaveId) {
        if (layout.value.length === 0 || layout.value.length !== panelDataArray.length)
          return;
        let debouncedSave = debounceMap[autoSaveId];
        if (!debouncedSave) {
          debouncedSave = utils_debounce.debounce(
            utils_storage.savePanelGroupState,
            LOCAL_STORAGE_DEBOUNCE_INTERVAL
          );
          debounceMap[autoSaveId] = debouncedSave;
        }
        const clonedPanelDataArray = [...panelDataArray];
        const clonedPanelSizesBeforeCollapse = new Map(
          panelSizeBeforeCollapseRef.value
        );
        debouncedSave(
          autoSaveId,
          clonedPanelDataArray,
          clonedPanelSizesBeforeCollapse,
          layout.value,
          props.storage
        );
      }
    });
    function getPanelStyle(panelData, defaultSize) {
      const { panelDataArray } = eagerValuesRef.value;
      const panelIndex = findPanelDataIndex(panelDataArray, panelData);
      return utils_style.computePanelFlexBoxStyle({
        defaultSize,
        dragState: dragState.value,
        layout: layout.value,
        panelData: panelDataArray,
        panelIndex
      });
    }
    function registerPanel(panelData) {
      const { panelDataArray } = eagerValuesRef.value;
      panelDataArray.push(panelData);
      panelDataArray.sort((panelA, panelB) => {
        const orderA = panelA.order;
        const orderB = panelB.order;
        if (orderA == null && orderB == null)
          return 0;
        else if (orderA == null)
          return -1;
        else if (orderB == null)
          return 1;
        else
          return orderA - orderB;
      });
      eagerValuesRef.value.panelDataArrayChanged = true;
    }
    vue.watch(() => eagerValuesRef.value.panelDataArrayChanged, () => {
      if (eagerValuesRef.value.panelDataArrayChanged) {
        eagerValuesRef.value.panelDataArrayChanged = false;
        const { autoSaveId, storage } = committedValuesRef.value;
        const { layout: prevLayout, panelDataArray } = eagerValuesRef.value;
        let unsafeLayout = null;
        if (autoSaveId) {
          const state = utils_storage.loadPanelGroupState(autoSaveId, panelDataArray, storage);
          if (state) {
            panelSizeBeforeCollapseRef.value = new Map(
              Object.entries(state.expandToSizes)
            );
            unsafeLayout = state.layout;
          }
        }
        if (unsafeLayout === null) {
          unsafeLayout = utils_calculate.calculateUnsafeDefaultLayout({
            panelDataArray
          });
        }
        const nextLayout = utils_validation.validatePanelGroupLayout({
          layout: unsafeLayout,
          panelConstraints: panelDataArray.map(
            (panelData) => panelData.constraints
          )
        });
        if (!shared_arrays.areEqual(prevLayout, nextLayout)) {
          setLayout(nextLayout);
          eagerValuesRef.value.layout = nextLayout;
          emits("layout", nextLayout);
          utils_callPanelCallbacks.callPanelCallbacks(
            panelDataArray,
            nextLayout,
            panelIdToLastNotifiedSizeMapRef.value
          );
        }
      }
    });
    function registerResizeHandle(dragHandleId) {
      return function resizeHandler(event) {
        event.preventDefault();
        const panelGroupElement = panelGroupElementRef.value;
        if (!panelGroupElement)
          return () => null;
        const { direction: direction2, dragState: dragState2, id: groupId2, keyboardResizeBy } = committedValuesRef.value;
        const { layout: prevLayout, panelDataArray } = eagerValuesRef.value;
        const { initialLayout } = dragState2 ?? {};
        const pivotIndices = utils_pivot.determinePivotIndices(
          groupId2,
          dragHandleId,
          panelGroupElement
        );
        let delta = utils_calculate.calculateDeltaPercentage(
          event,
          dragHandleId,
          direction2,
          dragState2,
          keyboardResizeBy,
          panelGroupElement
        );
        if (delta === 0)
          return;
        const isHorizontal = direction2 === "horizontal";
        if (dir.value === "rtl" && isHorizontal)
          delta = -delta;
        const panelConstraints = panelDataArray.map((panelData) => panelData.constraints);
        const nextLayout = utils_layout.adjustLayoutByDelta({
          delta,
          layout: initialLayout ?? prevLayout,
          panelConstraints,
          pivotIndices,
          trigger: utils_events.isKeyDown(event) ? "keyboard" : "mouse-or-touch"
        });
        const layoutChanged = !utils_layout.compareLayouts(prevLayout, nextLayout);
        if (utils_events.isMouseEvent(event) || utils_events.isTouchEvent(event)) {
          if (prevDeltaRef.value !== delta) {
            prevDeltaRef.value = delta;
            if (!layoutChanged) {
              if (isHorizontal) {
                utils_registry.reportConstraintsViolation(
                  dragHandleId,
                  delta < 0 ? utils_registry.EXCEEDED_HORIZONTAL_MIN : utils_registry.EXCEEDED_HORIZONTAL_MAX
                );
              } else {
                utils_registry.reportConstraintsViolation(
                  dragHandleId,
                  delta < 0 ? utils_registry.EXCEEDED_VERTICAL_MIN : utils_registry.EXCEEDED_VERTICAL_MAX
                );
              }
            } else {
              utils_registry.reportConstraintsViolation(dragHandleId, 0);
            }
          }
        }
        if (layoutChanged) {
          setLayout(nextLayout);
          eagerValuesRef.value.layout = nextLayout;
          emits("layout", nextLayout);
          utils_callPanelCallbacks.callPanelCallbacks(
            panelDataArray,
            nextLayout,
            panelIdToLastNotifiedSizeMapRef.value
          );
        }
      };
    }
    function resizePanel(panelData, unsafePanelSize) {
      const { layout: prevLayout, panelDataArray } = eagerValuesRef.value;
      const panelConstraintsArray = panelDataArray.map((panelData2) => panelData2.constraints);
      const { panelSize, pivotIndices } = panelDataHelper(
        panelDataArray,
        panelData,
        prevLayout
      );
      utils_assert.assert(panelSize != null);
      const isLastPanel = findPanelDataIndex(panelDataArray, panelData) === panelDataArray.length - 1;
      const delta = isLastPanel ? panelSize - unsafePanelSize : unsafePanelSize - panelSize;
      const nextLayout = utils_layout.adjustLayoutByDelta({
        delta,
        layout: prevLayout,
        panelConstraints: panelConstraintsArray,
        pivotIndices,
        trigger: "imperative-api"
      });
      if (!utils_layout.compareLayouts(prevLayout, nextLayout)) {
        setLayout(nextLayout);
        eagerValuesRef.value.layout = nextLayout;
        emits("layout", nextLayout);
        utils_callPanelCallbacks.callPanelCallbacks(
          panelDataArray,
          nextLayout,
          panelIdToLastNotifiedSizeMapRef.value
        );
      }
    }
    function reevaluatePanelConstraints(panelData, prevConstraints) {
      const { layout: layout2, panelDataArray } = eagerValuesRef.value;
      const index = findPanelDataIndex(panelDataArray, panelData);
      panelDataArray[index] = panelData;
      eagerValuesRef.value.panelDataArrayChanged = true;
      const {
        collapsedSize: prevCollapsedSize = 0,
        collapsible: prevCollapsible
      } = prevConstraints;
      const {
        collapsedSize: nextCollapsedSize = 0,
        collapsible: nextCollapsible,
        maxSize: nextMaxSize = 100,
        minSize: nextMinSize = 0
      } = panelData.constraints;
      const { panelSize: prevPanelSize } = panelDataHelper(
        panelDataArray,
        panelData,
        layout2
      );
      if (prevPanelSize === null) {
        return;
      }
      if (prevCollapsible && nextCollapsible && prevPanelSize === prevCollapsedSize) {
        if (prevCollapsedSize !== nextCollapsedSize) {
          resizePanel(panelData, nextCollapsedSize);
        }
      } else if (prevPanelSize < nextMinSize) {
        resizePanel(panelData, nextMinSize);
      } else if (prevPanelSize > nextMaxSize) {
        resizePanel(panelData, nextMaxSize);
      }
    }
    function startDragging(dragHandleId, event) {
      const { direction: direction2 } = committedValuesRef.value;
      const { layout: layout2 } = eagerValuesRef.value;
      if (!panelGroupElementRef.value)
        return;
      const handleElement = utils_dom.getResizeHandleElement(
        dragHandleId,
        panelGroupElementRef.value
      );
      utils_assert.assert(handleElement);
      const initialCursorPosition = utils_events.getResizeEventCursorPosition(
        direction2,
        event
      );
      dragState.value = {
        dragHandleId,
        dragHandleRect: handleElement.getBoundingClientRect(),
        initialCursorPosition,
        initialLayout: layout2
      };
    }
    function stopDragging() {
      dragState.value = null;
    }
    function unregisterPanel(panelData) {
      const { panelDataArray } = eagerValuesRef.value;
      const index = findPanelDataIndex(panelDataArray, panelData);
      if (index >= 0) {
        panelDataArray.splice(index, 1);
        delete panelIdToLastNotifiedSizeMapRef.value[panelData.id];
        eagerValuesRef.value.panelDataArrayChanged = true;
      }
    }
    function collapsePanel(panelData) {
      const { layout: prevLayout, panelDataArray } = eagerValuesRef.value;
      if (panelData.constraints.collapsible) {
        const panelConstraintsArray = panelDataArray.map(
          (panelData2) => panelData2.constraints
        );
        const {
          collapsedSize = 0,
          panelSize,
          pivotIndices
        } = panelDataHelper(panelDataArray, panelData, prevLayout);
        utils_assert.assert(
          panelSize != null,
          `Panel size not found for panel "${panelData.id}"`
        );
        if (panelSize !== collapsedSize) {
          panelSizeBeforeCollapseRef.value.set(panelData.id, panelSize);
          const isLastPanel = findPanelDataIndex(panelDataArray, panelData) === panelDataArray.length - 1;
          const delta = isLastPanel ? panelSize - collapsedSize : collapsedSize - panelSize;
          const nextLayout = utils_layout.adjustLayoutByDelta({
            delta,
            layout: prevLayout,
            panelConstraints: panelConstraintsArray,
            pivotIndices,
            trigger: "imperative-api"
          });
          if (!utils_layout.compareLayouts(prevLayout, nextLayout)) {
            setLayout(nextLayout);
            eagerValuesRef.value.layout = nextLayout;
            emits("layout", nextLayout);
            utils_callPanelCallbacks.callPanelCallbacks(
              panelDataArray,
              nextLayout,
              panelIdToLastNotifiedSizeMapRef.value
            );
          }
        }
      }
    }
    function expandPanel(panelData) {
      const { layout: prevLayout, panelDataArray } = eagerValuesRef.value;
      if (panelData.constraints.collapsible) {
        const panelConstraintsArray = panelDataArray.map(
          (panelData2) => panelData2.constraints
        );
        const {
          collapsedSize = 0,
          panelSize,
          minSize = 0,
          pivotIndices
        } = panelDataHelper(panelDataArray, panelData, prevLayout);
        if (panelSize === collapsedSize) {
          const prevPanelSize = panelSizeBeforeCollapseRef.value.get(
            panelData.id
          );
          const baseSize = prevPanelSize != null && prevPanelSize >= minSize ? prevPanelSize : minSize;
          const isLastPanel = findPanelDataIndex(panelDataArray, panelData) === panelDataArray.length - 1;
          const delta = isLastPanel ? panelSize - baseSize : baseSize - panelSize;
          const nextLayout = utils_layout.adjustLayoutByDelta({
            delta,
            layout: prevLayout,
            panelConstraints: panelConstraintsArray,
            pivotIndices,
            trigger: "imperative-api"
          });
          if (!utils_layout.compareLayouts(prevLayout, nextLayout)) {
            setLayout(nextLayout);
            eagerValuesRef.value.layout = nextLayout;
            emits("layout", nextLayout);
            utils_callPanelCallbacks.callPanelCallbacks(
              panelDataArray,
              nextLayout,
              panelIdToLastNotifiedSizeMapRef.value
            );
          }
        }
      }
    }
    function getPanelSize(panelData) {
      const { layout: layout2, panelDataArray } = eagerValuesRef.value;
      const { panelSize } = panelDataHelper(panelDataArray, panelData, layout2);
      utils_assert.assert(
        panelSize != null,
        `Panel size not found for panel "${panelData.id}"`
      );
      return panelSize;
    }
    function isPanelCollapsed(panelData) {
      const { layout: layout2, panelDataArray } = eagerValuesRef.value;
      const {
        collapsedSize = 0,
        collapsible,
        panelSize
      } = panelDataHelper(panelDataArray, panelData, layout2);
      if (!collapsible)
        return false;
      if (panelSize === void 0) {
        return panelData.constraints.defaultSize === panelData.constraints.collapsedSize;
      } else {
        return panelSize === collapsedSize;
      }
    }
    function isPanelExpanded(panelData) {
      const { layout: layout2, panelDataArray } = eagerValuesRef.value;
      const {
        collapsedSize = 0,
        collapsible,
        panelSize
      } = panelDataHelper(panelDataArray, panelData, layout2);
      utils_assert.assert(
        panelSize != null,
        `Panel size not found for panel "${panelData.id}"`
      );
      return !collapsible || panelSize > collapsedSize;
    }
    providePanelGroupContext({
      direction,
      dragState: dragState.value,
      groupId,
      reevaluatePanelConstraints,
      registerPanel,
      registerResizeHandle,
      resizePanel,
      startDragging,
      stopDragging,
      unregisterPanel,
      panelGroupElement: panelGroupElementRef,
      collapsePanel,
      expandPanel,
      isPanelCollapsed,
      isPanelExpanded,
      getPanelSize,
      getPanelStyle
    });
    function findPanelDataIndex(panelDataArray, panelData) {
      return panelDataArray.findIndex(
        (prevPanelData) => prevPanelData === panelData || prevPanelData.id === panelData.id
      );
    }
    function panelDataHelper(panelDataArray, panelData, layout2) {
      const panelIndex = findPanelDataIndex(panelDataArray, panelData);
      const isLastPanel = panelIndex === panelDataArray.length - 1;
      const pivotIndices = isLastPanel ? [panelIndex - 1, panelIndex] : [panelIndex, panelIndex + 1];
      const panelSize = layout2[panelIndex];
      return {
        ...panelData.constraints,
        panelSize,
        pivotIndices
      };
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        ref: vue.unref(forwardRef),
        as: _ctx.as,
        "as-child": _ctx.asChild,
        style: vue.normalizeStyle({
          display: "flex",
          flexDirection: vue.unref(direction) === "horizontal" ? "row" : "column",
          height: "100%",
          overflow: "hidden",
          width: "100%"
        }),
        "data-panel-group": "",
        "data-orientation": vue.unref(direction),
        "data-panel-group-id": vue.unref(groupId)
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", { layout: layout.value })
        ]),
        _: 3
      }, 8, ["as", "as-child", "style", "data-orientation", "data-panel-group-id"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectPanelGroupContext = injectPanelGroupContext;
//# sourceMappingURL=SplitterGroup.cjs.map
