import { assign, createMachine } from 'xstate';

export function createDragAndDropStateMachine(initialContext) {
  const assignClickPosition = assign({
    clickPositionX: (_, event) => event.clientX,
    clickPositionY: (_, event) => event.clientY,
  });

  const assignDelta = assign({
    deltaX: (context, event) => event.clientX - context.clickPositionX,
    deltaY: (context, event) => event.clientY - context.clickPositionY,
  });

  const assignPosition = assign({
    ...initialContext,
    positionX: (context) => context.positionX + context.deltaX,
    positionY: (context) => context.positionY + context.deltaY,
  });

  return createMachine({
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
        on: {
          mousemove: {
            actions: assignDelta,
          },
          mouseup: {
            target: 'idle',
            actions: assignPosition,
          },
        },
      },
    },
  });
}
