import { useGameStore } from "../stores/gameStore";
import { moveToTarget } from "./moveToTarget";
import { setRandomTarget } from "./randomTarget";

let sleepTimer: ReturnType<typeof setTimeout> | null = null;
let happyTimer: ReturnType<typeof setTimeout> | null = null;

export function updateState() {
  const { state, setState, setTarget, x, y } = useGameStore.getState();

  switch (state) {
    case "wander": {
      const moving = moveToTarget();

      if (!moving) {
        setRandomTarget();
      }

      break;
    }

    case "moveToWindow": {
      const moving = moveToTarget();

      if (!moving) {
        setTarget(x, y);

        setState("sleep");

        if (!sleepTimer) {
          sleepTimer = setTimeout(() => {
            useGameStore.getState().setState("wander");

            setRandomTarget();

            sleepTimer = null;
          }, 5000);
        }
      }

      break;
    }

    case "sleep": {
      break;
    }

    case "happy": {
      break;
    }

    case "idle": {
      break;
    }
  }
}

export function goToWindow() {
  const { state, setState, setTarget } = useGameStore.getState();

  // 자는중 클릭 = 깨우기
  if (state === "sleep") {
    if (sleepTimer) {
      clearTimeout(sleepTimer);
      sleepTimer = null;
    }

    setState("wander");

    setRandomTarget();

    return;
  }

  setState("moveToWindow");

  setTarget(700, 300);
}

export function triggerHappy() {
  const { setState } = useGameStore.getState();

  if (happyTimer) {
    clearTimeout(happyTimer);
  }

  setState("happy");

  happyTimer = setTimeout(() => {
    useGameStore.getState().setState("wander");

    happyTimer = null;
  }, 1000);
}
