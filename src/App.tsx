import React, { ChangeEvent, useState } from "react";
import "./App.css";

import { CounterSettings } from "./components/Counter/CounterSettings/CounterSettings";
import { Counter } from "./components/Counter/Counter";

function App() {
  const [counterButtonsDisable, setCounterButtonsDisable] =
    useState<boolean>(false);
  const [counterMinValue, setCounterMinValue] = useState<number>(0);
  const [counterMaxValue, setCounterMaxValue] = useState<number>(5);
  const [notice, setNotice] = useState<string | null>(null);
  const [count, setCount] = useState<number>(counterMinValue);

  return (
    <div className="App">
      <CounterSettings
        counterMinValue={counterMinValue}
        counterMaxValue={counterMaxValue}
        setCounterMinValue={setCounterMinValue}
        setCounterMaxValue={setCounterMaxValue}
        setNotice={setNotice}
        setCounterButtonsDisable={setCounterButtonsDisable}
        setCount={setCount}
        notice={notice}
      />
      <Counter
        counterMinValue={counterMinValue}
        counterMaxValue={counterMaxValue}
        notice={notice}
        CounterButtonsDisable={counterButtonsDisable}
        count={count}
        setCount={setCount}
      />
    </div>
  );
}

export default App;
