import { ref, computed } from 'vue';
import { i as injectConfigProviderContext } from '../ConfigProvider/ConfigProvider.js';

function useDirection(dir) {
  const context = injectConfigProviderContext({
    dir: ref("ltr")
  });
  return computed(() => dir?.value || context.dir?.value || "ltr");
}

export { useDirection as u };
//# sourceMappingURL=useDirection.js.map
