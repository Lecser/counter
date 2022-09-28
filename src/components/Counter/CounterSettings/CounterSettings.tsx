import React, {
  ChangeEvent,
  KeyboardEvent,
  FC,
  useEffect,
  useState,
} from "react";
import { Display } from "../../ui/Display/Display";
import UniversalButton from "../../ui/Button/UniversalButton";
import { ButtonBlock } from "../../ui/ButtonBlock/ButtonBlock";
import classes from "./CounterSettings.module.css";

type CounterSettingsPropsType = {
  counterMaxValue: number;
  counterMinValue: number;
  setCounterMaxValue: (counterMaxValue: number) => void;
  setCounterMinValue: (counterMinValue: number) => void;
  setNotice: (NoticeValue: string | null) => void;
  setCounterButtonsDisable: (value: boolean) => void;
  setCount: (counterValue: number) => void;
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

  useEffect(() => {
    isNaN(counterMinValue) && setCounterMinValue(0);
  }, [counterMinValue]);

  useEffect(() => {
    isNaN(counterMaxValue) && setCounterMaxValue(0);
  }, [counterMaxValue]);

  useEffect(() => {
    console.log("проверка2");
    if (
      counterMaxValue < counterMinValue ||
      counterMinValue < 0 ||
      counterMaxValue === counterMinValue
    ) {
      setNotice("error");
      setLocalButtonDisable(true);
      setCounterButtonsDisable(true);
    } else {
      setNotice("startMessage");
      setCounterButtonsDisable(true);
      setLocalButtonDisable(false);
    }
  }, [counterMinValue, counterMaxValue]);

  const onChangeCounterMinValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCounterMinValue(Math.floor(e.currentTarget.valueAsNumber));
  };
  const onChangeCounterMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
              onChange={onChangeCounterMinValueHandler}
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
              onChange={onChangeCounterMaxValueHandler}
              className={
                notice === "error" ? classes.inputError : classes.input
              }
            />
          </div>
        </div>
      </Display>
      <ButtonBlock>
        <UniversalButton onClick={btnHandler} disabled={localButtonDisable}>
          Set
        </UniversalButton>
      </ButtonBlock>
    </div>
  );
};
