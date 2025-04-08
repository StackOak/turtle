import { ref, computed } from 'vue';
import { i as injectConfigProviderContext } from '../ConfigProvider/ConfigProvider.js';

function useNonce(nonce) {
  const context = injectConfigProviderContext({
    nonce: ref()
  });
  return computed(() => nonce?.value || context.nonce?.value);
}

export { useNonce as u };
//# sourceMappingURL=useNonce.js.map
