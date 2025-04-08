'use strict';

const vue = require('vue');
const shared_useId = require('../shared/useId.cjs');
const Primitive_usePrimitiveElement = require('../Primitive/usePrimitiveElement.cjs');
const Listbox_ListboxItem = require('../Listbox/ListboxItem.cjs');
const Combobox_ComboboxRoot = require('./ComboboxRoot.cjs');
const Combobox_ComboboxGroup = require('./ComboboxGroup.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ComboboxItem",
  props: {
    textValue: {},
    value: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const id = shared_useId.useId(void 0, "reka-combobox-item");
    const rootContext = Combobox_ComboboxRoot.injectComboboxRootContext();
    const groupContext = Combobox_ComboboxGroup.injectComboboxGroupContext(null);
    const { primitiveElement, currentElement } = Primitive_usePrimitiveElement.usePrimitiveElement();
    if (props.value === "") {
      throw new Error(
        "A <ComboboxItem /> must have a value prop that is not an empty string. This is because the Combobox value can be set to an empty string to clear the selection and show the placeholder."
      );
    }
    const isRender = vue.computed(() => {
      if (rootContext.isVirtual.value || rootContext.ignoreFilter.value || !rootContext.filterState.search) {
        return true;
      } else {
        const filteredCurrentItem = rootContext.filterState.filtered.items.get(id);
        if (filteredCurrentItem === void 0) {
          return true;
        }
        return filteredCurrentItem > 0;
      }
    });
    vue.onMounted(() => {
      rootContext.allItems.value.set(id, props.textValue || currentElement.value.textContent || currentElement.value.innerText);
      const groupId = groupContext?.id;
      if (groupId) {
        if (!rootContext.allGroups.value.has(groupId)) {
          rootContext.allGroups.value.set(groupId, /* @__PURE__ */ new Set([id]));
        } else {
          rootContext.allGroups.value.get(groupId)?.add(id);
        }
      }
    });
    vue.onUnmounted(() => {
      rootContext.allItems.value.delete(id);
    });
    return (_ctx, _cache) => {
      return isRender.value ? (vue.openBlock(), vue.createBlock(vue.unref(Listbox_ListboxItem._sfc_main), vue.mergeProps({ key: 0 }, props, {
        id: vue.unref(id),
        ref_key: "primitiveElement",
        ref: primitiveElement,
        onSelect: _cache[0] || (_cache[0] = (event) => {
          emits("select", event);
          if (event.defaultPrevented)
            return;
          if (!vue.unref(rootContext).multiple.value) {
            event.preventDefault();
            vue.unref(rootContext).onOpenChange(false);
            vue.unref(rootContext).modelValue.value = props.value;
          }
        })
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createTextVNode(vue.toDisplayString(_ctx.value), 1)
          ])
        ]),
        _: 3
      }, 16, ["id"])) : vue.createCommentVNode("", true);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ComboboxItem.cjs.map
