'use strict';

const vue = require('vue');
const vueVirtual = require('@tanstack/vue-virtual');
const core = require('@vueuse/core');
const shared_useTypeahead = require('../shared/useTypeahead.cjs');
const RovingFocus_utils = require('../RovingFocus/utils.cjs');
const Collection_Collection = require('../Collection/Collection.cjs');
const shared_getActiveElement = require('../shared/getActiveElement.cjs');
const Tree_TreeRoot = require('./TreeRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "TreeVirtualizer",
  props: {
    overscan: {},
    estimateSize: {},
    textContent: { type: Function }
  },
  setup(__props) {
    const props = __props;
    const slots = vue.useSlots();
    const rootContext = Tree_TreeRoot.injectTreeRootContext();
    const parentEl = core.useParentElement();
    const { getItems } = Collection_Collection.useCollection();
    const search = core.refAutoReset("", 1e3);
    const optionsWithMetadata = vue.computed(() => {
      const parseTextContent = (option) => {
        if (props.textContent)
          return props.textContent(option);
        else
          return option.toString().toLowerCase();
      };
      return rootContext.expandedItems.value.map((option, index) => ({
        index,
        textContent: parseTextContent(option.value)
      }));
    });
    rootContext.isVirtual.value = true;
    const padding = vue.computed(() => {
      const el = parentEl.value;
      if (!el) {
        return { start: 0, end: 0 };
      } else {
        const styles = window.getComputedStyle(el);
        return {
          start: Number.parseFloat(styles.paddingBlockStart || styles.paddingTop),
          end: Number.parseFloat(styles.paddingBlockEnd || styles.paddingBottom)
        };
      }
    });
    const virtualizer = vueVirtual.useVirtualizer(
      {
        get scrollPaddingStart() {
          return padding.value.start;
        },
        get scrollPaddingEnd() {
          return padding.value.end;
        },
        get count() {
          return rootContext.expandedItems.value.length ?? 0;
        },
        get horizontal() {
          return false;
        },
        getItemKey(index) {
          return index + rootContext.getKey(rootContext.expandedItems.value[index].value);
        },
        estimateSize() {
          return props.estimateSize ?? 28;
        },
        getScrollElement() {
          return parentEl.value;
        },
        overscan: props.overscan ?? 12
      }
    );
    const virtualizedItems = vue.computed(() => virtualizer.value.getVirtualItems().map((item) => {
      return {
        item,
        is: vue.cloneVNode(slots.default({
          item: rootContext.expandedItems.value[item.index],
          virtualizer: virtualizer.value,
          virtualItem: item
        })[0], {
          "data-index": item.index,
          "style": {
            position: "absolute",
            top: 0,
            left: 0,
            transform: `translateY(${item.start}px)`,
            overflowAnchor: "none"
          }
        })
      };
    }));
    function scrollToIndexAndFocus(index) {
      virtualizer.value.scrollToIndex(index, { align: "start" });
      requestAnimationFrame(() => {
        const item = parentEl.value.querySelector(`[data-index="${index}"]`);
        if (item instanceof HTMLElement)
          item.focus();
      });
    }
    rootContext.virtualKeydownHook.on((event) => {
      const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
      const isTabKey = event.key === "Tab" && !isMetaKey;
      if (isTabKey)
        return;
      const intent = RovingFocus_utils.MAP_KEY_TO_FOCUS_INTENT[event.key];
      if (["first", "last"].includes(intent)) {
        event.preventDefault();
        const index = intent === "first" ? 0 : rootContext.expandedItems.value.length - 1;
        virtualizer.value.scrollToIndex(index);
        requestAnimationFrame(() => {
          const items = getItems();
          const item = intent === "first" ? items[0] : items[items.length - 1];
          item.ref.focus();
        });
      } else if (intent === "prev" && event.key !== "ArrowUp") {
        const currentElement = shared_getActiveElement.getActiveElement();
        const currentIndex = Number(currentElement.getAttribute("data-index"));
        const currentLevel = Number(currentElement.getAttribute("data-indent"));
        const list = rootContext.expandedItems.value.slice(0, currentIndex).map((item, index) => ({ ...item, index })).reverse();
        const parentItem = list.find((item) => item.level === currentLevel - 1);
        if (parentItem)
          scrollToIndexAndFocus(parentItem.index);
      } else if (!intent && !isMetaKey) {
        search.value += event.key;
        const currentIndex = Number(shared_getActiveElement.getActiveElement()?.getAttribute("data-index"));
        const currentMatch = optionsWithMetadata.value[currentIndex].textContent;
        const filteredOptions = optionsWithMetadata.value.map((i) => i.textContent);
        const next = shared_useTypeahead.getNextMatch(filteredOptions, search.value, currentMatch);
        const nextMatch = optionsWithMetadata.value.find((option) => option.textContent === next);
        if (nextMatch)
          scrollToIndexAndFocus(nextMatch.index);
      }
      vue.nextTick(() => {
        if (event.shiftKey && intent)
          rootContext.handleMultipleReplace(intent, shared_getActiveElement.getActiveElement(), getItems, rootContext.expandedItems.value.map((i) => i.value));
      });
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", {
        "data-reka-virtualizer": "",
        style: vue.normalizeStyle({
          position: "relative",
          width: "100%",
          height: `${vue.unref(virtualizer).getTotalSize()}px`
        })
      }, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(virtualizedItems.value, ({ is, item }) => {
          return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(is), {
            key: item.key
          });
        }), 128))
      ], 4);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=TreeVirtualizer.cjs.map
