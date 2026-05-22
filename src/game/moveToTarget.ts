import { useGameStore } from "../stores/gameStore";

export function moveToTarget(speed = 0.6) {
  const { x, y, targetX, targetY, move, setDirection } =
    useGameStore.getState();

  const dx = targetX - x;
  const dy = targetY - y;

  const distance = Math.sqrt(dx * dx + dy * dy);

  const isMoving = distance > 1;

  if (!isMoving) {
    return false;
  }

  if (dx > 0) {
    setDirection("right");
  } else {
    setDirection("left");
  }

  move((dx / distance) * speed, (dy / distance) * speed);

  return true;
}
