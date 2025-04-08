'use strict';

const vue = require('vue');
const shared = require('@vueuse/shared');
const FocusScope_utils = require('./utils.cjs');
const FocusScope_stack = require('./stack.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_getActiveElement = require('../shared/getActiveElement.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "FocusScope",
  props: {
    loop: { type: Boolean, default: false },
    trapped: { type: Boolean, default: false },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { currentRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    const lastFocusedElementRef = vue.ref(null);
    const focusScopesStack = FocusScope_stack.createFocusScopesStack();
    const focusScope = vue.reactive({
      paused: false,
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      }
    });
    vue.watchEffect((cleanupFn) => {
      if (!shared.isClient)
        return;
      const container = currentElement.value;
      if (!props.trapped)
        return;
      function handleFocusIn(event) {
        if (focusScope.paused || !container)
          return;
        const target = event.target;
        if (container.contains(target))
          lastFocusedElementRef.value = target;
        else FocusScope_utils.focus(lastFocusedElementRef.value, { select: true });
      }
      function handleFocusOut(event) {
        if (focusScope.paused || !container)
          return;
        const relatedTarget = event.relatedTarget;
        if (relatedTarget === null)
          return;
        if (!container.contains(relatedTarget))
          FocusScope_utils.focus(lastFocusedElementRef.value, { select: true });
      }
      function handleMutations(mutations) {
        const isLastFocusedElementExist = container.contains(lastFocusedElementRef.value);
        if (!isLastFocusedElementExist)
          FocusScope_utils.focus(container);
      }
      document.addEventListener("focusin", handleFocusIn);
      document.addEventListener("focusout", handleFocusOut);
      const mutationObserver = new MutationObserver(handleMutations);
      if (container)
        mutationObserver.observe(container, { childList: true, subtree: true });
      cleanupFn(() => {
        document.removeEventListener("focusin", handleFocusIn);
        document.removeEventListener("focusout", handleFocusOut);
        mutationObserver.disconnect();
      });
    });
    vue.watchEffect(async (cleanupFn) => {
      const container = currentElement.value;
      await vue.nextTick();
      if (!container)
        return;
      focusScopesStack.add(focusScope);
      const previouslyFocusedElement = shared_getActiveElement.getActiveElement();
      const hasFocusedCandidate = container.contains(previouslyFocusedElement);
      if (!hasFocusedCandidate) {
        const mountEvent = new CustomEvent(FocusScope_utils.AUTOFOCUS_ON_MOUNT, FocusScope_utils.EVENT_OPTIONS);
        container.addEventListener(FocusScope_utils.AUTOFOCUS_ON_MOUNT, (ev) => emits("mountAutoFocus", ev));
        container.dispatchEvent(mountEvent);
        if (!mountEvent.defaultPrevented) {
          FocusScope_utils.focusFirst(FocusScope_stack.removeLinks(FocusScope_utils.getTabbableCandidates(container)), {
            select: true
          });
          if (shared_getActiveElement.getActiveElement() === previouslyFocusedElement)
            FocusScope_utils.focus(container);
        }
      }
      cleanupFn(() => {
        container.removeEventListener(FocusScope_utils.AUTOFOCUS_ON_MOUNT, (ev) => emits("mountAutoFocus", ev));
        const unmountEvent = new CustomEvent(FocusScope_utils.AUTOFOCUS_ON_UNMOUNT, FocusScope_utils.EVENT_OPTIONS);
        const unmountEventHandler = (ev) => {
          emits("unmountAutoFocus", ev);
        };
        container.addEventListener(FocusScope_utils.AUTOFOCUS_ON_UNMOUNT, unmountEventHandler);
        container.dispatchEvent(unmountEvent);
        setTimeout(() => {
          if (!unmountEvent.defaultPrevented)
            FocusScope_utils.focus(previouslyFocusedElement ?? document.body, { select: true });
          container.removeEventListener(FocusScope_utils.AUTOFOCUS_ON_UNMOUNT, unmountEventHandler);
          focusScopesStack.remove(focusScope);
        }, 0);
      });
    });
    function handleKeyDown(event) {
      if (!props.loop && !props.trapped)
        return;
      if (focusScope.paused)
        return;
      const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
      const focusedElement = shared_getActiveElement.getActiveElement();
      if (isTabKey && focusedElement) {
        const container = event.currentTarget;
        const [first, last] = FocusScope_utils.getTabbableEdges(container);
        const hasTabbableElementsInside = first && last;
        if (!hasTabbableElementsInside) {
          if (focusedElement === container)
            event.preventDefault();
        } else {
          if (!event.shiftKey && focusedElement === last) {
            event.preventDefault();
            if (props.loop)
              FocusScope_utils.focus(first, { select: true });
          } else if (event.shiftKey && focusedElement === first) {
            event.preventDefault();
            if (props.loop)
              FocusScope_utils.focus(last, { select: true });
          }
        }
      }
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        ref_key: "currentRef",
        ref: currentRef,
        tabindex: "-1",
        "as-child": _ctx.asChild,
        as: _ctx.as,
        onKeydown: handleKeyDown
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as-child", "as"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=FocusScope.cjs.map
