import React, { FC, useEffect } from "react";
import { Display } from "../ui/Display/Display";
import UniversalButton from "../ui/Button/UniversalButton";
import { ButtonBlock } from "../ui/ButtonBlock/ButtonBlock";
import classes from "./Counter.module.css";

type CounterPropsType = {
  notice: string | null;
  CounterButtonsDisable: boolean;
  count: number;
  counterMaxValue: number;
  counterMinValue: number;
  setCount: (counterValue: number) => void;
  setNotice: (noticeValue: string | null) => void;
  setCounterButtonsDisable: (value: boolean) => void;
};

export const Counter: FC<CounterPropsType> = ({
  notice,
  CounterButtonsDisable,
  count,
  counterMaxValue,
  counterMinValue,
  setCount,
  setNotice,
  setCounterButtonsDisable,
}) => {
  useEffect(() => {
    if (count > 0) {
      setNotice(null);
      setCounterButtonsDisable(false);
    }
  }, [count]);
  useEffect(() => {
    counterMinValue < count && setCount(0);
  }, [counterMinValue]);

  const disableReset = count === counterMinValue;
  const disableInc = count === counterMaxValue;

  const buttonIncHandler = () => {
    count < counterMaxValue && setCount(count + 1);
  };
  const buttonResetHandler = () => {
    setCount(counterMinValue);
  };

  return (
    <div className={classes.counter}>
      <Display>
        {notice === "error" ? (
          <div className={classes.errorMessage}>Incorrect Value</div>
        ) : notice === "startMessage" ? (
          <div className={classes.startMessage}>
            Enter values and press "Set"
          </div>
        ) : (
          <div
            className={disableInc ? classes.counterRed : classes.counterDefault}
          >
            {count}
          </div>
        )}
      </Display>
      <ButtonBlock>
        <UniversalButton
          onClick={buttonIncHandler}
          disabled={CounterButtonsDisable || disableInc}
        >
          inc
        </UniversalButton>
        <UniversalButton
          onClick={buttonResetHandler}
          disabled={CounterButtonsDisable || disableReset}
        >
          Reset
        </UniversalButton>
      </ButtonBlock>
    </div>
  );
};
