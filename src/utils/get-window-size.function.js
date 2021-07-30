import { getWindowWidth, getWindowHeight } from '.';

export function getWindowSize() {
  const width = getWindowWidth();
  const height = getWindowHeight();

  return { width, height };
}
