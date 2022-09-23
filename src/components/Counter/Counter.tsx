import React, { FC } from "react";
import { Display } from "../ui/Display/Display";
import Button from "../ui/Button/Button";
import { ButtonBlock } from "../ui/ButtonBlock/ButtonBlock";
import classes from "./Counter.module.css";

type CounterPropsType = {
  notice: string | null;
  CounterButtonsDisable: boolean;
  count: number;
  counterMaxValue: number;
  counterMinValue: number;
  setCount: (value: number) => void;
};

export const Counter: FC<CounterPropsType> = ({
  notice,
  CounterButtonsDisable,
  count,
  counterMaxValue,
  counterMinValue,
  setCount,
}) => {
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
        <Button
          onClick={buttonIncHandler}
          disabled={CounterButtonsDisable || disableInc}
        >
          inc
        </Button>
        <Button
          onClick={buttonResetHandler}
          disabled={CounterButtonsDisable || disableReset}
        >
          Reset
        </Button>
      </ButtonBlock>
    </div>
  );
};
