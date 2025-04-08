'use strict';

const vue = require('vue');
const Presence_usePresence = require('./usePresence.cjs');
const core = require('@vueuse/core');
const shared_renderSlotFragments = require('../shared/renderSlotFragments.cjs');

const Presence = vue.defineComponent({
  name: "Presence",
  props: {
    present: {
      type: Boolean,
      required: true
    },
    forceMount: {
      type: Boolean
    }
  },
  slots: {},
  setup(props, { slots, expose }) {
    const { present, forceMount } = vue.toRefs(props);
    const node = vue.ref();
    const { isPresent } = Presence_usePresence.usePresence(present, node);
    expose({ present: isPresent });
    let children = slots.default({ present: isPresent.value });
    children = shared_renderSlotFragments.renderSlotFragments(children || []);
    const instance = vue.getCurrentInstance();
    if (children && children?.length > 1) {
      const componentName = instance?.parent?.type.name ? `<${instance.parent.type.name} />` : "component";
      throw new Error(
        [
          `Detected an invalid children for \`${componentName}\` for  \`Presence\` component.`,
          "",
          "Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
          "You can apply a few solutions:",
          [
            "Provide a single child element so that `presence` directive attach correctly.",
            "Ensure the first child is an actual element instead of a raw text node or comment node."
          ].map((line) => `  - ${line}`).join("\n")
        ].join("\n")
      );
    }
    return () => {
      if (forceMount.value || present.value || isPresent.value) {
        return vue.h(slots.default({ present: isPresent.value })[0], {
          ref: (v) => {
            const el = core.unrefElement(v);
            if (typeof el?.hasAttribute === "undefined")
              return el;
            if (el?.hasAttribute("data-reka-popper-content-wrapper"))
              node.value = el.firstElementChild;
            else
              node.value = el;
            return el;
          }
        });
      } else {
        return null;
      }
    };
  }
});

exports.Presence = Presence;
//# sourceMappingURL=Presence.cjs.map
