import { defineComponent, Comment, mergeProps, cloneVNode } from 'vue';
import { r as renderSlotFragments } from '../shared/renderSlotFragments.js';

const Slot = defineComponent({
  name: "PrimitiveSlot",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      if (!slots.default)
        return null;
      const childrens = renderSlotFragments(slots.default());
      const firstNonCommentChildrenIndex = childrens.findIndex((child) => child.type !== Comment);
      if (firstNonCommentChildrenIndex === -1)
        return childrens;
      const firstNonCommentChildren = childrens[firstNonCommentChildrenIndex];
      delete firstNonCommentChildren.props?.ref;
      const mergedProps = firstNonCommentChildren.props ? mergeProps(attrs, firstNonCommentChildren.props) : attrs;
      if (attrs.class && firstNonCommentChildren.props?.class)
        delete firstNonCommentChildren.props.class;
      const cloned = cloneVNode(firstNonCommentChildren, mergedProps);
      for (const prop in mergedProps) {
        if (prop.startsWith("on")) {
          cloned.props ||= {};
          cloned.props[prop] = mergedProps[prop];
        }
      }
      if (childrens.length === 1)
        return cloned;
      childrens[firstNonCommentChildrenIndex] = cloned;
      return childrens;
    };
  }
});

export { Slot as S };
//# sourceMappingURL=Slot.js.map
