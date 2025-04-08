import { ref, onMounted, watch, onUnmounted } from 'vue';

function useImageLoadingStatus(src, referrerPolicy) {
  const loadingStatus = ref("idle");
  const isMounted = ref(false);
  const updateStatus = (status) => () => {
    if (isMounted.value)
      loadingStatus.value = status;
  };
  onMounted(() => {
    isMounted.value = true;
    watch([() => src.value, () => referrerPolicy?.value], ([src2, referrer]) => {
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
  onUnmounted(() => {
    isMounted.value = false;
  });
  return loadingStatus;
}

export { useImageLoadingStatus as u };
//# sourceMappingURL=utils.js.map
