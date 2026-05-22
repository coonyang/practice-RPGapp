import Character from "./components/Character";

import { goToWindow } from "./game/stateMachine";

export default function App() {
  return (
    <main className="relative h-screen overflow-hidden bg-black">
      <Character />

      <div
        className="absolute border w-25 h-30 text-white p-4 cursor-pointer"
        style={{
          left: 680,
          top: 274,
        }}
        onClick={goToWindow}
      >
        창문
      </div>
    </main>
  );
}
