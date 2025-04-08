'use strict';

const vue = require('vue');
const shared_renderSlotFragments = require('../shared/renderSlotFragments.cjs');

const Slot = vue.defineComponent({
  name: "PrimitiveSlot",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      if (!slots.default)
        return null;
      const childrens = shared_renderSlotFragments.renderSlotFragments(slots.default());
      const firstNonCommentChildrenIndex = childrens.findIndex((child) => child.type !== vue.Comment);
      if (firstNonCommentChildrenIndex === -1)
        return childrens;
      const firstNonCommentChildren = childrens[firstNonCommentChildrenIndex];
      delete firstNonCommentChildren.props?.ref;
      const mergedProps = firstNonCommentChildren.props ? vue.mergeProps(attrs, firstNonCommentChildren.props) : attrs;
      if (attrs.class && firstNonCommentChildren.props?.class)
        delete firstNonCommentChildren.props.class;
      const cloned = vue.cloneVNode(firstNonCommentChildren, mergedProps);
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

exports.Slot = Slot;
//# sourceMappingURL=Slot.cjs.map
