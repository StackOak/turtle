import { defineComponent, createBlock, openBlock, unref, withCtx, createVNode, withKeys, withModifiers, renderSlot } from 'vue';
import { u as useCollection } from '../Collection/Collection.js';
import '@floating-ui/vue';
import { refAutoReset } from '@vueuse/shared';
import { i as injectListboxRootContext } from './ListboxRoot.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ListboxContent",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const { CollectionSlot } = useCollection();
    const rootContext = injectListboxRootContext();
    const isClickFocus = refAutoReset(false, 10);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(CollectionSlot), null, {
        default: withCtx(() => [
          createVNode(unref(Primitive), {
            role: "listbox",
            as: _ctx.as,
            "as-child": _ctx.asChild,
            tabindex: unref(rootContext).focusable.value ? unref(rootContext).highlightedElement.value ? "-1" : "0" : void 0,
            "aria-orientation": unref(rootContext).orientation.value,
            "aria-multiselectable": !!unref(rootContext).multiple.value,
            "data-orientation": unref(rootContext).orientation.value,
            onMousedown: _cache[0] || (_cache[0] = withModifiers(($event) => isClickFocus.value = true, ["left"])),
            onFocus: _cache[1] || (_cache[1] = (ev) => {
              if (unref(isClickFocus))
                return;
              unref(rootContext).onEnter(ev);
            }),
            onKeydown: [
              _cache[2] || (_cache[2] = withKeys(withModifiers((event) => {
                unref(rootContext).focusable.value ? unref(rootContext).onKeydownNavigation(event) : void 0;
              }, ["prevent"]), ["down", "up", "left", "right", "home", "end"])),
              withKeys(unref(rootContext).onKeydownEnter, ["enter"]),
              unref(rootContext).onKeydownTypeAhead
            ]
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["as", "as-child", "tabindex", "aria-orientation", "aria-multiselectable", "data-orientation", "onKeydown"])
        ]),
        _: 3
      });
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ListboxContent.js.map
