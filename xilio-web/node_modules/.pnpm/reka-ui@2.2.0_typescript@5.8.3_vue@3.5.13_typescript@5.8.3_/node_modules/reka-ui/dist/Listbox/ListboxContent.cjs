'use strict';

const vue = require('vue');
const Collection_Collection = require('../Collection/Collection.cjs');
require('@floating-ui/vue');
const shared = require('@vueuse/shared');
const Listbox_ListboxRoot = require('./ListboxRoot.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ListboxContent",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const { CollectionSlot } = Collection_Collection.useCollection();
    const rootContext = Listbox_ListboxRoot.injectListboxRootContext();
    const isClickFocus = shared.refAutoReset(false, 10);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(CollectionSlot), null, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), {
            role: "listbox",
            as: _ctx.as,
            "as-child": _ctx.asChild,
            tabindex: vue.unref(rootContext).focusable.value ? vue.unref(rootContext).highlightedElement.value ? "-1" : "0" : void 0,
            "aria-orientation": vue.unref(rootContext).orientation.value,
            "aria-multiselectable": !!vue.unref(rootContext).multiple.value,
            "data-orientation": vue.unref(rootContext).orientation.value,
            onMousedown: _cache[0] || (_cache[0] = vue.withModifiers(($event) => isClickFocus.value = true, ["left"])),
            onFocus: _cache[1] || (_cache[1] = (ev) => {
              if (vue.unref(isClickFocus))
                return;
              vue.unref(rootContext).onEnter(ev);
            }),
            onKeydown: [
              _cache[2] || (_cache[2] = vue.withKeys(vue.withModifiers((event) => {
                vue.unref(rootContext).focusable.value ? vue.unref(rootContext).onKeydownNavigation(event) : void 0;
              }, ["prevent"]), ["down", "up", "left", "right", "home", "end"])),
              vue.withKeys(vue.unref(rootContext).onKeydownEnter, ["enter"]),
              vue.unref(rootContext).onKeydownTypeAhead
            ]
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["as", "as-child", "tabindex", "aria-orientation", "aria-multiselectable", "data-orientation", "onKeydown"])
        ]),
        _: 3
      });
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ListboxContent.cjs.map
