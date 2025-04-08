'use strict';

const core = require('@vueuse/core');
const vue = require('vue');

function useSize(element) {
  const size = vue.ref();
  const width = vue.computed(() => size.value?.width ?? 0);
  const height = vue.computed(() => size.value?.height ?? 0);
  vue.onMounted(() => {
    const el = core.unrefElement(element);
    if (el) {
      size.value = { width: el.offsetWidth, height: el.offsetHeight };
      const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries))
          return;
        if (!entries.length)
          return;
        const entry = entries[0];
        let width2;
        let height2;
        if ("borderBoxSize" in entry) {
          const borderSizeEntry = entry.borderBoxSize;
          const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
          width2 = borderSize.inlineSize;
          height2 = borderSize.blockSize;
        } else {
          width2 = el.offsetWidth;
          height2 = el.offsetHeight;
        }
        size.value = { width: width2, height: height2 };
      });
      resizeObserver.observe(el, { box: "border-box" });
      return () => resizeObserver.unobserve(el);
    } else {
      size.value = void 0;
    }
  });
  return {
    width,
    height
  };
}

exports.useSize = useSize;
//# sourceMappingURL=useSize.cjs.map
