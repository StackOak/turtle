'use strict';

const vue = require('vue');

function useEmitAsProps(emit) {
  const vm = vue.getCurrentInstance();
  const events = vm?.type.emits;
  const result = {};
  if (!events?.length) {
    console.warn(
      `No emitted event found. Please check component: ${vm?.type.__name}`
    );
  }
  events?.forEach((ev) => {
    result[vue.toHandlerKey(vue.camelize(ev))] = (...arg) => emit(ev, ...arg);
  });
  return result;
}

exports.useEmitAsProps = useEmitAsProps;
//# sourceMappingURL=useEmitAsProps.cjs.map
