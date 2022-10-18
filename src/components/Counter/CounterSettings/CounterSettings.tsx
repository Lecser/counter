import React, { FC, memo, useCallback, useEffect } from "react";
import { Display } from "../../ui/Display/Display";
import { ButtonBlock } from "../../ui/ButtonBlock/ButtonBlock";
import classes from "./CounterSettings.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../../store/store";
import { StatusType } from "../../../App";
import {
  counterResetAC,
  setCounterMaxValueAC,
  setCounterMinValueAC,
  setCountStatusAC,
  setErrorStatusAC,
  setStartMessageStatusAC,
} from "../../../store/reducers/counterReducer";
import { Input } from "../../ui/Input/Input";
import { UniversalButton } from "../../ui/Button/UniversalButton";

export const CounterSettings: FC = memo(() => {
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

  const onChangeCounterMinValueHandler = useCallback(
    (value: number) => {
      dispatch(setCounterMinValueAC(value));
    },
    [dispatch]
  );
  const onChangeCounterMaxValueHandler = useCallback(
    (value: number) => {
      dispatch(setCounterMaxValueAC(value));
    },
    [dispatch]
  );

  const btnHandler = useCallback(() => {
    if (status !== "error") {
      dispatch(setCountStatusAC());
      dispatch(counterResetAC(counterMinValue));
    }
  }, [status, dispatch]);

  return (
    <div className={classes.counterSettings}>
      <Display>
        <div className={classes.inputsContainer}>
          <div className={classes.inputWrapper}>
            <div className={classes.counterValue}>Min Value:</div>
            <Input
              value={counterMinValue}
              onChangeNumber={onChangeCounterMinValueHandler}
              error={status === "error"}
              onEnter={btnHandler}
            />
          </div>
          <div className={classes.inputWrapper}>
            <div className={classes.counterValue}>Max Value:</div>
            <Input
              value={counterMaxValue}
              onChangeNumber={onChangeCounterMaxValueHandler}
              error={status === "error"}
              onEnter={btnHandler}
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
});
