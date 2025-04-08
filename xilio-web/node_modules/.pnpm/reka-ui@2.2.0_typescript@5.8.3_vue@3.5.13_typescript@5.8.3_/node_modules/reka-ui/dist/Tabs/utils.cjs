'use strict';

function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}

exports.makeContentId = makeContentId;
exports.makeTriggerId = makeTriggerId;
//# sourceMappingURL=utils.cjs.map
