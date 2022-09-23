import React, {
  ChangeEvent,
  KeyboardEvent,
  FC,
  useEffect,
  useState,
} from "react";
import { Display } from "../../ui/Display/Display";
import Button from "../../ui/Button/Button";
import { ButtonBlock } from "../../ui/ButtonBlock/ButtonBlock";
import classes from "./CounterSettings.module.css";

type CounterSettingsPropsType = {
  counterMaxValue: number;
  counterMinValue: number;
  setCounterMaxValue: (CounterValue: number) => void;
  setCounterMinValue: (CounterValue: number) => void;
  setNotice: (errorValue: string | null) => void;
  setCounterButtonsDisable: (value: boolean) => void;
  setCount: (value: number) => void;
  notice: string | null;
};

export const CounterSettings: FC<CounterSettingsPropsType> = ({
  counterMaxValue,
  counterMinValue,
  setCounterMaxValue,
  setCounterMinValue,
  setNotice,
  setCounterButtonsDisable,
  setCount,
  notice,
}) => {
  const [localButtonDisable, setLocalButtonDisable] = useState(false);

  const onChangeCounterMinValue = (e: ChangeEvent<HTMLInputElement>) => {
    setCounterMinValue(Math.floor(e.currentTarget.valueAsNumber));
  };

  const onChangeCounterMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
    setCounterMaxValue(Math.floor(e.currentTarget.valueAsNumber));
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      btnHandler();
    }
  };

  const btnHandler = () => {
    setLocalButtonDisable(false);
    setCount(counterMinValue);
    setCounterButtonsDisable(false);
    setNotice(null);
  };

  const validation = () => {
    if (
      counterMaxValue < counterMinValue ||
      counterMinValue < 0 ||
      isNaN(counterMinValue) ||
      isNaN(counterMaxValue) ||
      counterMaxValue === counterMinValue
    ) {
      setNotice("error");
      setLocalButtonDisable(true);
      setCounterButtonsDisable(true);
      setCount(0);
    } else {
      setNotice("startMessage");
      setCounterButtonsDisable(true);
      setLocalButtonDisable(false);
    }
  };

  useEffect(() => {
    setNotice(null);
    validation();
  }, [counterMinValue, counterMaxValue]);

  return (
    <div className={classes.counterSettings}>
      <Display>
        <div className={classes.inputsContainer}>
          <div className={classes.inputWrapper}>
            <div className={classes.counterValue}>Min Value:</div>
            <input
              onKeyUp={onKeyPressHandler}
              type={"number"}
              value={counterMinValue.toFixed()}
              onChange={onChangeCounterMinValue}
              className={
                notice === "error" ? classes.inputError : classes.input
              }
            />
          </div>
          <div className={classes.inputWrapper}>
            <div className={classes.counterValue}>Max Value:</div>
            <input
              onKeyUp={onKeyPressHandler}
              type={"number"}
              value={counterMaxValue.toFixed()}
              onChange={onChangeCounterMaxValue}
              className={
                notice === "error" ? classes.inputError : classes.input
              }
            />
          </div>
        </div>
      </Display>
      <ButtonBlock>
        <Button onClick={btnHandler} disabled={localButtonDisable}>
          Set
        </Button>
      </ButtonBlock>
    </div>
  );
};
