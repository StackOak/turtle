'use strict';

const vue = require('vue');
const shared_useEmitAsProps = require('./useEmitAsProps.cjs');
const shared_useForwardProps = require('./useForwardProps.cjs');

function useForwardPropsEmits(props, emit) {
  const parsedProps = shared_useForwardProps.useForwardProps(props);
  const emitsAsProps = emit ? shared_useEmitAsProps.useEmitAsProps(emit) : {};
  return vue.computed(() => ({
    ...parsedProps.value,
    ...emitsAsProps
  }));
}

exports.useForwardPropsEmits = useForwardPropsEmits;
//# sourceMappingURL=useForwardPropsEmits.cjs.map
