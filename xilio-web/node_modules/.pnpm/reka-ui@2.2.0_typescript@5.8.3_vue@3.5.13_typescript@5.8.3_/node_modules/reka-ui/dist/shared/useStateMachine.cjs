'use strict';

const vue = require('vue');

function useStateMachine(initialState, machine) {
  const state = vue.ref(initialState);
  function reducer(event) {
    const nextState = machine[state.value][event];
    return nextState ?? state.value;
  }
  const dispatch = (event) => {
    state.value = reducer(event);
  };
  return {
    state,
    dispatch
  };
}

exports.useStateMachine = useStateMachine;
//# sourceMappingURL=useStateMachine.cjs.map
