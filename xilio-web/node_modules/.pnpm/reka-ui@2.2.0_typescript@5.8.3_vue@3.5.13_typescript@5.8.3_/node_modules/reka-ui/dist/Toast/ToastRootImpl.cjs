'use strict';

const vue = require('vue');
const Toast_utils = require('./utils.cjs');
const core = require('@vueuse/core');
const Toast_ToastAnnounce = require('./ToastAnnounce.cjs');
const shared = require('@vueuse/shared');
const Collection_Collection = require('../Collection/Collection.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const shared_getActiveElement = require('../shared/getActiveElement.cjs');
const Toast_ToastProvider = require('./ToastProvider.cjs');

const [injectToastRootContext, provideToastRootContext] = shared_createContext.createContext("ToastRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "ToastRootImpl",
  props: {
    type: {},
    open: { type: Boolean, default: false },
    duration: {},
    asChild: { type: Boolean },
    as: { default: "li" }
  },
  emits: ["close", "escapeKeyDown", "pause", "resume", "swipeStart", "swipeMove", "swipeCancel", "swipeEnd"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    const { CollectionItem } = Collection_Collection.useCollection();
    const providerContext = Toast_ToastProvider.injectToastProviderContext();
    const pointerStartRef = vue.ref(null);
    const swipeDeltaRef = vue.ref(null);
    const duration = vue.computed(
      () => typeof props.duration === "number" ? props.duration : providerContext.duration.value
    );
    const closeTimerStartTimeRef = vue.ref(0);
    const closeTimerRemainingTimeRef = vue.ref(duration.value);
    const closeTimerRef = vue.ref(0);
    const remainingTime = vue.ref(duration.value);
    const remainingRaf = core.useRafFn(() => {
      const elapsedTime = (/* @__PURE__ */ new Date()).getTime() - closeTimerStartTimeRef.value;
      remainingTime.value = Math.max(closeTimerRemainingTimeRef.value - elapsedTime, 0);
    }, { fpsLimit: 60 });
    function startTimer(duration2) {
      if (duration2 <= 0 || duration2 === Number.POSITIVE_INFINITY)
        return;
      if (!shared.isClient)
        return;
      window.clearTimeout(closeTimerRef.value);
      closeTimerStartTimeRef.value = (/* @__PURE__ */ new Date()).getTime();
      closeTimerRef.value = window.setTimeout(handleClose, duration2);
    }
    function handleClose(event) {
      const isNonPointerEvent = event?.pointerType === "";
      const isFocusInToast = currentElement.value?.contains(shared_getActiveElement.getActiveElement());
      if (isFocusInToast && isNonPointerEvent)
        providerContext.viewport.value?.focus();
      if (isNonPointerEvent) {
        providerContext.isClosePausedRef.value = false;
      }
      emits("close");
    }
    const announceTextContent = vue.computed(() => currentElement.value ? Toast_utils.getAnnounceTextContent(currentElement.value) : null);
    if (props.type && !["foreground", "background"].includes(props.type)) {
      const error = "Invalid prop `type` supplied to `Toast`. Expected `foreground | background`.";
      throw new Error(error);
    }
    vue.watchEffect((cleanupFn) => {
      const viewport = providerContext.viewport.value;
      if (viewport) {
        const handleResume = () => {
          startTimer(closeTimerRemainingTimeRef.value);
          remainingRaf.resume();
          emits("resume");
        };
        const handlePause = () => {
          const elapsedTime = (/* @__PURE__ */ new Date()).getTime() - closeTimerStartTimeRef.value;
          closeTimerRemainingTimeRef.value = closeTimerRemainingTimeRef.value - elapsedTime;
          window.clearTimeout(closeTimerRef.value);
          remainingRaf.pause();
          emits("pause");
        };
        viewport.addEventListener(Toast_utils.VIEWPORT_PAUSE, handlePause);
        viewport.addEventListener(Toast_utils.VIEWPORT_RESUME, handleResume);
        return () => {
          viewport.removeEventListener(Toast_utils.VIEWPORT_PAUSE, handlePause);
          viewport.removeEventListener(Toast_utils.VIEWPORT_RESUME, handleResume);
        };
      }
    });
    vue.watch(() => [props.open, duration.value], () => {
      closeTimerRemainingTimeRef.value = duration.value;
      if (props.open && !providerContext.isClosePausedRef.value)
        startTimer(duration.value);
    }, { immediate: true });
    core.onKeyStroke("Escape", (event) => {
      emits("escapeKeyDown", event);
      if (!event.defaultPrevented) {
        providerContext.isFocusedToastEscapeKeyDownRef.value = true;
        handleClose();
      }
    });
    vue.onMounted(() => {
      providerContext.onToastAdd();
    });
    vue.onUnmounted(() => {
      providerContext.onToastRemove();
    });
    provideToastRootContext({ onClose: handleClose });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
        announceTextContent.value ? (vue.openBlock(), vue.createBlock(Toast_ToastAnnounce._sfc_main, {
          key: 0,
          role: "alert",
          "aria-live": _ctx.type === "foreground" ? "assertive" : "polite",
          "aria-atomic": "true"
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode(vue.toDisplayString(announceTextContent.value), 1)
          ]),
          _: 1
        }, 8, ["aria-live"])) : vue.createCommentVNode("", true),
        vue.unref(providerContext).viewport.value ? (vue.openBlock(), vue.createBlock(vue.Teleport, {
          key: 1,
          to: vue.unref(providerContext).viewport.value
        }, [
          vue.createVNode(vue.unref(CollectionItem), null, {
            default: vue.withCtx(() => [
              vue.createVNode(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({
                ref: vue.unref(forwardRef),
                role: "alert",
                "aria-live": "off",
                "aria-atomic": "true",
                tabindex: "0"
              }, _ctx.$attrs, {
                as: _ctx.as,
                "as-child": _ctx.asChild,
                "data-state": _ctx.open ? "open" : "closed",
                "data-swipe-direction": vue.unref(providerContext).swipeDirection.value,
                style: { userSelect: "none", touchAction: "none" },
                onPointerdown: _cache[0] || (_cache[0] = vue.withModifiers((event) => {
                  pointerStartRef.value = { x: event.clientX, y: event.clientY };
                }, ["left"])),
                onPointermove: _cache[1] || (_cache[1] = (event) => {
                  if (!pointerStartRef.value) return;
                  const x = event.clientX - pointerStartRef.value.x;
                  const y = event.clientY - pointerStartRef.value.y;
                  const hasSwipeMoveStarted = Boolean(swipeDeltaRef.value);
                  const isHorizontalSwipe = ["left", "right"].includes(vue.unref(providerContext).swipeDirection.value);
                  const clamp = ["left", "up"].includes(vue.unref(providerContext).swipeDirection.value) ? Math.min : Math.max;
                  const clampedX = isHorizontalSwipe ? clamp(0, x) : 0;
                  const clampedY = !isHorizontalSwipe ? clamp(0, y) : 0;
                  const moveStartBuffer = event.pointerType === "touch" ? 10 : 2;
                  const delta = { x: clampedX, y: clampedY };
                  const eventDetail = { originalEvent: event, delta };
                  if (hasSwipeMoveStarted) {
                    swipeDeltaRef.value = delta;
                    vue.unref(Toast_utils.handleAndDispatchCustomEvent)(vue.unref(Toast_utils.TOAST_SWIPE_MOVE), (ev) => emits("swipeMove", ev), eventDetail);
                  } else if (vue.unref(Toast_utils.isDeltaInDirection)(delta, vue.unref(providerContext).swipeDirection.value, moveStartBuffer)) {
                    swipeDeltaRef.value = delta;
                    vue.unref(Toast_utils.handleAndDispatchCustomEvent)(vue.unref(Toast_utils.TOAST_SWIPE_START), (ev) => emits("swipeStart", ev), eventDetail);
                    event.target.setPointerCapture(event.pointerId);
                  } else if (Math.abs(x) > moveStartBuffer || Math.abs(y) > moveStartBuffer) {
                    pointerStartRef.value = null;
                  }
                }),
                onPointerup: _cache[2] || (_cache[2] = (event) => {
                  const delta = swipeDeltaRef.value;
                  const target = event.target;
                  if (target.hasPointerCapture(event.pointerId)) {
                    target.releasePointerCapture(event.pointerId);
                  }
                  swipeDeltaRef.value = null;
                  pointerStartRef.value = null;
                  if (delta) {
                    const toast = event.currentTarget;
                    const eventDetail = { originalEvent: event, delta };
                    if (vue.unref(Toast_utils.isDeltaInDirection)(delta, vue.unref(providerContext).swipeDirection.value, vue.unref(providerContext).swipeThreshold.value)) {
                      vue.unref(Toast_utils.handleAndDispatchCustomEvent)(vue.unref(Toast_utils.TOAST_SWIPE_END), (ev) => emits("swipeEnd", ev), eventDetail);
                    } else {
                      vue.unref(Toast_utils.handleAndDispatchCustomEvent)(vue.unref(Toast_utils.TOAST_SWIPE_CANCEL), (ev) => emits("swipeCancel", ev), eventDetail);
                    }
                    toast?.addEventListener("click", (event2) => event2.preventDefault(), {
                      once: true
                    });
                  }
                })
              }), {
                default: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "default", {
                    remaining: remainingTime.value,
                    duration: duration.value
                  })
                ]),
                _: 3
              }, 16, ["as", "as-child", "data-state", "data-swipe-direction"])
            ]),
            _: 3
          })
        ], 8, ["to"])) : vue.createCommentVNode("", true)
      ], 64);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectToastRootContext = injectToastRootContext;
//# sourceMappingURL=ToastRootImpl.cjs.map
