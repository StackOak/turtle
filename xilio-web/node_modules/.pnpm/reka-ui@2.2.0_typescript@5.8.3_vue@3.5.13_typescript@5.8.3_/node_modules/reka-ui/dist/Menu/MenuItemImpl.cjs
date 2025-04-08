'use strict';

const vue = require('vue');
const Menu_utils = require('./utils.cjs');
const Collection_Collection = require('../Collection/Collection.cjs');
const Menu_MenuContentImpl = require('./MenuContentImpl.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "MenuItemImpl",
  props: {
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const contentContext = Menu_MenuContentImpl.injectMenuContentContext();
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    const { CollectionItem } = Collection_Collection.useCollection();
    const isFocused = vue.ref(false);
    async function handlePointerMove(event) {
      if (event.defaultPrevented)
        return;
      if (!Menu_utils.isMouseEvent(event))
        return;
      if (props.disabled) {
        contentContext.onItemLeave(event);
      } else {
        const defaultPrevented = contentContext.onItemEnter(event);
        if (!defaultPrevented) {
          const item = event.currentTarget;
          item?.focus({ preventScroll: true });
        }
      }
    }
    async function handlePointerLeave(event) {
      await vue.nextTick();
      if (event.defaultPrevented)
        return;
      if (!Menu_utils.isMouseEvent(event))
        return;
      contentContext.onItemLeave(event);
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(CollectionItem), {
        value: { textValue: _ctx.textValue }
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({
            ref: vue.unref(forwardRef),
            role: "menuitem",
            tabindex: "-1"
          }, _ctx.$attrs, {
            as: _ctx.as,
            "as-child": _ctx.asChild,
            "aria-disabled": _ctx.disabled || void 0,
            "data-disabled": _ctx.disabled ? "" : void 0,
            "data-highlighted": isFocused.value ? "" : void 0,
            onPointermove: handlePointerMove,
            onPointerleave: handlePointerLeave,
            onFocus: _cache[0] || (_cache[0] = async (event) => {
              await vue.nextTick();
              if (event.defaultPrevented || _ctx.disabled) return;
              isFocused.value = true;
            }),
            onBlur: _cache[1] || (_cache[1] = async (event) => {
              await vue.nextTick();
              if (event.defaultPrevented) return;
              isFocused.value = false;
            })
          }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["as", "as-child", "aria-disabled", "data-disabled", "data-highlighted"])
        ]),
        _: 3
      }, 8, ["value"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=MenuItemImpl.cjs.map
