'use strict';

const core = require('@vueuse/core');
const shared = require('@vueuse/shared');
const vue = require('vue');
const defu = require('defu');
const ConfigProvider_ConfigProvider = require('../ConfigProvider/ConfigProvider.cjs');

const useBodyLockStackCount = core.createSharedComposable(() => {
  const map = vue.ref(/* @__PURE__ */ new Map());
  const initialOverflow = vue.ref();
  const locked = vue.computed(() => {
    for (const value of map.value.values()) {
      if (value)
        return true;
    }
    return false;
  });
  const context = ConfigProvider_ConfigProvider.injectConfigProviderContext({
    scrollBody: vue.ref(true)
  });
  let stopTouchMoveListener = null;
  const resetBodyStyle = () => {
    document.body.style.paddingRight = "";
    document.body.style.marginRight = "";
    document.body.style.pointerEvents = "";
    document.body.style.removeProperty("--scrollbar-width");
    document.body.style.overflow = initialOverflow.value ?? "";
    shared.isIOS && stopTouchMoveListener?.();
    initialOverflow.value = void 0;
  };
  vue.watch(locked, (val, oldVal) => {
    if (!shared.isClient)
      return;
    if (!val) {
      if (oldVal)
        resetBodyStyle();
      return;
    }
    if (initialOverflow.value === void 0)
      initialOverflow.value = document.body.style.overflow;
    const verticalScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const defaultConfig = { padding: verticalScrollbarWidth, margin: 0 };
    const config = context.scrollBody?.value ? typeof context.scrollBody.value === "object" ? defu.defu({
      padding: context.scrollBody.value.padding === true ? verticalScrollbarWidth : context.scrollBody.value.padding,
      margin: context.scrollBody.value.margin === true ? verticalScrollbarWidth : context.scrollBody.value.margin
    }, defaultConfig) : defaultConfig : { padding: 0, margin: 0 };
    if (verticalScrollbarWidth > 0) {
      document.body.style.paddingRight = typeof config.padding === "number" ? `${config.padding}px` : String(config.padding);
      document.body.style.marginRight = typeof config.margin === "number" ? `${config.margin}px` : String(config.margin);
      document.body.style.setProperty("--scrollbar-width", `${verticalScrollbarWidth}px`);
      document.body.style.overflow = "hidden";
    }
    if (shared.isIOS) {
      stopTouchMoveListener = core.useEventListener(
        document,
        "touchmove",
        (e) => preventDefault(e),
        { passive: false }
      );
    }
    vue.nextTick(() => {
      document.body.style.pointerEvents = "none";
      document.body.style.overflow = "hidden";
    });
  }, { immediate: true, flush: "sync" });
  return map;
});
function useBodyScrollLock(initialState) {
  const id = Math.random().toString(36).substring(2, 7);
  const map = useBodyLockStackCount();
  map.value.set(id, initialState ?? false);
  const locked = vue.computed({
    get: () => map.value.get(id) ?? false,
    set: (value) => map.value.set(id, value)
  });
  shared.tryOnBeforeUnmount(() => {
    map.value.delete(id);
  });
  return locked;
}
function checkOverflowScroll(ele) {
  const style = window.getComputedStyle(ele);
  if (style.overflowX === "scroll" || style.overflowY === "scroll" || style.overflowX === "auto" && ele.clientWidth < ele.scrollWidth || style.overflowY === "auto" && ele.clientHeight < ele.scrollHeight) {
    return true;
  } else {
    const parent = ele.parentNode;
    if (!(parent instanceof Element) || parent.tagName === "BODY")
      return false;
    return checkOverflowScroll(parent);
  }
}
function preventDefault(rawEvent) {
  const e = rawEvent || window.event;
  const _target = e.target;
  if (_target instanceof Element && checkOverflowScroll(_target))
    return false;
  if (e.touches.length > 1)
    return true;
  if (e.preventDefault && e.cancelable)
    e.preventDefault();
  return false;
}

exports.useBodyScrollLock = useBodyScrollLock;
//# sourceMappingURL=useBodyScrollLock.cjs.map
