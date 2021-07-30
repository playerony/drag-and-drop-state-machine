import { getWindowSize } from './utils';

import { BOX_WIDTH, BOX_HEIGHT } from './constants';

export function getBoxElementCenterPosition() {
  const { width, height } = getWindowSize();

  const screenCenterX = width / 2;
  const screenCenterY = height / 2;
  const boxCenterX = BOX_WIDTH / 2;
  const boxCenterY = BOX_HEIGHT / 2;
  const centerX = screenCenterX - boxCenterX;
  const centerY = screenCenterY - boxCenterY;

  return { centerX, centerY };
}
