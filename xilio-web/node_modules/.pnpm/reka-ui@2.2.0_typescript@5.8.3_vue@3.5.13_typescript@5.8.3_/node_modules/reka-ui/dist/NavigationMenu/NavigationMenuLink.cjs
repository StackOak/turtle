'use strict';

const vue = require('vue');
const NavigationMenu_utils = require('./utils.cjs');
const Collection_Collection = require('../Collection/Collection.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "NavigationMenuLink",
  props: {
    active: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "a" }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { CollectionItem } = Collection_Collection.useCollection({ key: "NavigationMenu" });
    shared_useForwardExpose.useForwardExpose();
    async function handleClick(ev) {
      const linkSelectEvent = new CustomEvent(NavigationMenu_utils.LINK_SELECT, {
        bubbles: true,
        cancelable: true,
        detail: {
          originalEvent: ev
        }
      });
      emits("select", linkSelectEvent);
      if (!linkSelectEvent.defaultPrevented && !ev.metaKey) {
        const rootContentDismissEvent = new CustomEvent(
          NavigationMenu_utils.EVENT_ROOT_CONTENT_DISMISS,
          {
            bubbles: true,
            cancelable: true
          }
        );
        ev.target?.dispatchEvent(rootContentDismissEvent);
      }
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(CollectionItem), null, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), {
            as: _ctx.as,
            "data-active": _ctx.active ? "" : void 0,
            "aria-current": _ctx.active ? "page" : void 0,
            "as-child": props.asChild,
            onClick: handleClick
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["as", "data-active", "aria-current", "as-child"])
        ]),
        _: 3
      });
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=NavigationMenuLink.cjs.map
