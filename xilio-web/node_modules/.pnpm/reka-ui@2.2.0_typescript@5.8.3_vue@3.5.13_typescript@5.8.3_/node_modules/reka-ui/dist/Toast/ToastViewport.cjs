'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const Toast_FocusProxy = require('./FocusProxy.cjs');
const FocusScope_utils = require('../FocusScope/utils.cjs');
const Toast_utils = require('./utils.cjs');
const DismissableLayer_DismissableLayerBranch = require('../DismissableLayer/DismissableLayerBranch.cjs');
const Collection_Collection = require('../Collection/Collection.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const shared_getActiveElement = require('../shared/getActiveElement.cjs');
const Toast_ToastProvider = require('./ToastProvider.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const { hotkey, label } = vue.toRefs(props);
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    const { CollectionSlot, getItems } = Collection_Collection.useCollection();
    const providerContext = Toast_ToastProvider.injectToastProviderContext();
    const hasToasts = vue.computed(() => providerContext.toastCount.value > 0);
    const headFocusProxyRef = vue.ref();
    const tailFocusProxyRef = vue.ref();
    const hotkeyMessage = vue.computed(() => hotkey.value.join("+").replace(/Key/g, "").replace(/Digit/g, ""));
    core.onKeyStroke(hotkey.value, () => {
      currentElement.value.focus();
    });
    vue.onMounted(() => {
      providerContext.onViewportChange(currentElement.value);
    });
    vue.watchEffect((cleanupFn) => {
      const viewport = currentElement.value;
      if (hasToasts.value && viewport) {
        const handlePause = () => {
          if (!providerContext.isClosePausedRef.value) {
            const pauseEvent = new CustomEvent(Toast_utils.VIEWPORT_PAUSE);
            viewport.dispatchEvent(pauseEvent);
            providerContext.isClosePausedRef.value = true;
          }
        };
        const handleResume = () => {
          if (providerContext.isClosePausedRef.value) {
            const resumeEvent = new CustomEvent(Toast_utils.VIEWPORT_RESUME);
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
          const isFocusInside = viewport.contains(shared_getActiveElement.getActiveElement());
          if (!isFocusInside)
            handleResume();
        };
        const handleKeyDown = (event) => {
          const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
          const isTabKey = event.key === "Tab" && !isMetaKey;
          if (isTabKey) {
            const focusedElement = shared_getActiveElement.getActiveElement();
            const isTabbingBackwards = event.shiftKey;
            const targetIsViewport = event.target === viewport;
            if (targetIsViewport && isTabbingBackwards) {
              headFocusProxyRef.value?.focus();
              return;
            }
            const tabbingDirection = isTabbingBackwards ? "backwards" : "forwards";
            const sortedCandidates = getSortedTabbableCandidates({ tabbingDirection });
            const index = sortedCandidates.findIndex((candidate) => candidate === focusedElement);
            if (FocusScope_utils.focusFirst(sortedCandidates.slice(index + 1))) {
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
        const toastTabbableCandidates = [toastNode, ...FocusScope_utils.getTabbableCandidates(toastNode)];
        return tabbingDirection === "forwards" ? toastTabbableCandidates : toastTabbableCandidates.reverse();
      });
      return (tabbingDirection === "forwards" ? tabbableCandidates.reverse() : tabbableCandidates).flat();
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(DismissableLayer_DismissableLayerBranch._sfc_main), {
        role: "region",
        "aria-label": typeof vue.unref(label) === "string" ? vue.unref(label).replace("{hotkey}", hotkeyMessage.value) : vue.unref(label)(hotkeyMessage.value),
        tabindex: "-1",
        style: vue.normalizeStyle({
          // incase list has size when empty (e.g. padding), we remove pointer events so
          // it doesn't prevent interactions with page elements that it overlays
          pointerEvents: hasToasts.value ? void 0 : "none"
        })
      }, {
        default: vue.withCtx(() => [
          hasToasts.value ? (vue.openBlock(), vue.createBlock(Toast_FocusProxy._sfc_main, {
            key: 0,
            ref: (node) => {
              headFocusProxyRef.value = vue.unref(core.unrefElement)(node);
              return void 0;
            },
            onFocusFromOutsideViewport: _cache[0] || (_cache[0] = () => {
              const tabbableCandidates = getSortedTabbableCandidates({
                tabbingDirection: "forwards"
              });
              vue.unref(FocusScope_utils.focusFirst)(tabbableCandidates);
            })
          }, null, 512)) : vue.createCommentVNode("", true),
          vue.createVNode(vue.unref(CollectionSlot), null, {
            default: vue.withCtx(() => [
              vue.createVNode(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({
                ref: vue.unref(forwardRef),
                tabindex: "-1",
                as: _ctx.as,
                "as-child": _ctx.asChild
              }, _ctx.$attrs), {
                default: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 16, ["as", "as-child"])
            ]),
            _: 3
          }),
          hasToasts.value ? (vue.openBlock(), vue.createBlock(Toast_FocusProxy._sfc_main, {
            key: 1,
            ref: (node) => {
              tailFocusProxyRef.value = vue.unref(core.unrefElement)(node);
              return void 0;
            },
            onFocusFromOutsideViewport: _cache[1] || (_cache[1] = () => {
              const tabbableCandidates = getSortedTabbableCandidates({
                tabbingDirection: "backwards"
              });
              vue.unref(FocusScope_utils.focusFirst)(tabbableCandidates);
            })
          }, null, 512)) : vue.createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["aria-label", "style"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ToastViewport.cjs.map
