import Character from "./components/Character";

import { goToWindow } from "./game/stateMachine";

export default function App() {
  return (
    <main className="relative h-screen overflow-hidden bg-black">
      <Character />

      <div
        id="window"
        className="absolute flex items-center justify-center item-ceter text-white p-2 cursor-pointer
             w-[18vw] h-[20vw] max-w-[100px] max-h-[120px]"
        style={{
          left: "75%",
          top: "35%",
        }}
        onClick={goToWindow}
      >
        창문
      </div>
    </main>
  );
}
