'use strict';

const vue = require('vue');
const Slider_SliderThumbImpl = require('./SliderThumbImpl.cjs');
const Collection_Collection = require('../Collection/Collection.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "SliderThumb",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const props = __props;
    const { getItems } = Collection_Collection.useCollection();
    const { forwardRef, currentElement: thumbElement } = shared_useForwardExpose.useForwardExpose();
    const index = vue.computed(() => thumbElement.value ? getItems(true).findIndex((i) => i.ref === thumbElement.value) : -1);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(Slider_SliderThumbImpl._sfc_main, vue.mergeProps({ ref: vue.unref(forwardRef) }, props, { index: index.value }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["index"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=SliderThumb.cjs.map
