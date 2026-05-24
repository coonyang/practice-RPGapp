import { useEffect } from "react";

import { useGameStore } from "../stores/gameStore";

import { startGameLoop, stopGameLoop } from "../game/updateCharacter";

import { triggerHappy } from "../game/stateMachine";

export default function Character() {
  const { x, y, state, direction } = useGameStore();

  useEffect(() => {
    startGameLoop();

    return () => {
      stopGameLoop();
    };
  }, []);

  const animation =
    state === "sleep"
      ? "sleeping"
      : state === "happy"
        ? "happy"
        : state === "wander" || state === "moveToWindow"
          ? "walking"
          : "idle";

  return (
    <div
      className="absolute"
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      <div
        style={{
          transform: `
            scaleX(${direction === "left" ? -1 : 1})
            scale(${animation === "sleeping" ? 2 : 1})
          `,
          transformOrigin: "center",
        }}
      >
        <img
          className="block w-[clamp(48px,12vw,64px)] h-[clamp(48px,12vw,64px)] object-contain"
          onClick={triggerHappy}
          src={
            animation === "sleeping"
              ? "/img/catsleep.gif"
              : animation === "happy"
                ? "/img/cathappy.gif"
                : "/img/catt.gif"
          }
        />
      </div>

      {animation === "sleeping" && (
        <div className="absolute -top-6 left-6 text-white">Zzz</div>
      )}
    </div>
  );
}
