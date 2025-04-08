import { defineComponent, ref, watch, watchEffect, computed, createBlock, openBlock, unref, withCtx, createVNode, withModifiers, resolveDynamicComponent, mergeProps, renderSlot } from 'vue';
import { unrefElement } from '@vueuse/core';
import { _ as _sfc_main$4 } from './SelectItemAlignedPosition.js';
import { _ as _sfc_main$3 } from './SelectPopperPosition.js';
import { _ as _sfc_main$2 } from '../DismissableLayer/DismissableLayer.js';
import { f as focusFirst } from '../Menu/utils.js';
import { u as useBodyScrollLock } from '../shared/useBodyScrollLock.js';
import { v as valueComparator } from './utils.js';
import { u as useCollection } from '../Collection/Collection.js';
import { u as useFocusGuards } from '../shared/useFocusGuards.js';
import { u as useHideOthers } from '../shared/useHideOthers.js';
import { u as useTypeahead } from '../shared/useTypeahead.js';
import { u as useForwardProps } from '../shared/useForwardProps.js';
import { c as createContext } from '../shared/createContext.js';
import { _ as _sfc_main$1 } from '../FocusScope/FocusScope.js';
import { i as injectSelectRootContext } from './SelectRoot.js';

const SelectContentDefaultContextValue = {
  onViewportChange: () => {
  },
  itemTextRefCallback: () => {
  },
  itemRefCallback: () => {
  }
};
const [injectSelectContentContext, provideSelectContentContext] = createContext("SelectContent");
const _sfc_main = /* @__PURE__ */ defineComponent({
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
    const rootContext = injectSelectRootContext();
    useFocusGuards();
    useBodyScrollLock(props.bodyLock);
    const { CollectionSlot, getItems } = useCollection();
    const content = ref();
    useHideOthers(content);
    const { search, handleTypeaheadSearch } = useTypeahead();
    const viewport = ref();
    const selectedItem = ref();
    const selectedItemText = ref();
    const isPositioned = ref(false);
    const firstValidItemFoundRef = ref(false);
    const firstSelectedItemInArrayFoundRef = ref(false);
    function focusSelectedItem() {
      if (selectedItem.value && content.value)
        focusFirst([selectedItem.value, content.value]);
    }
    watch(isPositioned, () => {
      focusSelectedItem();
    });
    const { onOpenChange, triggerPointerDownPosRef } = rootContext;
    watchEffect((cleanupFn) => {
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
        setTimeout(() => focusFirst(candidateNodes));
        event.preventDefault();
      }
    }
    const pickedProps = computed(() => {
      if (props.position === "popper")
        return props;
      else return {};
    });
    const forwardedProps = useForwardProps(pickedProps.value);
    provideSelectContentContext({
      content,
      viewport,
      onViewportChange: (node) => {
        viewport.value = node;
      },
      itemRefCallback: (node, value, disabled) => {
        const isFirstValidItem = !firstValidItemFoundRef.value && !disabled;
        const isSelectedItem = valueComparator(rootContext.modelValue.value, value, rootContext.by);
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
        const isSelectedItem = valueComparator(rootContext.modelValue.value, value, rootContext.by);
        if (isSelectedItem || isFirstValidItem)
          selectedItemText.value = node;
      },
      focusSelectedItem,
      position: props.position,
      isPositioned,
      searchRef: search
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(CollectionSlot), null, {
        default: withCtx(() => [
          createVNode(unref(_sfc_main$1), {
            "as-child": "",
            onMountAutoFocus: _cache[6] || (_cache[6] = withModifiers(() => {
            }, ["prevent"])),
            onUnmountAutoFocus: _cache[7] || (_cache[7] = (event) => {
              emits("closeAutoFocus", event);
              if (event.defaultPrevented) return;
              unref(rootContext).triggerElement.value?.focus({ preventScroll: true });
              event.preventDefault();
            })
          }, {
            default: withCtx(() => [
              createVNode(unref(_sfc_main$2), {
                "as-child": "",
                "disable-outside-pointer-events": "",
                onFocusOutside: _cache[2] || (_cache[2] = withModifiers(() => {
                }, ["prevent"])),
                onDismiss: _cache[3] || (_cache[3] = ($event) => unref(rootContext).onOpenChange(false)),
                onEscapeKeyDown: _cache[4] || (_cache[4] = ($event) => emits("escapeKeyDown", $event)),
                onPointerDownOutside: _cache[5] || (_cache[5] = ($event) => emits("pointerDownOutside", $event))
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(
                    _ctx.position === "popper" ? _sfc_main$3 : _sfc_main$4
                  ), mergeProps({ ..._ctx.$attrs, ...unref(forwardedProps) }, {
                    id: unref(rootContext).contentId,
                    ref: (vnode) => {
                      content.value = unref(unrefElement)(vnode);
                      return void 0;
                    },
                    role: "listbox",
                    "data-state": unref(rootContext).open.value ? "open" : "closed",
                    dir: unref(rootContext).dir.value,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none"
                    },
                    onContextmenu: _cache[0] || (_cache[0] = withModifiers(() => {
                    }, ["prevent"])),
                    onPlaced: _cache[1] || (_cache[1] = ($event) => isPositioned.value = true),
                    onKeydown: handleKeyDown
                  }), {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "default")
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

export { SelectContentDefaultContextValue as S, _sfc_main as _, injectSelectContentContext as i, provideSelectContentContext as p };
//# sourceMappingURL=SelectContentImpl.js.map
