'use strict';

const vue = require('vue');
const Primitive_Slot = require('./Slot.cjs');

const SELF_CLOSING_TAGS = ["area", "img", "input"];
const Primitive = vue.defineComponent({
  name: "Primitive",
  inheritAttrs: false,
  props: {
    asChild: {
      type: Boolean,
      default: false
    },
    as: {
      type: [String, Object],
      default: "div"
    }
  },
  setup(props, { attrs, slots }) {
    const asTag = props.asChild ? "template" : props.as;
    if (typeof asTag === "string" && SELF_CLOSING_TAGS.includes(asTag))
      return () => vue.h(asTag, attrs);
    if (asTag !== "template")
      return () => vue.h(props.as, attrs, { default: slots.default });
    return () => vue.h(Primitive_Slot.Slot, attrs, { default: slots.default });
  }
});

exports.Primitive = Primitive;
//# sourceMappingURL=Primitive.cjs.map
