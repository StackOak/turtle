import { isEqual } from 'ohash';
import { i as isNullish } from './nullish.js';

function isValueEqualOrExist(base, current) {
  if (isNullish(base))
    return false;
  if (Array.isArray(base)) {
    return base.some((val) => isEqual(val, current));
  } else {
    return isEqual(base, current);
  }
}

export { isValueEqualOrExist as i };
//# sourceMappingURL=isValueEqualOrExist.js.map
