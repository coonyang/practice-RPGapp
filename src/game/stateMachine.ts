import { useGameStore } from "../stores/gameStore";
import { moveToTarget } from "./moveToTarget";
import { setRandomTarget } from "./randomTarget";

let sleepTimer: ReturnType<typeof setTimeout> | null = null;
let happyTimer: ReturnType<typeof setTimeout> | null = null;

export function updateState() {
  const { state, setState } = useGameStore.getState();

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

  const windowEl = document.getElementById("window");

  if (!windowEl) return;

  const rect = windowEl.getBoundingClientRect();

  // 창문 중앙 좌표
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // 고양이 크기 보정
  setTarget(centerX - 32, centerY - 32);

  setState("moveToWindow");
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
