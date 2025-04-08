import { ref, computed } from 'vue';
import { i as injectConfigProviderContext } from '../ConfigProvider/ConfigProvider.js';

function useLocale(locale) {
  const context = injectConfigProviderContext({
    locale: ref("en")
  });
  return computed(() => locale?.value || context.locale?.value || "en");
}

export { useLocale as u };
//# sourceMappingURL=useLocale.js.map
