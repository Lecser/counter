import React, { ChangeEvent, FC, KeyboardEvent, useEffect } from "react";
import { Display } from "../../ui/Display/Display";
import UniversalButton from "../../ui/Button/UniversalButton";
import { ButtonBlock } from "../../ui/ButtonBlock/ButtonBlock";
import classes from "./CounterSettings.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../../store";
import { StatusType } from "../../../App";
import {
  setCounterMaxValueAC,
  setCounterMinValueAC,
  setCounterValueAC,
  setCountStatusAC,
  setErrorStatusAC,
  setStartMessageStatusAC,
} from "../../../store/reducers/counterReducer";

export const CounterSettings: FC = () => {
  const counterMinValue = useSelector<AppStateType, number>(
    (store) => store.counter.counterMinValue
  );
  const counterMaxValue = useSelector<AppStateType, number>(
    (store) => store.counter.counterMaxValue
  );
  const status = useSelector<AppStateType, StatusType>(
    (store) => store.counter.status
  );
  const dispatch = useDispatch();

  useEffect(() => {
    isNaN(counterMinValue) && dispatch(setCounterMinValueAC(0));
  }, [counterMinValue]);

  useEffect(() => {
    isNaN(counterMaxValue) && dispatch(setCounterMaxValueAC(0));
  }, [counterMaxValue]);

  useEffect(() => {
    if (
      counterMaxValue < counterMinValue ||
      counterMinValue < 0 ||
      counterMaxValue === counterMinValue
    ) {
      dispatch(setErrorStatusAC());
    } else {
      dispatch(setStartMessageStatusAC());
    }
  }, [counterMinValue, counterMaxValue, dispatch]);

  const onChangeCounterMinValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCounterMinValueAC(Math.floor(e.currentTarget.valueAsNumber)));
  };
  const onChangeCounterMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCounterMaxValueAC(Math.floor(e.currentTarget.valueAsNumber)));
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      btnHandler();
    }
  };
  const btnHandler = () => {
    dispatch(setCountStatusAC());
    dispatch(setCounterValueAC(counterMinValue));
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
                status === "error" ? classes.inputError : classes.input
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
                status === "error" ? classes.inputError : classes.input
              }
            />
          </div>
        </div>
      </Display>
      <ButtonBlock>
        <UniversalButton onClick={btnHandler} disabled={status === "error"}>
          Set
        </UniversalButton>
      </ButtonBlock>
    </div>
  );
};
