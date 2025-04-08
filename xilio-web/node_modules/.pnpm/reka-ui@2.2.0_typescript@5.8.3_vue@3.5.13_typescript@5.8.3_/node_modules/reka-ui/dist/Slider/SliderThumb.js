import { defineComponent, computed, createBlock, openBlock, mergeProps, unref, withCtx, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from './SliderThumbImpl.js';
import { u as useCollection } from '../Collection/Collection.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SliderThumb",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const props = __props;
    const { getItems } = useCollection();
    const { forwardRef, currentElement: thumbElement } = useForwardExpose();
    const index = computed(() => thumbElement.value ? getItems(true).findIndex((i) => i.ref === thumbElement.value) : -1);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, mergeProps({ ref: unref(forwardRef) }, props, { index: index.value }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["index"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=SliderThumb.js.map
