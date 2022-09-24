import React, { useEffect, useState } from "react";
import "./App.css";

import { CounterSettings } from "./components/Counter/CounterSettings/CounterSettings";
import { Counter } from "./components/Counter/Counter";

function App() {
  const [counterButtonsDisable, setCounterButtonsDisable] =
    useState<boolean>(false);
  const [counterMinValue, setCounterMinValue] = useState(0);
  const [counterMaxValue, setCounterMaxValue] = useState(5);
  const [notice, setNotice] = useState<string | null>(null);
  const [count, setCount] = useState(counterMinValue);

  useEffect(() => {
    let counterMaxValueToString = localStorage.getItem("counterMaxValue");
    if (counterMaxValueToString) {
      let newMaxValue = JSON.parse(counterMaxValueToString);
      setCounterMaxValue(newMaxValue);
    }
  }, []);

  useEffect(() => {
    let counterMinValueToString = localStorage.getItem("counterMinValue");
    if (counterMinValueToString) {
      let newMinValue = JSON.parse(counterMinValueToString);
      setCounterMinValue(newMinValue);
    }
  }, []);

  useEffect(() => {
    let counterValueToString = localStorage.getItem("counterValue");
    if (counterValueToString) {
      let newCounterValue = JSON.parse(counterValueToString);
      setCount(newCounterValue);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("counterMinValue", JSON.stringify(counterMinValue));
  }, ["counterMinValue", counterMinValue]);

  useEffect(() => {
    localStorage.setItem("counterMaxValue", JSON.stringify(counterMaxValue));
  }, ["counterMaxValue", counterMaxValue]);

  useEffect(() => {
    localStorage.setItem("counterValue", JSON.stringify(count));
  }, ["counterValue", count]);

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
        setNotice={setNotice}
        setCounterButtonsDisable={setCounterButtonsDisable}
      />
    </div>
  );
}

export default App;
