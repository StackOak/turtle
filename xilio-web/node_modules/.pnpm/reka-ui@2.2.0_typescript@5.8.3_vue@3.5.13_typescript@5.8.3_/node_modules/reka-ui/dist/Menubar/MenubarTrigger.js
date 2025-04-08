import { defineComponent, ref, computed, onMounted, createBlock, openBlock, unref, withCtx, createVNode, withKeys, renderSlot } from 'vue';
import { _ as _sfc_main$2 } from '../Menu/MenuAnchor.js';
import { u as useCollection } from '../Collection/Collection.js';
import { i as injectMenubarMenuContext } from './MenubarMenu.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { _ as _sfc_main$1 } from '../RovingFocus/RovingFocusItem.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectMenubarRootContext } from './MenubarRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MenubarTrigger",
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const rootContext = injectMenubarRootContext();
    const menuContext = injectMenubarMenuContext();
    const { forwardRef, currentElement: triggerElement } = useForwardExpose();
    const { CollectionItem } = useCollection({ key: "Menubar" });
    const isFocused = ref(false);
    const open = computed(() => rootContext.modelValue.value === menuContext.value);
    onMounted(() => {
      menuContext.triggerElement = triggerElement;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), {
        "as-child": "",
        focusable: !_ctx.disabled,
        "tab-stop-id": unref(menuContext).value
      }, {
        default: withCtx(() => [
          createVNode(unref(CollectionItem), null, {
            default: withCtx(() => [
              createVNode(unref(_sfc_main$2), { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(unref(Primitive), {
                    id: unref(menuContext).triggerId,
                    ref: unref(forwardRef),
                    as: _ctx.as,
                    type: _ctx.as === "button" ? "button" : void 0,
                    role: "menuitem",
                    "aria-haspopup": "menu",
                    "aria-expanded": open.value,
                    "aria-controls": open.value ? unref(menuContext).contentId : void 0,
                    "data-highlighted": isFocused.value ? "" : void 0,
                    "data-state": open.value ? "open" : "closed",
                    "data-disabled": _ctx.disabled ? "" : void 0,
                    disabled: _ctx.disabled,
                    "data-value": unref(menuContext).value,
                    onPointerdown: _cache[0] || (_cache[0] = (event) => {
                      if (!_ctx.disabled && event.button === 0 && event.ctrlKey === false) {
                        unref(rootContext).onMenuOpen(unref(menuContext).value);
                        if (!open.value) event.preventDefault();
                      }
                    }),
                    onPointerenter: _cache[1] || (_cache[1] = () => {
                      const menubarOpen = Boolean(unref(rootContext).modelValue.value);
                      if (menubarOpen && !open.value) {
                        unref(rootContext).onMenuOpen(unref(menuContext).value);
                        unref(triggerElement)?.focus();
                      }
                    }),
                    onKeydown: _cache[2] || (_cache[2] = withKeys((event) => {
                      if (_ctx.disabled) return;
                      if (["Enter", " "].includes(event.key)) unref(rootContext).onMenuToggle(unref(menuContext).value);
                      if (event.key === "ArrowDown") unref(rootContext).onMenuOpen(unref(menuContext).value);
                      if (["Enter", " ", "ArrowDown"].includes(event.key)) {
                        unref(menuContext).wasKeyboardTriggerOpenRef.value = true;
                        event.preventDefault();
                      }
                    }, ["enter", "space", "arrow-down"])),
                    onFocus: _cache[3] || (_cache[3] = ($event) => isFocused.value = true),
                    onBlur: _cache[4] || (_cache[4] = ($event) => isFocused.value = false)
                  }, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "default")
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

export { _sfc_main as _ };
//# sourceMappingURL=MenubarTrigger.js.map
