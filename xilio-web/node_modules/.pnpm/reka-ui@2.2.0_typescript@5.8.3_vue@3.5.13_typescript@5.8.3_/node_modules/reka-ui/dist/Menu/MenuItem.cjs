'use strict';

const vue = require('vue');
const Menu_MenuItemImpl = require('./MenuItemImpl.cjs');
const Menu_utils = require('./utils.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Menu_MenuRoot = require('./MenuRoot.cjs');
const Menu_MenuContentImpl = require('./MenuContentImpl.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "MenuItem",
  props: {
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    const rootContext = Menu_MenuRoot.injectMenuRootContext();
    const contentContext = Menu_MenuContentImpl.injectMenuContentContext();
    const isPointerDownRef = vue.ref(false);
    async function handleSelect() {
      const menuItem = currentElement.value;
      if (!props.disabled && menuItem) {
        const itemSelectEvent = new CustomEvent(Menu_utils.ITEM_SELECT, {
          bubbles: true,
          cancelable: true
        });
        emits("select", itemSelectEvent);
        await vue.nextTick();
        if (itemSelectEvent.defaultPrevented)
          isPointerDownRef.value = false;
        else rootContext.onClose();
      }
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(Menu_MenuItemImpl._sfc_main, vue.mergeProps(props, {
        ref: vue.unref(forwardRef),
        onClick: handleSelect,
        onPointerdown: _cache[0] || (_cache[0] = () => {
          isPointerDownRef.value = true;
        }),
        onPointerup: _cache[1] || (_cache[1] = async (event) => {
          await vue.nextTick();
          if (event.defaultPrevented) return;
          if (!isPointerDownRef.value) event.currentTarget?.click();
        }),
        onKeydown: _cache[2] || (_cache[2] = async (event) => {
          const isTypingAhead = vue.unref(contentContext).searchRef.value !== "";
          if (_ctx.disabled || isTypingAhead && event.key === " ") return;
          if (vue.unref(Menu_utils.SELECTION_KEYS).includes(event.key)) {
            event.currentTarget.click();
            event.preventDefault();
          }
        })
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=MenuItem.cjs.map
