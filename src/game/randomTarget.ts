import { useGameStore } from "../stores/gameStore";

export function setRandomTarget() {
  const randomX = Math.random() * (window.innerWidth - 100);
  const randomY = Math.random() * (window.innerHeight - 100);

  useGameStore.getState().setTarget(randomX, randomY);
}
