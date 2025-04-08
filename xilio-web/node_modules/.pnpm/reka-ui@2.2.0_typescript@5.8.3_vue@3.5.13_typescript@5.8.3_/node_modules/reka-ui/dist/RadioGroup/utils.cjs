'use strict';

const shared_handleAndDispatchCustomEvent = require('../shared/handleAndDispatchCustomEvent.cjs');

const RADIO_SELECT = "radio.select";
function handleSelect(event, value, callback) {
  const eventDetail = { originalEvent: event, value };
  shared_handleAndDispatchCustomEvent.handleAndDispatchCustomEvent(RADIO_SELECT, callback, eventDetail);
}

exports.handleSelect = handleSelect;
//# sourceMappingURL=utils.cjs.map
