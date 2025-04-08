'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const Select_SelectItemAlignedPosition = require('./SelectItemAlignedPosition.cjs');
const Select_SelectPopperPosition = require('./SelectPopperPosition.cjs');
const DismissableLayer_DismissableLayer = require('../DismissableLayer/DismissableLayer.cjs');
const Menu_utils = require('../Menu/utils.cjs');
const shared_useBodyScrollLock = require('../shared/useBodyScrollLock.cjs');
const Select_utils = require('./utils.cjs');
const Collection_Collection = require('../Collection/Collection.cjs');
const shared_useFocusGuards = require('../shared/useFocusGuards.cjs');
const shared_useHideOthers = require('../shared/useHideOthers.cjs');
const shared_useTypeahead = require('../shared/useTypeahead.cjs');
const shared_useForwardProps = require('../shared/useForwardProps.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const FocusScope_FocusScope = require('../FocusScope/FocusScope.cjs');
const Select_SelectRoot = require('./SelectRoot.cjs');

const SelectContentDefaultContextValue = {
  onViewportChange: () => {
  },
  itemTextRefCallback: () => {
  },
  itemRefCallback: () => {
  }
};
const [injectSelectContentContext, provideSelectContentContext] = shared_createContext.createContext("SelectContent");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "SelectContentImpl",
  props: {
    position: { default: "item-aligned" },
    bodyLock: { type: Boolean, default: true },
    side: {},
    sideOffset: {},
    align: { default: "start" },
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    positionStrategy: {},
    updatePositionStrategy: {},
    disableUpdateOnLayoutShift: { type: Boolean },
    prioritizePosition: { type: Boolean },
    reference: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["closeAutoFocus", "escapeKeyDown", "pointerDownOutside"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = Select_SelectRoot.injectSelectRootContext();
    shared_useFocusGuards.useFocusGuards();
    shared_useBodyScrollLock.useBodyScrollLock(props.bodyLock);
    const { CollectionSlot, getItems } = Collection_Collection.useCollection();
    const content = vue.ref();
    shared_useHideOthers.useHideOthers(content);
    const { search, handleTypeaheadSearch } = shared_useTypeahead.useTypeahead();
    const viewport = vue.ref();
    const selectedItem = vue.ref();
    const selectedItemText = vue.ref();
    const isPositioned = vue.ref(false);
    const firstValidItemFoundRef = vue.ref(false);
    const firstSelectedItemInArrayFoundRef = vue.ref(false);
    function focusSelectedItem() {
      if (selectedItem.value && content.value)
        Menu_utils.focusFirst([selectedItem.value, content.value]);
    }
    vue.watch(isPositioned, () => {
      focusSelectedItem();
    });
    const { onOpenChange, triggerPointerDownPosRef } = rootContext;
    vue.watchEffect((cleanupFn) => {
      if (!content.value)
        return;
      let pointerMoveDelta = { x: 0, y: 0 };
      const handlePointerMove = (event) => {
        pointerMoveDelta = {
          x: Math.abs(
            Math.round(event.pageX) - (triggerPointerDownPosRef.value?.x ?? 0)
          ),
          y: Math.abs(
            Math.round(event.pageY) - (triggerPointerDownPosRef.value?.y ?? 0)
          )
        };
      };
      const handlePointerUp = (event) => {
        if (event.pointerType === "touch")
          return;
        if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10) {
          event.preventDefault();
        } else {
          if (!content.value?.contains(event.target))
            onOpenChange(false);
        }
        document.removeEventListener("pointermove", handlePointerMove);
        triggerPointerDownPosRef.value = null;
      };
      if (triggerPointerDownPosRef.value !== null) {
        document.addEventListener("pointermove", handlePointerMove);
        document.addEventListener("pointerup", handlePointerUp, {
          capture: true,
          once: true
        });
      }
      cleanupFn(() => {
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp, {
          capture: true
        });
      });
    });
    function handleKeyDown(event) {
      const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
      if (event.key === "Tab")
        event.preventDefault();
      if (!isModifierKey && event.key.length === 1)
        handleTypeaheadSearch(event.key, getItems());
      if (["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
        const collectionItems = getItems().map((i) => i.ref);
        let candidateNodes = [...collectionItems];
        if (["ArrowUp", "End"].includes(event.key))
          candidateNodes = candidateNodes.slice().reverse();
        if (["ArrowUp", "ArrowDown"].includes(event.key)) {
          const currentElement = event.target;
          const currentIndex = candidateNodes.indexOf(currentElement);
          candidateNodes = candidateNodes.slice(currentIndex + 1);
        }
        setTimeout(() => Menu_utils.focusFirst(candidateNodes));
        event.preventDefault();
      }
    }
    const pickedProps = vue.computed(() => {
      if (props.position === "popper")
        return props;
      else return {};
    });
    const forwardedProps = shared_useForwardProps.useForwardProps(pickedProps.value);
    provideSelectContentContext({
      content,
      viewport,
      onViewportChange: (node) => {
        viewport.value = node;
      },
      itemRefCallback: (node, value, disabled) => {
        const isFirstValidItem = !firstValidItemFoundRef.value && !disabled;
        const isSelectedItem = Select_utils.valueComparator(rootContext.modelValue.value, value, rootContext.by);
        if (rootContext.multiple.value) {
          if (firstSelectedItemInArrayFoundRef.value) {
            return;
          }
          if (isSelectedItem || isFirstValidItem) {
            selectedItem.value = node;
            if (isSelectedItem) {
              firstSelectedItemInArrayFoundRef.value = true;
            }
          }
        } else {
          if (isSelectedItem || isFirstValidItem) {
            selectedItem.value = node;
          }
        }
        if (isFirstValidItem) {
          firstValidItemFoundRef.value = true;
        }
      },
      selectedItem,
      selectedItemText,
      onItemLeave: () => {
        content.value?.focus();
      },
      itemTextRefCallback: (node, value, disabled) => {
        const isFirstValidItem = !firstValidItemFoundRef.value && !disabled;
        const isSelectedItem = Select_utils.valueComparator(rootContext.modelValue.value, value, rootContext.by);
        if (isSelectedItem || isFirstValidItem)
          selectedItemText.value = node;
      },
      focusSelectedItem,
      position: props.position,
      isPositioned,
      searchRef: search
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(CollectionSlot), null, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(FocusScope_FocusScope._sfc_main), {
            "as-child": "",
            onMountAutoFocus: _cache[6] || (_cache[6] = vue.withModifiers(() => {
            }, ["prevent"])),
            onUnmountAutoFocus: _cache[7] || (_cache[7] = (event) => {
              emits("closeAutoFocus", event);
              if (event.defaultPrevented) return;
              vue.unref(rootContext).triggerElement.value?.focus({ preventScroll: true });
              event.preventDefault();
            })
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(vue.unref(DismissableLayer_DismissableLayer._sfc_main), {
                "as-child": "",
                "disable-outside-pointer-events": "",
                onFocusOutside: _cache[2] || (_cache[2] = vue.withModifiers(() => {
                }, ["prevent"])),
                onDismiss: _cache[3] || (_cache[3] = ($event) => vue.unref(rootContext).onOpenChange(false)),
                onEscapeKeyDown: _cache[4] || (_cache[4] = ($event) => emits("escapeKeyDown", $event)),
                onPointerDownOutside: _cache[5] || (_cache[5] = ($event) => emits("pointerDownOutside", $event))
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(
                    _ctx.position === "popper" ? Select_SelectPopperPosition._sfc_main : Select_SelectItemAlignedPosition._sfc_main
                  ), vue.mergeProps({ ..._ctx.$attrs, ...vue.unref(forwardedProps) }, {
                    id: vue.unref(rootContext).contentId,
                    ref: (vnode) => {
                      content.value = vue.unref(core.unrefElement)(vnode);
                      return void 0;
                    },
                    role: "listbox",
                    "data-state": vue.unref(rootContext).open.value ? "open" : "closed",
                    dir: vue.unref(rootContext).dir.value,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none"
                    },
                    onContextmenu: _cache[0] || (_cache[0] = vue.withModifiers(() => {
                    }, ["prevent"])),
                    onPlaced: _cache[1] || (_cache[1] = ($event) => isPositioned.value = true),
                    onKeydown: handleKeyDown
                  }), {
                    default: vue.withCtx(() => [
                      vue.renderSlot(_ctx.$slots, "default")
                    ]),
                    _: 3
                  }, 16, ["id", "data-state", "dir", "onKeydown"]))
                ]),
                _: 3
              })
            ]),
            _: 3
          })
        ]),
        _: 3
      });
    };
  }
});

exports.SelectContentDefaultContextValue = SelectContentDefaultContextValue;
exports._sfc_main = _sfc_main;
exports.injectSelectContentContext = injectSelectContentContext;
exports.provideSelectContentContext = provideSelectContentContext;
//# sourceMappingURL=SelectContentImpl.cjs.map
