'use strict';

const vue = require('vue');
const shared_useForwardExpose = require('./useForwardExpose.cjs');

function withDefault(WrappedComponent, options) {
  return {
    inheritAttrs: false,
    name: `${WrappedComponent.__name ?? ""}Wrapper`,
    setup(_, ctx) {
      return () => {
        const optionProps = typeof options?.props === "function" ? options?.props(ctx.attrs) : options?.props;
        const { forwardRef } = shared_useForwardExpose.useForwardExpose();
        const mergedProps = vue.mergeProps(optionProps, ctx.attrs);
        return vue.h(WrappedComponent, { ...mergedProps, ref: forwardRef }, ctx.slots);
      };
    }
  };
}

exports.withDefault = withDefault;
//# sourceMappingURL=withDefault.cjs.map
