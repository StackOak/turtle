import { getCurrentInstance, toHandlerKey, camelize } from 'vue';

function useEmitAsProps(emit) {
  const vm = getCurrentInstance();
  const events = vm?.type.emits;
  const result = {};
  if (!events?.length) {
    console.warn(
      `No emitted event found. Please check component: ${vm?.type.__name}`
    );
  }
  events?.forEach((ev) => {
    result[toHandlerKey(camelize(ev))] = (...arg) => emit(ev, ...arg);
  });
  return result;
}

export { useEmitAsProps as u };
//# sourceMappingURL=useEmitAsProps.js.map
