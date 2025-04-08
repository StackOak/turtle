import { defineComponent, createBlock, openBlock, unref, withCtx, createVNode, renderSlot } from 'vue';
import { L as LINK_SELECT, E as EVENT_ROOT_CONTENT_DISMISS } from './utils.js';
import { u as useCollection } from '../Collection/Collection.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
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
    const { CollectionItem } = useCollection({ key: "NavigationMenu" });
    useForwardExpose();
    async function handleClick(ev) {
      const linkSelectEvent = new CustomEvent(LINK_SELECT, {
        bubbles: true,
        cancelable: true,
        detail: {
          originalEvent: ev
        }
      });
      emits("select", linkSelectEvent);
      if (!linkSelectEvent.defaultPrevented && !ev.metaKey) {
        const rootContentDismissEvent = new CustomEvent(
          EVENT_ROOT_CONTENT_DISMISS,
          {
            bubbles: true,
            cancelable: true
          }
        );
        ev.target?.dispatchEvent(rootContentDismissEvent);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(CollectionItem), null, {
        default: withCtx(() => [
          createVNode(unref(Primitive), {
            as: _ctx.as,
            "data-active": _ctx.active ? "" : void 0,
            "aria-current": _ctx.active ? "page" : void 0,
            "as-child": props.asChild,
            onClick: handleClick
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["as", "data-active", "aria-current", "as-child"])
        ]),
        _: 3
      });
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=NavigationMenuLink.js.map
