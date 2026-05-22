import { create } from "zustand";

export type State = "idle" | "wander" | "moveToWindow" | "sleep" | "happy";

export type Direction = "left" | "right";

interface GameState {
  x: number;
  y: number;

  targetX: number;
  targetY: number;

  state: State;
  direction: Direction;

  setState: (state: State) => void;

  setDirection: (direction: Direction) => void;

  setTarget: (x: number, y: number) => void;

  move: (dx: number, dy: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  x: 300,
  y: 200,

  targetX: 300,
  targetY: 200,

  state: "wander",

  direction: "right",

  setState: (state) =>
    set(() => ({
      state,
    })),

  setDirection: (direction) =>
    set(() => ({
      direction,
    })),

  setTarget: (x, y) =>
    set(() => ({
      targetX: x,
      targetY: y,
    })),

  move: (dx, dy) =>
    set((state) => ({
      x: state.x + dx,
      y: state.y + dy,
    })),
}));
