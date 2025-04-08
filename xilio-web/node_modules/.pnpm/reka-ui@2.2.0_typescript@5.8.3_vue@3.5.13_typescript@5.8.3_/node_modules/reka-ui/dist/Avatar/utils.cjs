'use strict';

const vue = require('vue');

function useImageLoadingStatus(src, referrerPolicy) {
  const loadingStatus = vue.ref("idle");
  const isMounted = vue.ref(false);
  const updateStatus = (status) => () => {
    if (isMounted.value)
      loadingStatus.value = status;
  };
  vue.onMounted(() => {
    isMounted.value = true;
    vue.watch([() => src.value, () => referrerPolicy?.value], ([src2, referrer]) => {
      if (!src2) {
        loadingStatus.value = "error";
      } else {
        const image = new window.Image();
        loadingStatus.value = "loading";
        image.onload = updateStatus("loaded");
        image.onerror = updateStatus("error");
        image.src = src2;
        if (referrer) {
          image.referrerPolicy = referrer;
        }
      }
    }, { immediate: true });
  });
  vue.onUnmounted(() => {
    isMounted.value = false;
  });
  return loadingStatus;
}

exports.useImageLoadingStatus = useImageLoadingStatus;
//# sourceMappingURL=utils.cjs.map
