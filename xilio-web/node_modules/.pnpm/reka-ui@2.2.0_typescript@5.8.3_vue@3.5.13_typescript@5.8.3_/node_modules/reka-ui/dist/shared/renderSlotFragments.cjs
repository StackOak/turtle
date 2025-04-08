'use strict';

const vue = require('vue');

function renderSlotFragments(children) {
  if (!children)
    return [];
  return children.flatMap((child) => {
    if (child.type === vue.Fragment)
      return renderSlotFragments(child.children);
    return [child];
  });
}

exports.renderSlotFragments = renderSlotFragments;
//# sourceMappingURL=renderSlotFragments.cjs.map
