'use strict';

const vue = require('vue');
const Menu_MenuAnchor = require('../Menu/MenuAnchor.cjs');
const Collection_Collection = require('../Collection/Collection.cjs');
const Menubar_MenubarMenu = require('./MenubarMenu.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const RovingFocus_RovingFocusItem = require('../RovingFocus/RovingFocusItem.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Menubar_MenubarRoot = require('./MenubarRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "MenubarTrigger",
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const rootContext = Menubar_MenubarRoot.injectMenubarRootContext();
    const menuContext = Menubar_MenubarMenu.injectMenubarMenuContext();
    const { forwardRef, currentElement: triggerElement } = shared_useForwardExpose.useForwardExpose();
    const { CollectionItem } = Collection_Collection.useCollection({ key: "Menubar" });
    const isFocused = vue.ref(false);
    const open = vue.computed(() => rootContext.modelValue.value === menuContext.value);
    vue.onMounted(() => {
      menuContext.triggerElement = triggerElement;
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(RovingFocus_RovingFocusItem._sfc_main), {
        "as-child": "",
        focusable: !_ctx.disabled,
        "tab-stop-id": vue.unref(menuContext).value
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(CollectionItem), null, {
            default: vue.withCtx(() => [
              vue.createVNode(vue.unref(Menu_MenuAnchor._sfc_main), { "as-child": "" }, {
                default: vue.withCtx(() => [
                  vue.createVNode(vue.unref(Primitive_Primitive.Primitive), {
                    id: vue.unref(menuContext).triggerId,
                    ref: vue.unref(forwardRef),
                    as: _ctx.as,
                    type: _ctx.as === "button" ? "button" : void 0,
                    role: "menuitem",
                    "aria-haspopup": "menu",
                    "aria-expanded": open.value,
                    "aria-controls": open.value ? vue.unref(menuContext).contentId : void 0,
                    "data-highlighted": isFocused.value ? "" : void 0,
                    "data-state": open.value ? "open" : "closed",
                    "data-disabled": _ctx.disabled ? "" : void 0,
                    disabled: _ctx.disabled,
                    "data-value": vue.unref(menuContext).value,
                    onPointerdown: _cache[0] || (_cache[0] = (event) => {
                      if (!_ctx.disabled && event.button === 0 && event.ctrlKey === false) {
                        vue.unref(rootContext).onMenuOpen(vue.unref(menuContext).value);
                        if (!open.value) event.preventDefault();
                      }
                    }),
                    onPointerenter: _cache[1] || (_cache[1] = () => {
                      const menubarOpen = Boolean(vue.unref(rootContext).modelValue.value);
                      if (menubarOpen && !open.value) {
                        vue.unref(rootContext).onMenuOpen(vue.unref(menuContext).value);
                        vue.unref(triggerElement)?.focus();
                      }
                    }),
                    onKeydown: _cache[2] || (_cache[2] = vue.withKeys((event) => {
                      if (_ctx.disabled) return;
                      if (["Enter", " "].includes(event.key)) vue.unref(rootContext).onMenuToggle(vue.unref(menuContext).value);
                      if (event.key === "ArrowDown") vue.unref(rootContext).onMenuOpen(vue.unref(menuContext).value);
                      if (["Enter", " ", "ArrowDown"].includes(event.key)) {
                        vue.unref(menuContext).wasKeyboardTriggerOpenRef.value = true;
                        event.preventDefault();
                      }
                    }, ["enter", "space", "arrow-down"])),
                    onFocus: _cache[3] || (_cache[3] = ($event) => isFocused.value = true),
                    onBlur: _cache[4] || (_cache[4] = ($event) => isFocused.value = false)
                  }, {
                    default: vue.withCtx(() => [
                      vue.renderSlot(_ctx.$slots, "default")
                    ]),
                    _: 3
                  }, 8, ["id", "as", "type", "aria-expanded", "aria-controls", "data-highlighted", "data-state", "data-disabled", "disabled", "data-value"])
                ]),
                _: 3
              })
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["focusable", "tab-stop-id"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=MenubarTrigger.cjs.map
