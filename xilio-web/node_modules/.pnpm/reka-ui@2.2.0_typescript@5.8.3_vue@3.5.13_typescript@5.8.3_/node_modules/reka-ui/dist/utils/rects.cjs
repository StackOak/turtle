'use strict';

function intersects(rectOne, rectTwo, strict) {
  {
    return rectOne.x < rectTwo.x + rectTwo.width && rectOne.x + rectOne.width > rectTwo.x && rectOne.y < rectTwo.y + rectTwo.height && rectOne.y + rectOne.height > rectTwo.y;
  }
}

exports.intersects = intersects;
//# sourceMappingURL=rects.cjs.map
