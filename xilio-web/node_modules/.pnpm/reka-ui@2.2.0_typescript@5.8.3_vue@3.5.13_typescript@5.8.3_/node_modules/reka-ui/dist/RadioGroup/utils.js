import { h as handleAndDispatchCustomEvent } from '../shared/handleAndDispatchCustomEvent.js';

const RADIO_SELECT = "radio.select";
function handleSelect(event, value, callback) {
  const eventDetail = { originalEvent: event, value };
  handleAndDispatchCustomEvent(RADIO_SELECT, callback, eventDetail);
}

export { handleSelect as h };
//# sourceMappingURL=utils.js.map
