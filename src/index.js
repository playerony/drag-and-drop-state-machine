import { interpret } from 'xstate';

import { getBoxElementCenterPosition } from './utils';
import { createDragAndDropStateMachine } from './create-drag-and-drop-state-machine.function';

import { BOX_WIDTH, BOX_HEIGHT } from './constants';

import './style.css';

let service = null;
const bodyElement = document.body;
const boxElement = document.getElementById('box');
const deltaDetailsElement = document.getElementById('delta');
const stateDetailsElement = document.getElementById('state');
const boxPositionDetailsElement = document.getElementById('box-position');
const clickPositionDetailsElement = document.getElementById('click-position');

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
  deltaDetailsElement.innerHTML = 'Delta: 0 0';
  stateDetailsElement.innerHTML = 'State: idle';
  boxPositionDetailsElement.innerHTML = 'Box position: 0 0';
  clickPositionDetailsElement.innerHTML = 'Click position: 0 0';

  boxElement.style.setProperty('--x', centerX);
  boxElement.style.setProperty('--y', centerY);
  boxElement.style.setProperty('--width', BOX_WIDTH);
  boxElement.style.setProperty('--height', BOX_HEIGHT);
}

function initializeDragAndDropStateMachineService() {
  const dragAndDropMachine = createDragAndDropStateMachine(initialContext);

  const machineService = interpret(dragAndDropMachine);

  machineService.onTransition(({ context, changed, toStrings }) => {
    if (changed) {
      boxElement.dataset.state = toStrings().join(' ');
      stateDetailsElement.innerHTML = `State: ${toStrings().join(' ')}`;
      deltaDetailsElement.innerHTML = `Delta: ${context.deltaX} ${context.deltaY}`;
      boxPositionDetailsElement.innerHTML = `Box position: ${context.positionX} ${context.positionY}`;
      clickPositionDetailsElement.innerHTML = `Click position: ${context.clickPositionX} ${context.clickPositionY}`;

      boxElement.style.setProperty('--dx', context.deltaX);
      boxElement.style.setProperty('--dy', context.deltaY);
      boxElement.style.setProperty('--x', context.positionX);
      boxElement.style.setProperty('--y', context.positionY);
    }
  });

  machineService.start();

  service = machineService;
}

function initializeEventListeners() {
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
  initializeDragAndDropStateMachineService();
  initializeEventListeners();
}

initialize();
