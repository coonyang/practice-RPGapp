import { useGameStore } from "../stores/gameStore";

export function setRandomTarget() {
  const randomX = Math.random() * 800;
  const randomY = Math.random() * 500;

  useGameStore.getState().setTarget(randomX, randomY);
}
