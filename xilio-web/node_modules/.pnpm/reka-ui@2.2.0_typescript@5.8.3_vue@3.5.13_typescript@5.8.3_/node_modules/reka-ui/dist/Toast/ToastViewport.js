import { defineComponent, toRefs, computed, ref, onMounted, watchEffect, createBlock, openBlock, unref, normalizeStyle, withCtx, createCommentVNode, createVNode, mergeProps, renderSlot } from 'vue';
import { onKeyStroke, unrefElement } from '@vueuse/core';
import { _ as _sfc_main$2 } from './FocusProxy.js';
import { f as focusFirst, g as getTabbableCandidates } from '../FocusScope/utils.js';
import { V as VIEWPORT_PAUSE, a as VIEWPORT_RESUME } from './utils.js';
import { _ as _sfc_main$1 } from '../DismissableLayer/DismissableLayerBranch.js';
import { u as useCollection } from '../Collection/Collection.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { g as getActiveElement } from '../shared/getActiveElement.js';
import { i as injectToastProviderContext } from './ToastProvider.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "ToastViewport",
  props: {
    hotkey: { default: () => ["F8"] },
    label: { type: [String, Function], default: "Notifications ({hotkey})" },
    asChild: { type: Boolean },
    as: { default: "ol" }
  },
  setup(__props) {
    const props = __props;
    const { hotkey, label } = toRefs(props);
    const { forwardRef, currentElement } = useForwardExpose();
    const { CollectionSlot, getItems } = useCollection();
    const providerContext = injectToastProviderContext();
    const hasToasts = computed(() => providerContext.toastCount.value > 0);
    const headFocusProxyRef = ref();
    const tailFocusProxyRef = ref();
    const hotkeyMessage = computed(() => hotkey.value.join("+").replace(/Key/g, "").replace(/Digit/g, ""));
    onKeyStroke(hotkey.value, () => {
      currentElement.value.focus();
    });
    onMounted(() => {
      providerContext.onViewportChange(currentElement.value);
    });
    watchEffect((cleanupFn) => {
      const viewport = currentElement.value;
      if (hasToasts.value && viewport) {
        const handlePause = () => {
          if (!providerContext.isClosePausedRef.value) {
            const pauseEvent = new CustomEvent(VIEWPORT_PAUSE);
            viewport.dispatchEvent(pauseEvent);
            providerContext.isClosePausedRef.value = true;
          }
        };
        const handleResume = () => {
          if (providerContext.isClosePausedRef.value) {
            const resumeEvent = new CustomEvent(VIEWPORT_RESUME);
            viewport.dispatchEvent(resumeEvent);
            providerContext.isClosePausedRef.value = false;
          }
        };
        const handleFocusOutResume = (event) => {
          const isFocusMovingOutside = !viewport.contains(event.relatedTarget);
          if (isFocusMovingOutside)
            handleResume();
        };
        const handlePointerLeaveResume = () => {
          const isFocusInside = viewport.contains(getActiveElement());
          if (!isFocusInside)
            handleResume();
        };
        const handleKeyDown = (event) => {
          const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
          const isTabKey = event.key === "Tab" && !isMetaKey;
          if (isTabKey) {
            const focusedElement = getActiveElement();
            const isTabbingBackwards = event.shiftKey;
            const targetIsViewport = event.target === viewport;
            if (targetIsViewport && isTabbingBackwards) {
              headFocusProxyRef.value?.focus();
              return;
            }
            const tabbingDirection = isTabbingBackwards ? "backwards" : "forwards";
            const sortedCandidates = getSortedTabbableCandidates({ tabbingDirection });
            const index = sortedCandidates.findIndex((candidate) => candidate === focusedElement);
            if (focusFirst(sortedCandidates.slice(index + 1))) {
              event.preventDefault();
            } else {
              isTabbingBackwards ? headFocusProxyRef.value?.focus() : tailFocusProxyRef.value?.focus();
            }
          }
        };
        viewport.addEventListener("focusin", handlePause);
        viewport.addEventListener("focusout", handleFocusOutResume);
        viewport.addEventListener("pointermove", handlePause);
        viewport.addEventListener("pointerleave", handlePointerLeaveResume);
        viewport.addEventListener("keydown", handleKeyDown);
        window.addEventListener("blur", handlePause);
        window.addEventListener("focus", handleResume);
        cleanupFn(() => {
          viewport.removeEventListener("focusin", handlePause);
          viewport.removeEventListener("focusout", handleFocusOutResume);
          viewport.removeEventListener("pointermove", handlePause);
          viewport.removeEventListener("pointerleave", handlePointerLeaveResume);
          viewport.removeEventListener("keydown", handleKeyDown);
          window.removeEventListener("blur", handlePause);
          window.removeEventListener("focus", handleResume);
        });
      }
    });
    function getSortedTabbableCandidates({ tabbingDirection }) {
      const toastItems = getItems().map((i) => i.ref);
      const tabbableCandidates = toastItems.map((toastNode) => {
        const toastTabbableCandidates = [toastNode, ...getTabbableCandidates(toastNode)];
        return tabbingDirection === "forwards" ? toastTabbableCandidates : toastTabbableCandidates.reverse();
      });
      return (tabbingDirection === "forwards" ? tabbableCandidates.reverse() : tabbableCandidates).flat();
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), {
        role: "region",
        "aria-label": typeof unref(label) === "string" ? unref(label).replace("{hotkey}", hotkeyMessage.value) : unref(label)(hotkeyMessage.value),
        tabindex: "-1",
        style: normalizeStyle({
          // incase list has size when empty (e.g. padding), we remove pointer events so
          // it doesn't prevent interactions with page elements that it overlays
          pointerEvents: hasToasts.value ? void 0 : "none"
        })
      }, {
        default: withCtx(() => [
          hasToasts.value ? (openBlock(), createBlock(_sfc_main$2, {
            key: 0,
            ref: (node) => {
              headFocusProxyRef.value = unref(unrefElement)(node);
              return void 0;
            },
            onFocusFromOutsideViewport: _cache[0] || (_cache[0] = () => {
              const tabbableCandidates = getSortedTabbableCandidates({
                tabbingDirection: "forwards"
              });
              unref(focusFirst)(tabbableCandidates);
            })
          }, null, 512)) : createCommentVNode("", true),
          createVNode(unref(CollectionSlot), null, {
            default: withCtx(() => [
              createVNode(unref(Primitive), mergeProps({
                ref: unref(forwardRef),
                tabindex: "-1",
                as: _ctx.as,
                "as-child": _ctx.asChild
              }, _ctx.$attrs), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 16, ["as", "as-child"])
            ]),
            _: 3
          }),
          hasToasts.value ? (openBlock(), createBlock(_sfc_main$2, {
            key: 1,
            ref: (node) => {
              tailFocusProxyRef.value = unref(unrefElement)(node);
              return void 0;
            },
            onFocusFromOutsideViewport: _cache[1] || (_cache[1] = () => {
              const tabbableCandidates = getSortedTabbableCandidates({
                tabbingDirection: "backwards"
              });
              unref(focusFirst)(tabbableCandidates);
            })
          }, null, 512)) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["aria-label", "style"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ToastViewport.js.map
