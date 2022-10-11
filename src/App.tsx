import React from "react";
import "./App.css";

import { CounterSettings } from "./components/Counter/CounterSettings/CounterSettings";
import { Counter } from "./components/Counter/Counter";

export type StatusType = "startMessage" | "error" | "count";

function App() {
  return (
    <div className="App">
      <CounterSettings />
      <Counter />
    </div>
  );
}

export default App;
