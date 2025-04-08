'use strict';

const vue = require('vue');
const Menu_utils = require('./utils.cjs');
const DismissableLayer_DismissableLayer = require('../DismissableLayer/DismissableLayer.cjs');
const Popper_PopperContent = require('../Popper/PopperContent.cjs');
const shared_useBodyScrollLock = require('../shared/useBodyScrollLock.cjs');
const Menu_MenuRoot = require('./MenuRoot.cjs');
const shared_useFocusGuards = require('../shared/useFocusGuards.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useTypeahead = require('../shared/useTypeahead.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const FocusScope_FocusScope = require('../FocusScope/FocusScope.cjs');
const RovingFocus_RovingFocusGroup = require('../RovingFocus/RovingFocusGroup.cjs');
const shared_useArrowNavigation = require('../shared/useArrowNavigation.cjs');
const shared_getActiveElement = require('../shared/getActiveElement.cjs');

const [injectMenuContentContext, provideMenuContentContext] = shared_createContext.createContext("MenuContent");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "MenuContentImpl",
  props: /* @__PURE__ */ vue.mergeDefaults({
    loop: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    disableOutsideScroll: { type: Boolean },
    trapFocus: { type: Boolean },
    side: {},
    sideOffset: {},
    align: {},
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
  }, {
    ...Popper_PopperContent.PopperContentPropsDefaultValue
  }),
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "entryFocus", "openAutoFocus", "closeAutoFocus", "dismiss"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const menuContext = Menu_MenuRoot.injectMenuContext();
    const rootContext = Menu_MenuRoot.injectMenuRootContext();
    const { trapFocus, disableOutsidePointerEvents, loop } = vue.toRefs(props);
    shared_useFocusGuards.useFocusGuards();
    shared_useBodyScrollLock.useBodyScrollLock(disableOutsidePointerEvents.value);
    const searchRef = vue.ref("");
    const timerRef = vue.ref(0);
    const pointerGraceTimerRef = vue.ref(0);
    const pointerGraceIntentRef = vue.ref(null);
    const pointerDirRef = vue.ref("right");
    const lastPointerXRef = vue.ref(0);
    const currentItemId = vue.ref(null);
    const rovingFocusGroupRef = vue.ref();
    const { forwardRef, currentElement: contentElement } = shared_useForwardExpose.useForwardExpose();
    const { handleTypeaheadSearch } = shared_useTypeahead.useTypeahead();
    vue.watch(contentElement, (el) => {
      menuContext.onContentChange(el);
    });
    vue.onUnmounted(() => {
      window.clearTimeout(timerRef.value);
    });
    function isPointerMovingToSubmenu(event) {
      const isMovingTowards = pointerDirRef.value === pointerGraceIntentRef.value?.side;
      return isMovingTowards && Menu_utils.isPointerInGraceArea(event, pointerGraceIntentRef.value?.area);
    }
    async function handleMountAutoFocus(event) {
      emits("openAutoFocus", event);
      if (event.defaultPrevented)
        return;
      event.preventDefault();
      contentElement.value?.focus({
        preventScroll: true
      });
    }
    function handleKeyDown(event) {
      if (event.defaultPrevented)
        return;
      const target = event.target;
      const isKeyDownInside = target.closest("[data-reka-menu-content]") === event.currentTarget;
      const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
      const isCharacterKey = event.key.length === 1;
      const el = shared_useArrowNavigation.useArrowNavigation(
        event,
        shared_getActiveElement.getActiveElement(),
        contentElement.value,
        {
          loop: loop.value,
          arrowKeyOptions: "vertical",
          dir: rootContext?.dir.value,
          focus: true,
          attributeName: "[data-reka-collection-item]:not([data-disabled])"
        }
      );
      if (el)
        return el?.focus();
      if (event.code === "Space")
        return;
      const collectionItems = rovingFocusGroupRef.value?.getItems() ?? [];
      if (isKeyDownInside) {
        if (event.key === "Tab")
          event.preventDefault();
        if (!isModifierKey && isCharacterKey)
          handleTypeaheadSearch(event.key, collectionItems);
      }
      if (event.target !== contentElement.value)
        return;
      if (!Menu_utils.FIRST_LAST_KEYS.includes(event.key))
        return;
      event.preventDefault();
      const candidateNodes = [...collectionItems.map((item) => item.ref)];
      if (Menu_utils.LAST_KEYS.includes(event.key))
        candidateNodes.reverse();
      Menu_utils.focusFirst(candidateNodes);
    }
    function handleBlur(event) {
      if (!event?.currentTarget?.contains?.(event.target)) {
        window.clearTimeout(timerRef.value);
        searchRef.value = "";
      }
    }
    function handlePointerMove(event) {
      if (!Menu_utils.isMouseEvent(event))
        return;
      const target = event.target;
      const pointerXHasChanged = lastPointerXRef.value !== event.clientX;
      if (event?.currentTarget?.contains(target) && pointerXHasChanged) {
        const newDir = event.clientX > lastPointerXRef.value ? "right" : "left";
        pointerDirRef.value = newDir;
        lastPointerXRef.value = event.clientX;
      }
    }
    provideMenuContentContext({
      onItemEnter: (event) => {
        if (isPointerMovingToSubmenu(event))
          return true;
        else
          return false;
      },
      onItemLeave: (event) => {
        if (isPointerMovingToSubmenu(event))
          return;
        contentElement.value?.focus();
        currentItemId.value = null;
      },
      onTriggerLeave: (event) => {
        if (isPointerMovingToSubmenu(event))
          return true;
        else
          return false;
      },
      searchRef,
      pointerGraceTimerRef,
      onPointerGraceIntentChange: (intent) => {
        pointerGraceIntentRef.value = intent;
      }
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(FocusScope_FocusScope._sfc_main), {
        "as-child": "",
        trapped: vue.unref(trapFocus),
        onMountAutoFocus: handleMountAutoFocus,
        onUnmountAutoFocus: _cache[7] || (_cache[7] = ($event) => emits("closeAutoFocus", $event))
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(DismissableLayer_DismissableLayer._sfc_main), {
            "as-child": "",
            "disable-outside-pointer-events": vue.unref(disableOutsidePointerEvents),
            onEscapeKeyDown: _cache[2] || (_cache[2] = ($event) => emits("escapeKeyDown", $event)),
            onPointerDownOutside: _cache[3] || (_cache[3] = ($event) => emits("pointerDownOutside", $event)),
            onFocusOutside: _cache[4] || (_cache[4] = ($event) => emits("focusOutside", $event)),
            onInteractOutside: _cache[5] || (_cache[5] = ($event) => emits("interactOutside", $event)),
            onDismiss: _cache[6] || (_cache[6] = ($event) => emits("dismiss"))
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(vue.unref(RovingFocus_RovingFocusGroup._sfc_main), {
                ref_key: "rovingFocusGroupRef",
                ref: rovingFocusGroupRef,
                "current-tab-stop-id": currentItemId.value,
                "onUpdate:currentTabStopId": _cache[0] || (_cache[0] = ($event) => currentItemId.value = $event),
                "as-child": "",
                orientation: "vertical",
                dir: vue.unref(rootContext).dir.value,
                loop: vue.unref(loop),
                onEntryFocus: _cache[1] || (_cache[1] = (event) => {
                  emits("entryFocus", event);
                  if (!vue.unref(rootContext).isUsingKeyboardRef.value) event.preventDefault();
                })
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(vue.unref(Popper_PopperContent._sfc_main), {
                    ref: vue.unref(forwardRef),
                    role: "menu",
                    as: _ctx.as,
                    "as-child": _ctx.asChild,
                    "aria-orientation": "vertical",
                    "data-reka-menu-content": "",
                    "data-state": vue.unref(Menu_utils.getOpenState)(vue.unref(menuContext).open.value),
                    dir: vue.unref(rootContext).dir.value,
                    side: _ctx.side,
                    "side-offset": _ctx.sideOffset,
                    align: _ctx.align,
                    "align-offset": _ctx.alignOffset,
                    "avoid-collisions": _ctx.avoidCollisions,
                    "collision-boundary": _ctx.collisionBoundary,
                    "collision-padding": _ctx.collisionPadding,
                    "arrow-padding": _ctx.arrowPadding,
                    "prioritize-position": _ctx.prioritizePosition,
                    "position-strategy": _ctx.positionStrategy,
                    "update-position-strategy": _ctx.updatePositionStrategy,
                    sticky: _ctx.sticky,
                    "hide-when-detached": _ctx.hideWhenDetached,
                    reference: _ctx.reference,
                    onKeydown: handleKeyDown,
                    onBlur: handleBlur,
                    onPointermove: handlePointerMove
                  }, {
                    default: vue.withCtx(() => [
                      vue.renderSlot(_ctx.$slots, "default")
                    ]),
                    _: 3
                  }, 8, ["as", "as-child", "data-state", "dir", "side", "side-offset", "align", "align-offset", "avoid-collisions", "collision-boundary", "collision-padding", "arrow-padding", "prioritize-position", "position-strategy", "update-position-strategy", "sticky", "hide-when-detached", "reference"])
                ]),
                _: 3
              }, 8, ["current-tab-stop-id", "dir", "loop"])
            ]),
            _: 3
          }, 8, ["disable-outside-pointer-events"])
        ]),
        _: 3
      }, 8, ["trapped"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectMenuContentContext = injectMenuContentContext;
//# sourceMappingURL=MenuContentImpl.cjs.map
