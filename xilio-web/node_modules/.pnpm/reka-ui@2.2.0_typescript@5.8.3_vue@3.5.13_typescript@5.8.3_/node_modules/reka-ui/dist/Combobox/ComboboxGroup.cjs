'use strict';

const vue = require('vue');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useId = require('../shared/useId.cjs');
const Listbox_ListboxGroup = require('../Listbox/ListboxGroup.cjs');
const Combobox_ComboboxRoot = require('./ComboboxRoot.cjs');

const [injectComboboxGroupContext, provideComboboxGroupContext] = shared_createContext.createContext("ComboboxGroup");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ComboboxGroup",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const id = shared_useId.useId(void 0, "reka-combobox-group");
    const rootContext = Combobox_ComboboxRoot.injectComboboxRootContext();
    const isRender = vue.computed(() => rootContext.ignoreFilter.value ? true : !rootContext.filterState.search ? true : rootContext.filterState.filtered.groups.has(id));
    const context = provideComboboxGroupContext({
      id,
      labelId: ""
    });
    vue.onMounted(() => {
      if (!rootContext.allGroups.value.has(id))
        rootContext.allGroups.value.set(id, /* @__PURE__ */ new Set());
    });
    vue.onUnmounted(() => {
      rootContext.allGroups.value.delete(id);
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Listbox_ListboxGroup._sfc_main), vue.mergeProps({
        id: vue.unref(id),
        "aria-labelledby": vue.unref(context).labelId
      }, props, {
        hidden: isRender.value ? void 0 : true
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["id", "aria-labelledby", "hidden"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectComboboxGroupContext = injectComboboxGroupContext;
//# sourceMappingURL=ComboboxGroup.cjs.map
