import { Fragment } from 'vue';

function renderSlotFragments(children) {
  if (!children)
    return [];
  return children.flatMap((child) => {
    if (child.type === Fragment)
      return renderSlotFragments(child.children);
    return [child];
  });
}

export { renderSlotFragments as r };
//# sourceMappingURL=renderSlotFragments.js.map
