import * as vue from 'vue';
import { i as injectConfigProviderContext } from '../ConfigProvider/ConfigProvider.js';

let count = 0;
function useId(deterministicId, prefix = "reka") {
  if (deterministicId)
    return deterministicId;
  const configProviderContext = injectConfigProviderContext({ useId: void 0 });
  if (vue.useId) {
    return `${prefix}-${vue.useId()}`;
  } else if (configProviderContext.useId) {
    return `${prefix}-${configProviderContext.useId()}`;
  }
  return `${prefix}-${++count}`;
}

export { useId as u };
//# sourceMappingURL=useId.js.map
