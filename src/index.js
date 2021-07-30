import { interpret } from 'xstate';

import { getBoxElementCenterPosition } from './get-box-element-center-position.function';
import { createDragAndDropStateMachine } from './create-drag-and-drop-state-machine.function';

import { BOX_WIDTH, BOX_HEIGHT } from './constants';

import './style.css';

let service = null;
const bodyElement = document.body;
const boxElement = document.getElementById('box');

const { centerX, centerY } = getBoxElementCenterPosition();

const initialContext = {
  deltaX: 0,
  deltaY: 0,
  clickPositionX: 0,
  clickPositionY: 0,
  positionX: centerX,
  positionY: centerY,
};

function initializeBoxElementPosition() {
  boxElement.dataset.state = 'idle';

  boxElement.style.setProperty('--x', centerX);
  boxElement.style.setProperty('--y', centerY);
  boxElement.style.setProperty('--width', BOX_WIDTH);
  boxElement.style.setProperty('--height', BOX_HEIGHT);
}

function initializeService() {
  const dragAndDropMachine = createDragAndDropStateMachine(initialContext);

  const machineService = interpret(dragAndDropMachine);

  machineService.onTransition(({ context, changed, toStrings }) => {
    if (changed) {
      boxElement.dataset.state = toStrings().join(' ');

      boxElement.style.setProperty('--dx', context.deltaX);
      boxElement.style.setProperty('--dy', context.deltaY);
      boxElement.style.setProperty('--x', context.positionX);
      boxElement.style.setProperty('--y', context.positionY);
    }
  });

  machineService.start();

  service = machineService;
}

function initializeEvents() {
  boxElement.addEventListener('mousedown', service.send);

  bodyElement.addEventListener('mouseup', service.send);
  bodyElement.addEventListener('mouseout', service.send);
  bodyElement.addEventListener('mousemove', service.send);

  bodyElement.addEventListener('keyup', ({ key }) => {
    if (key === 'Escape') {
      service.send('keyup.escape');
    }

    if (key === 'Shift') {
      service.send('keyup.shift');
    }
  });

  bodyElement.addEventListener('keydown', ({ key }) => {
    if (key === 'Shift') {
      service.send('keydown.shift');
    }
  });
}

function initialize() {
  initializeBoxElementPosition();
  initializeService();
  initializeEvents();
}

initialize();
