'use strict';

function flatten(items) {
  return items.reduce((acc, item) => {
    acc.push(item);
    if (item.children)
      acc.push(...flatten(item.children));
    return acc;
  }, []);
}

exports.flatten = flatten;
//# sourceMappingURL=utils.cjs.map
