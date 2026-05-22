import { updateState } from "./stateMachine";

let frameId = 0;

export function startGameLoop() {
  const update = () => {
    updateState();

    frameId = requestAnimationFrame(update);
  };

  update();
}

export function stopGameLoop() {
  cancelAnimationFrame(frameId);
}
