import { mergeProps, h } from 'vue';
import { u as useForwardExpose } from './useForwardExpose.js';

function withDefault(WrappedComponent, options) {
  return {
    inheritAttrs: false,
    name: `${WrappedComponent.__name ?? ""}Wrapper`,
    setup(_, ctx) {
      return () => {
        const optionProps = typeof options?.props === "function" ? options?.props(ctx.attrs) : options?.props;
        const { forwardRef } = useForwardExpose();
        const mergedProps = mergeProps(optionProps, ctx.attrs);
        return h(WrappedComponent, { ...mergedProps, ref: forwardRef }, ctx.slots);
      };
    }
  };
}

export { withDefault as w };
//# sourceMappingURL=withDefault.js.map
