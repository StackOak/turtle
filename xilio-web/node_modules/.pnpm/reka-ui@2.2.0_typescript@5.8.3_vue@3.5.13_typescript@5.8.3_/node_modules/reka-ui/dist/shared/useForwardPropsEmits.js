import { computed } from 'vue';
import { u as useEmitAsProps } from './useEmitAsProps.js';
import { u as useForwardProps } from './useForwardProps.js';

function useForwardPropsEmits(props, emit) {
  const parsedProps = useForwardProps(props);
  const emitsAsProps = emit ? useEmitAsProps(emit) : {};
  return computed(() => ({
    ...parsedProps.value,
    ...emitsAsProps
  }));
}

export { useForwardPropsEmits as u };
//# sourceMappingURL=useForwardPropsEmits.js.map
