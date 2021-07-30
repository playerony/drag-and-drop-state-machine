import { assign, createMachine } from 'xstate';

import { getBoxElementCenterPosition } from './utils';

const { centerX, centerY } = getBoxElementCenterPosition();

const initialContext = {
  deltaX: 0,
  deltaY: 0,
  clickPositionX: 0,
  clickPositionY: 0,
  positionX: centerX,
  positionY: centerY,
};

const assignClickPosition = assign({
  clickPositionX: (_, event) => event.clientX,
  clickPositionY: (_, event) => event.clientY,
});

const assignDelta = assign({
  deltaX: (context, event) => event.clientX - context.clickPositionX,
  deltaY: (context, event) => event.clientY - context.clickPositionY,
});

const assignLockedDelta = assign({
  deltaX: (context, event) => event.clientX - context.clickPositionX,
});

const assignPosition = assign({
  ...initialContext,
  positionX: (context) => context.positionX + context.deltaX,
  positionY: (context) => context.positionY + context.deltaY,
});

const resetPosition = assign({
  deltaX: 0,
  deltaY: 0,
  clickPositionX: 0,
  clickPositionY: 0,
});

export const createDragAndDropStateMachine = () =>
  createMachine({
    initial: 'idle',
    context: initialContext,
    states: {
      idle: {
        on: {
          mousedown: {
            target: 'dragging',
            actions: assignClickPosition,
          },
        },
      },
      dragging: {
        initial: 'normal',
        states: {
          normal: {
            on: {
              'keydown.shift': 'locked',
            },
          },
          locked: {
            on: {
              'keyup.shift': 'normal',
              mousemove: {
                actions: assignLockedDelta,
              },
            },
          },
        },
        on: {
          mousemove: {
            actions: assignDelta,
          },
          mouseup: {
            target: 'idle',
            actions: assignPosition,
          },
          mouseout: {
            target: 'idle',
            actions: resetPosition,
          },
          'keyup.escape': {
            target: 'idle',
            actions: resetPosition,
          },
        },
      },
    },
  });
