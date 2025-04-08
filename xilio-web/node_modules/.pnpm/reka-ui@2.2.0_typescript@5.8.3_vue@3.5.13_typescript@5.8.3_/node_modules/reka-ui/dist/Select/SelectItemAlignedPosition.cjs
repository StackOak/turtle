'use strict';

const vue = require('vue');
const Select_utils = require('./utils.cjs');
const Collection_Collection = require('../Collection/Collection.cjs');
const core = require('@vueuse/core');
const Select_SelectContentImpl = require('./SelectContentImpl.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Select_SelectRoot = require('./SelectRoot.cjs');
const shared_clamp = require('../shared/clamp.cjs');

const [injectSelectItemAlignedPositionContext, provideSelectItemAlignedPositionContext] = shared_createContext.createContext("SelectItemAlignedPosition");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "SelectItemAlignedPosition",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["placed"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { getItems } = Collection_Collection.useCollection();
    const rootContext = Select_SelectRoot.injectSelectRootContext();
    const contentContext = Select_SelectContentImpl.injectSelectContentContext();
    const shouldExpandOnScrollRef = vue.ref(false);
    const shouldRepositionRef = vue.ref(true);
    const contentWrapperElement = vue.ref();
    const { forwardRef, currentElement: contentElement } = shared_useForwardExpose.useForwardExpose();
    const { viewport, selectedItem, selectedItemText, focusSelectedItem } = contentContext;
    function position() {
      if (rootContext.triggerElement.value && rootContext.valueElement.value && contentWrapperElement.value && contentElement.value && viewport?.value && selectedItem?.value && selectedItemText?.value) {
        const triggerRect = rootContext.triggerElement.value.getBoundingClientRect();
        const contentRect = contentElement.value.getBoundingClientRect();
        const valueNodeRect = rootContext.valueElement.value.getBoundingClientRect();
        const itemTextRect = selectedItemText.value.getBoundingClientRect();
        if (rootContext.dir.value !== "rtl") {
          const itemTextOffset = itemTextRect.left - contentRect.left;
          const left = valueNodeRect.left - itemTextOffset;
          const leftDelta = triggerRect.left - left;
          const minContentWidth = triggerRect.width + leftDelta;
          const contentWidth = Math.max(minContentWidth, contentRect.width);
          const rightEdge = window.innerWidth - Select_utils.CONTENT_MARGIN;
          const clampedLeft = shared_clamp.clamp(left, Select_utils.CONTENT_MARGIN, Math.max(Select_utils.CONTENT_MARGIN, rightEdge - contentWidth));
          contentWrapperElement.value.style.minWidth = `${minContentWidth}px`;
          contentWrapperElement.value.style.left = `${clampedLeft}px`;
        } else {
          const itemTextOffset = contentRect.right - itemTextRect.right;
          const right = window.innerWidth - valueNodeRect.right - itemTextOffset;
          const rightDelta = window.innerWidth - triggerRect.right - right;
          const minContentWidth = triggerRect.width + rightDelta;
          const contentWidth = Math.max(minContentWidth, contentRect.width);
          const leftEdge = window.innerWidth - Select_utils.CONTENT_MARGIN;
          const clampedRight = shared_clamp.clamp(
            right,
            Select_utils.CONTENT_MARGIN,
            Math.max(Select_utils.CONTENT_MARGIN, leftEdge - contentWidth)
          );
          contentWrapperElement.value.style.minWidth = `${minContentWidth}px`;
          contentWrapperElement.value.style.right = `${clampedRight}px`;
        }
        const items = getItems().map((i) => i.ref);
        const availableHeight = window.innerHeight - Select_utils.CONTENT_MARGIN * 2;
        const itemsHeight = viewport.value.scrollHeight;
        const contentStyles = window.getComputedStyle(contentElement.value);
        const contentBorderTopWidth = Number.parseInt(
          contentStyles.borderTopWidth,
          10
        );
        const contentPaddingTop = Number.parseInt(contentStyles.paddingTop, 10);
        const contentBorderBottomWidth = Number.parseInt(
          contentStyles.borderBottomWidth,
          10
        );
        const contentPaddingBottom = Number.parseInt(
          contentStyles.paddingBottom,
          10
        );
        const fullContentHeight = contentBorderTopWidth + contentPaddingTop + itemsHeight + contentPaddingBottom + contentBorderBottomWidth;
        const minContentHeight = Math.min(
          selectedItem.value.offsetHeight * 5,
          fullContentHeight
        );
        const viewportStyles = window.getComputedStyle(viewport.value);
        const viewportPaddingTop = Number.parseInt(viewportStyles.paddingTop, 10);
        const viewportPaddingBottom = Number.parseInt(
          viewportStyles.paddingBottom,
          10
        );
        const topEdgeToTriggerMiddle = triggerRect.top + triggerRect.height / 2 - Select_utils.CONTENT_MARGIN;
        const triggerMiddleToBottomEdge = availableHeight - topEdgeToTriggerMiddle;
        const selectedItemHalfHeight = selectedItem.value.offsetHeight / 2;
        const itemOffsetMiddle = selectedItem.value.offsetTop + selectedItemHalfHeight;
        const contentTopToItemMiddle = contentBorderTopWidth + contentPaddingTop + itemOffsetMiddle;
        const itemMiddleToContentBottom = fullContentHeight - contentTopToItemMiddle;
        const willAlignWithoutTopOverflow = contentTopToItemMiddle <= topEdgeToTriggerMiddle;
        if (willAlignWithoutTopOverflow) {
          const isLastItem = selectedItem.value === items[items.length - 1];
          contentWrapperElement.value.style.bottom = `${0}px`;
          const viewportOffsetBottom = contentElement.value.clientHeight - viewport.value.offsetTop - viewport.value.offsetHeight;
          const clampedTriggerMiddleToBottomEdge = Math.max(
            triggerMiddleToBottomEdge,
            selectedItemHalfHeight + (isLastItem ? viewportPaddingBottom : 0) + viewportOffsetBottom + contentBorderBottomWidth
          );
          const height = contentTopToItemMiddle + clampedTriggerMiddleToBottomEdge;
          contentWrapperElement.value.style.height = `${height}px`;
        } else {
          const isFirstItem = selectedItem.value === items[0];
          contentWrapperElement.value.style.top = `${0}px`;
          const clampedTopEdgeToTriggerMiddle = Math.max(
            topEdgeToTriggerMiddle,
            contentBorderTopWidth + viewport.value.offsetTop + (isFirstItem ? viewportPaddingTop : 0) + selectedItemHalfHeight
          );
          const height = clampedTopEdgeToTriggerMiddle + itemMiddleToContentBottom;
          contentWrapperElement.value.style.height = `${height}px`;
          viewport.value.scrollTop = contentTopToItemMiddle - topEdgeToTriggerMiddle + viewport.value.offsetTop;
        }
        contentWrapperElement.value.style.margin = `${Select_utils.CONTENT_MARGIN}px 0`;
        contentWrapperElement.value.style.minHeight = `${minContentHeight}px`;
        contentWrapperElement.value.style.maxHeight = `${availableHeight}px`;
        emits("placed");
        requestAnimationFrame(() => shouldExpandOnScrollRef.value = true);
      }
    }
    const contentZIndex = vue.ref("");
    vue.onMounted(async () => {
      await vue.nextTick();
      position();
      if (contentElement.value)
        contentZIndex.value = window.getComputedStyle(contentElement.value).zIndex;
    });
    function handleScrollButtonChange(node) {
      if (node && shouldRepositionRef.value === true) {
        position();
        focusSelectedItem?.();
        shouldRepositionRef.value = false;
      }
    }
    core.useResizeObserver(rootContext.triggerElement, () => {
      position();
    });
    provideSelectItemAlignedPositionContext({
      contentWrapper: contentWrapperElement,
      shouldExpandOnScrollRef,
      onScrollButtonChange: handleScrollButtonChange
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", {
        ref_key: "contentWrapperElement",
        ref: contentWrapperElement,
        style: vue.normalizeStyle({
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          zIndex: contentZIndex.value
        })
      }, [
        vue.createVNode(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({
          ref: vue.unref(forwardRef),
          style: {
            // When we get the height of the content, it includes borders. If we were to set
            // the height without having `boxSizing: 'border-box'` it would be too big.
            boxSizing: "border-box",
            // We need to ensure the content doesn't get taller than the wrapper
            maxHeight: "100%"
          }
        }, { ..._ctx.$attrs, ...props }), {
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 16)
      ], 4);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectSelectItemAlignedPositionContext = injectSelectItemAlignedPositionContext;
//# sourceMappingURL=SelectItemAlignedPosition.cjs.map
