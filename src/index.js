import { assign, interpret, createMachine } from 'xstate';

import './style.css';

// const bodyElement = document.body;
const boxElement = document.getElementById('box');

const assignClickPosition = assign({
  clickPositionX: (_, event) => event.clientX,
  clickPositionY: (_, event) => event.clientY,
});

const dragAndDropMachine = createMachine({
  initial: 'idle',
  context: {
    clickPositionX: 0,
    clickPositionY: 0,
  },
  states: {
    idle: {
      on: {
        mousedown: {
          target: 'idle',
          actions: assignClickPosition,
        },
      },
    },
  },
});

const service = interpret(dragAndDropMachine);

service.start();

boxElement.addEventListener('mousedown', (event) => {
  service.send(event);
});
